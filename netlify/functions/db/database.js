// netlify/functions/db/database.js
// Centralized PostgreSQL connection module for YUKTARA
// All Netlify Functions import this module — single source of truth.

'use strict';

const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

let pool = null;

/**
 * Returns the active PostgreSQL connection pool.
 * Initializes lazily to support serverless environment lifecycles.
 */
function getPool() {
  if (pool) return pool;

  const rawUrl = (process.env.DATABASE_URL || '').trim();
  if (!rawUrl) {
    throw new Error(
      'DATABASE_URL environment variable is not configured. ' +
      'Please set DATABASE_URL in Netlify: Site configuration > Environment variables.'
    );
  }

  const isLocal = rawUrl.includes('localhost') || rawUrl.includes('127.0.0.1');

  pool = new Pool({
    connectionString: rawUrl,
    ssl: isLocal ? false : { rejectUnauthorized: false },
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });

  pool.on('error', (err) => {
    console.error('[DB] Unexpected PostgreSQL pool error:', err.message);
    // Reset pool on fatal connection termination so the next request creates a fresh one
    pool = null;
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
 * Execute a parameterized query.
 * @param {string} text  - SQL query string with $1, $2, ... placeholders
 * @param {Array}  params - Parameter values (prevents SQL injection)
 * @returns {Promise<import('pg').QueryResult>}
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
    console.error('[DB] Query error:', err.message, '| Code:', err.code, '| Query:', (text || '').substring(0, 100));
    // If connection dropped, clear pool reference to allow fresh reconnect
    if (err.code === 'ECONNRESET' || err.code === 'ECONNREFUSED' || (err.message && err.message.includes('Connection terminated'))) {
      pool = null;
    }
    throw err;
  }
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
 * Initialize the PostgreSQL schema and seed demo accounts.
 * Uses CREATE TABLE IF NOT EXISTS — completely safe to run multiple times.
 */
async function initializeSchema() {
  console.log('[DB] Initializing PostgreSQL schema (CREATE TABLE IF NOT EXISTS)...');

  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id            BIGSERIAL PRIMARY KEY,
      name          VARCHAR(255) NOT NULL,
      email         VARCHAR(255) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role          VARCHAR(50)  NOT NULL DEFAULT 'student',
      created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
      last_login_at TIMESTAMPTZ
    );
  `);

  await query(`
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
  `);

  await query(`
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
  `);

  await query(`
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
  `);

  // Indexes for common query patterns
  await query(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`);
  await query(`CREATE INDEX IF NOT EXISTS idx_auth_logs_email ON auth_logs(email);`);
  await query(`CREATE INDEX IF NOT EXISTS idx_auth_logs_user_id ON auth_logs(user_id);`);
  await query(`CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_email ON quiz_attempts(user_email);`);
  await query(`CREATE INDEX IF NOT EXISTS idx_study_sessions_user_email ON study_sessions(user_email);`);

  // Seed default Demo Student account if not present (email: abc@gmail.com, pass: 123456)
  try {
    const existingStudent = await queryOne('SELECT id FROM users WHERE email = $1', ['abc@gmail.com']);
    if (!existingStudent) {
      const studentHash = await bcrypt.hash('123456', 10);
      await query(`
        INSERT INTO users (name, email, password_hash, role, created_at, last_login_at)
        VALUES ('Demo Student', 'abc@gmail.com', $1, 'student', NOW(), NOW())
        ON CONFLICT (email) DO NOTHING;
      `, [studentHash]);
      console.log('[DB] Demo student account seeded (abc@gmail.com).');
    }
  } catch (seedErr) {
    console.warn('[DB] Could not seed student demo:', seedErr.message);
  }

  // Seed default Demo Admin account if not present (email: admin@yuktara.edu, pass: admin123)
  try {
    const existingAdmin = await queryOne('SELECT id FROM users WHERE email = $1', ['admin@yuktara.edu']);
    if (!existingAdmin) {
      const adminHash = await bcrypt.hash('admin123', 10);
      await query(`
        INSERT INTO users (name, email, password_hash, role, created_at, last_login_at)
        VALUES ('System Administrator', 'admin@yuktara.edu', $1, 'admin', NOW(), NOW())
        ON CONFLICT (email) DO NOTHING;
      `, [adminHash]);
      console.log('[DB] Demo admin account seeded (admin@yuktara.edu).');
    }
  } catch (seedErr) {
    console.warn('[DB] Could not seed admin demo:', seedErr.message);
  }

  console.log('[DB] PostgreSQL schema ready.');
}

module.exports = { query, queryOne, queryAll, initializeSchema, getPool, classifyDbError };
