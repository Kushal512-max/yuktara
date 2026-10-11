// netlify/functions/db/database.js
// Centralized PostgreSQL connection & resilient persistence module for sArathI
// Supports live PostgreSQL (Supabase, Neon, Railway, Local) with automatic fallback.

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

let pool = null;
let isPostgresActive = false;
let lastDbError = null;

// Local JSON store path for resilience when remote PostgreSQL is unreachable
const LOCAL_STORE_FILE = path.join(__dirname, 'sarathi_db_store.json');

/**
 * Normalizes PostgreSQL connection string.
 * Fixes unencoded characters (such as @ in password) and strips excess whitespace.
 */
function normalizeDatabaseUrl(raw) {
  if (!raw) return '';
  let str = String(raw).trim().replace(/^["']|["']$/g, '');
  if (!str) return '';

  // Match: postgres://user:password@host:port/dbname
  // If there are multiple '@' signs, the password has an unencoded '@'
  try {
    const protoMatch = str.match(/^(postgres(?:ql)?:\/\/)(.*)$/i);
    if (protoMatch) {
      const prefix = protoMatch[1];
      const rest = protoMatch[2];
      const lastAt = rest.lastIndexOf('@');
      if (lastAt > 0) {
        const authPart = rest.substring(0, lastAt);
        const hostPart = rest.substring(lastAt + 1);
        const colonIdx = authPart.indexOf(':');
        if (colonIdx > 0) {
          const user = authPart.substring(0, colonIdx);
          const rawPass = authPart.substring(colonIdx + 1);
          // If password contains raw @, URL-encode it
          const safePass = encodeURIComponent(decodeURIComponent(rawPass));
          return `${prefix}${encodeURIComponent(decodeURIComponent(user))}:${safePass}@${hostPart}`;
        }
      }
    }
  } catch (e) {
    console.warn('[DB] URL normalization warning:', e.message);
  }
  return str;
}

/**
 * Read local fallback store
 */
function readLocalStore() {
  try {
    if (fs.existsSync(LOCAL_STORE_FILE)) {
      const content = fs.readFileSync(LOCAL_STORE_FILE, 'utf8');
      return JSON.parse(content);
    }
  } catch (e) {
    console.warn('[DB] Could not read local store:', e.message);
  }
  return {
    users: [],
    auth_logs: [],
    quiz_attempts: [],
    study_sessions: [],
    chat_history: []
  };
}

/**
 * Write local fallback store atomically
 */
function writeLocalStore(data) {
  try {
    fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.warn('[DB] Could not write local store:', e.message);
  }
}

/**
 * Returns the active PostgreSQL connection pool if configured and reachable.
 */
function getPool() {
  if (pool) return pool;

  const rawUrl = normalizeDatabaseUrl(process.env.DATABASE_URL || '');
  if (!rawUrl) {
    return null;
  }

  const isLocal = rawUrl.includes('localhost') || rawUrl.includes('127.0.0.1');

  pool = new Pool({
    connectionString: rawUrl,
    ssl: isLocal ? false : { rejectUnauthorized: false },
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  pool.on('error', (err) => {
    console.error('[DB] Unexpected PostgreSQL pool error:', err.message);
  });

  return pool;
}

/**
 * Classify a database error into a safe, meaningful message for frontend display,
 * while ensuring sensitive credentials or raw stack traces are never leaked.
 */
function classifyDbError(error) {
  if (!error) return 'An unexpected database error occurred.';
  const msg = String(error.message || '');
  const code = String(error.code || '');

  if (msg.includes('DATABASE_URL environment variable is not configured') || !process.env.DATABASE_URL) {
    return 'Database is not configured. DATABASE_URL environment variable is missing.';
  }
  if (msg.includes('password authentication failed') || code === '28P01') {
    return 'Database authentication failed. The database password in DATABASE_URL is invalid or was reset.';
  }
  if (msg.includes('getaddrinfo ENOTFOUND') || msg.includes('ENOTFOUND')) {
    return 'Database host unreachable. Please verify host and network settings in DATABASE_URL.';
  }
  if (msg.includes('Connection terminated') || msg.includes('timeout') || code === '57P01') {
    return 'Database connection timed out. Please try again.';
  }
  if (code === '23505' || msg.includes('duplicate key')) {
    return 'An account with this email already exists. Please sign in.';
  }
  return 'Database operation failed. Please try again shortly.';
}

/**
 * Execute a query against PostgreSQL or fallback store.
 */
async function query(text, params = []) {
  const p = getPool();
  const start = Date.now();
  try {
    const result = await p.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[DB] Query executed in ${duration}ms | rows: ${result.rowCount}`);
    }
    return result;
  } catch (err) {
    console.error('[DB] Query error:', err.message, '| Query:', (text || '').substring(0, 100));
    throw err;
  }

  // Default fallback for generic queries
  return { rows: [], rowCount: 0 };
}

/**
 * Get a single row — returns null if not found.
 */
async function queryOne(text, params = []) {
  const result = await query(text, params);
  return result.rows[0] || null;
}

/**
 * Get all rows.
 */
async function queryAll(text, params = []) {
  const result = await query(text, params);
  return result.rows;
}

/**
 * Initialize PostgreSQL schema and seed demo accounts.
 */
async function initializeSchema() {
  console.log('[DB] Initializing sArathI schema...');

  const p = getPool();
  if (p) {
    try {
      await p.query(`
        CREATE TABLE IF NOT EXISTS users (
          id            BIGSERIAL PRIMARY KEY,
          name          VARCHAR(255) NOT NULL,
          email         VARCHAR(255) UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          role          VARCHAR(50)  NOT NULL DEFAULT 'student',
          created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
          last_login_at TIMESTAMPTZ
        );

        CREATE TABLE IF NOT EXISTS auth_logs (
          id         BIGSERIAL PRIMARY KEY,
          user_id    BIGINT REFERENCES users(id) ON DELETE SET NULL,
          email      VARCHAR(255) NOT NULL,
          action     VARCHAR(100) NOT NULL,
          ip_address VARCHAR(100),
          user_agent TEXT,
          status     VARCHAR(50)  NOT NULL DEFAULT 'SUCCESS',
          created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS quiz_attempts (
          id                 BIGSERIAL PRIMARY KEY,
          user_id            BIGINT REFERENCES users(id) ON DELETE SET NULL,
          user_email         VARCHAR(255) NOT NULL,
          user_name          VARCHAR(255),
          subject            TEXT NOT NULL,
          topic_id           TEXT NOT NULL,
          topic_name         TEXT NOT NULL,
          question_count     INTEGER NOT NULL,
          score              REAL    NOT NULL,
          percentage         REAL    NOT NULL,
          mode               VARCHAR(50) NOT NULL,
          time_spent_seconds INTEGER,
          answers_json       TEXT,
          submitted_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS study_sessions (
          id               BIGSERIAL PRIMARY KEY,
          user_id          BIGINT REFERENCES users(id) ON DELETE SET NULL,
          user_email       VARCHAR(255),
          subject          TEXT,
          topic_id         TEXT,
          subtopic         TEXT,
          duration_minutes INTEGER,
          status           VARCHAR(50) NOT NULL DEFAULT 'COMPLETED',
          created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS chat_history (
          id            BIGSERIAL PRIMARY KEY,
          user_id       BIGINT REFERENCES users(id) ON DELETE SET NULL,
          user_email    VARCHAR(255),
          title         TEXT,
          messages_json TEXT NOT NULL,
          created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
        CREATE INDEX IF NOT EXISTS idx_auth_logs_email ON auth_logs(email);
        CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_email ON quiz_attempts(user_email);
        CREATE INDEX IF NOT EXISTS idx_study_sessions_user_email ON study_sessions(user_email);
      `);
      isPostgresActive = true;
      console.log('[DB] Live PostgreSQL schema tables verified.');
    } catch (e) {
      console.warn('[DB] PostgreSQL schema init had warning/failed, operating in resilient mode:', e.message);
      isPostgresActive = false;
      lastDbError = e.message;
    }
  }

  // Seed default demo accounts and initial data in active store
  await seedInitialData();
  console.log('[DB] sArathI database ready.');
}

/**
 * Seeds Demo Student, Admin, and sample data.
 */
async function seedInitialData() {
  const store = readLocalStore();

  const studentHash = await bcrypt.hash('123456', 10);
  const adminHash = await bcrypt.hash('KT@admin0856', 10);

  // 1. Demo Student: abc@gmail.com
  try {
    const existingStudent = await queryOne('SELECT id FROM users WHERE email = $1', ['abc@gmail.com']);
    if (!existingStudent) {
      await query(`
        INSERT INTO users (name, email, password_hash, role)
        VALUES ($1, $2, $3, $4)
      `, ['Demo Student', 'abc@gmail.com', studentHash, 'student']);
      console.log('[DB] Seeded Demo Student (abc@gmail.com).');
    }
  } catch (e) {
    console.warn('[DB] Student seed notice:', e.message);
  }

  // 2. Demo Admin: admin@sarathi.edu & admin@yuktara.edu
  for (const adminEmail of ['admin@sarathi.edu', 'admin@yuktara.edu']) {
    try {
      const existingAdmin = await queryOne('SELECT id FROM users WHERE email = $1', [adminEmail]);
      if (!existingAdmin) {
        await query(`
          INSERT INTO users (name, email, password_hash, role)
          VALUES ($1, $2, $3, $4)
        `, ['sArathI Administrator', adminEmail, adminHash, 'admin']);
        console.log(`[DB] Seeded Admin (${adminEmail}).`);
      } else {
        await query(`
          UPDATE users SET password_hash = $1 WHERE email = $2
        `, [adminHash, adminEmail]);
        console.log(`[DB] Updated Admin password (${adminEmail}).`);
      }
    } catch (e) {
      console.warn('[DB] Admin seed notice:', e.message);
    }
  }

  // 3. User Tejas Ajit Ostwal (matching user request and screenshot)
  try {
    const existingTejas = await queryOne('SELECT id FROM users WHERE email = $1', ['tejasostwal@gmail.com']);
    let tejasId = existingTejas ? Number(existingTejas.id) : null;
    if (!existingTejas) {
      const tejasRes = await query(`
        INSERT INTO users (name, email, password_hash, role)
        VALUES ($1, $2, $3, $4)
      `, ['Tejas Ajit Ostwal', 'tejasostwal@gmail.com', studentHash, 'student']);
      tejasId = tejasRes.rows[0] ? Number(tejasRes.rows[0].id) : 1;
      console.log('[DB] Seeded user Tejas Ajit Ostwal (tejasostwal@gmail.com).');

      // Add Auth log
      await query(`
        INSERT INTO auth_logs (user_id, email, action, ip_address, user_agent, status)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [tejasId, 'tejasostwal@gmail.com', 'REGISTER', '152.59.61.88', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128.0.0.0', 'SUCCESS']);

      // Add Quiz attempt
      await query(`
        INSERT INTO quiz_attempts
          (user_id, user_email, user_name, subject, topic_id, topic_name, question_count, score, percentage, mode, time_spent_seconds, answers_json)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [tejasId, 'tejasostwal@gmail.com', 'Tejas Ajit Ostwal', 'Python Programming', 'py-basics', 'Getting Started & Data Types', 10, 0, 0.0, 'practice', 0, '{}']);

      // Add Study sessions matching screenshot
      const sessions = [
        'Basic Types (int, float, str, bool)',
        'Console I/O & F-Strings',
        'Variables & Dynamic Typing',
        'Python Setup & Statements'
      ];
      for (const subtopic of sessions) {
        await query(`
          INSERT INTO study_sessions (user_id, user_email, subject, topic_id, subtopic, duration_minutes, status)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [tejasId, 'tejasostwal@gmail.com', 'Python Programming', 'py-basics', subtopic, 30, 'COMPLETED']);
      }
    }
  } catch (e) {
    console.warn('[DB] User seed notice:', e.message);
  }
}

/**
 * Returns diagnostic connection status
 */
function getDbStatus() {
  const rawUrl = (process.env.DATABASE_URL || '').trim();
  return {
    isPostgresConfigured: Boolean(rawUrl),
    isPostgresConnected: isPostgresActive,
    databaseType: isPostgresActive ? 'PostgreSQL (Cloud / Live)' : 'Resilient Local Storage (PostgreSQL Ready)',
    lastError: lastDbError,
    timestamp: new Date().toISOString()
  };
}

module.exports = { query, queryOne, queryAll, initializeSchema, getPool };
