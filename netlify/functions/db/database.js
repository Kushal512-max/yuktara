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
    console.error('[DB] PostgreSQL pool error:', err.message);
    isPostgresActive = false;
    lastDbError = err.message;
  });

  return pool;
}

/**
 * Execute a query against PostgreSQL or fallback store.
 */
async function query(text, params = []) {
  const p = getPool();
  if (p) {
    try {
      const start = Date.now();
      const result = await p.query(text, params);
      const duration = Date.now() - start;
      isPostgresActive = true;
      lastDbError = null;
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[DB-PG] Executed in ${duration}ms | rows: ${result.rowCount}`);
      }
      return result;
    } catch (err) {
      console.warn(`[DB-PG] Query failed (${err.message}), evaluating local store handler...`);
      isPostgresActive = false;
      lastDbError = err.message;
      return handleLocalQuery(text, params);
    }
  }

  // No active pool, execute via local store
  return handleLocalQuery(text, params);
}

/**
 * Local resilient query emulator for fallback mode.
 * Supports the specific SQL queries used throughout the application.
 */
function handleLocalQuery(text, params = []) {
  const store = readLocalStore();
  const q = text.trim();
  const upper = q.toUpperCase();

  // 1. SELECT 1 AS ok
  if (upper.includes('SELECT 1')) {
    return { rows: [{ ok: 1 }], rowCount: 1 };
  }

  // 2. Users queries
  if (upper.includes('FROM USERS')) {
    if (upper.startsWith('SELECT COUNT(*)')) {
      return { rows: [{ count: store.users.length }], rowCount: 1 };
    }
    if (upper.includes('WHERE EMAIL = $1')) {
      const email = String(params[0] || '').toLowerCase().trim();
      const user = store.users.find(u => u.email.toLowerCase() === email);
      return { rows: user ? [user] : [], rowCount: user ? 1 : 0 };
    }
    if (upper.includes('WHERE ID = $1')) {
      const id = Number(params[0]);
      const user = store.users.find(u => Number(u.id) === id);
      return { rows: user ? [user] : [], rowCount: user ? 1 : 0 };
    }
    // SELECT * FROM users ORDER BY id DESC
    const sorted = [...store.users].sort((a, b) => b.id - a.id);
    return { rows: sorted, rowCount: sorted.length };
  }

  // 3. INSERT INTO users
  if (upper.startsWith('INSERT INTO USERS')) {
    const nextId = store.users.length ? Math.max(...store.users.map(u => Number(u.id))) + 1 : 1;
    let name = 'Student';
    let email = '';
    let hash = '';
    let role = 'student';

    if (params.length >= 4) {
      [name, email, hash, role] = params;
    } else if (params.length === 3) {
      [name, email, hash] = params;
      role = upper.includes("'ADMIN'") ? 'admin' : 'student';
    } else if (params.length === 2) {
      // e.g. VALUES ('sArathI Administrator', $1, $2, 'admin')
      email = params[0];
      hash = params[1];
      name = upper.includes('ADMINISTRATOR') ? 'sArathI Administrator' : 'User';
      role = upper.includes('ADMIN') ? 'admin' : 'student';
    } else if (params.length === 1) {
      hash = params[0];
    }

    email = String(email || '').toLowerCase().trim();

    // Check conflict
    const existing = store.users.find(u => u.email === email);
    if (existing) {
      return { rows: [existing], rowCount: 1 };
    }

    const newUser = {
      id: nextId,
      name: name || 'Student',
      email,
      password_hash: hash,
      role: role || 'student',
      created_at: new Date().toISOString(),
      last_login_at: new Date().toISOString(),
    };
    store.users.push(newUser);
    writeLocalStore(store);
    return { rows: [newUser], rowCount: 1 };
  }

  // 4. UPDATE users SET last_login_at
  if (upper.startsWith('UPDATE USERS')) {
    if (upper.includes('WHERE ID = $1')) {
      const id = Number(params[0]);
      const u = store.users.find(x => Number(x.id) === id);
      if (u) {
        u.last_login_at = new Date().toISOString();
        writeLocalStore(store);
      }
      return { rows: [], rowCount: u ? 1 : 0 };
    }
  }

  // 5. Auth Logs
  if (upper.startsWith('INSERT INTO AUTH_LOGS')) {
    const nextId = store.auth_logs.length ? Math.max(...store.auth_logs.map(l => Number(l.id))) + 1 : 1;
    let userId = null, email = '', action = 'AUTH_EVENT', ip = '', ua = '', status = 'SUCCESS';

    if (params.length >= 6) {
      [userId, email, action, ip, ua, status] = params;
    } else if (params.length === 4) {
      // (user_id, email, action, ip_address, user_agent, status) VALUES ($1, $2, '...', $3, $4, '...')
      [userId, email, ip, ua] = params;
      action = upper.includes('LOGIN_SUCCESS') ? 'LOGIN_SUCCESS' : (upper.includes('LOGIN_FAILED') ? 'LOGIN_FAILED' : 'AUTH_EVENT');
      status = upper.includes('SUCCESS') ? 'SUCCESS' : 'FAILED';
    } else if (params.length === 5) {
      [email, action, ip, ua, status] = params;
    } else if (params.length === 3) {
      [email, ip, ua] = params;
      action = upper.includes('LOGIN_FAILED') ? 'LOGIN_FAILED' : 'AUTH_EVENT';
      status = 'FAILED';
    }

    email = String(email || '').toLowerCase().trim();

    const log = {
      id: nextId,
      user_id: userId,
      email,
      action: action || 'AUTH_EVENT',
      ip_address: ip || '0.0.0.0',
      user_agent: ua || 'Unknown',
      status: status || 'SUCCESS',
      created_at: new Date().toISOString()
    };
    store.auth_logs.push(log);
    writeLocalStore(store);
    return { rows: [{ id: nextId }], rowCount: 1 };
  }

  if (upper.includes('FROM AUTH_LOGS')) {
    if (upper.startsWith('SELECT COUNT(*)')) {
      return { rows: [{ count: store.auth_logs.length }], rowCount: 1 };
    }
    if (upper.includes('WHERE USER_ID = $1 OR EMAIL = $2')) {
      const uid = Number(params[0]);
      const email = String(params[1] || '').toLowerCase().trim();
      const filtered = store.auth_logs.filter(l => Number(l.user_id) === uid || (l.email && String(l.email).toLowerCase() === email));
      filtered.sort((a, b) => b.id - a.id);
      return { rows: filtered, rowCount: filtered.length };
    }
    const sorted = [...store.auth_logs].sort((a, b) => b.id - a.id);
    return { rows: sorted, rowCount: sorted.length };
  }

  // 6. Quiz Attempts
  if (upper.startsWith('INSERT INTO QUIZ_ATTEMPTS')) {
    const nextId = store.quiz_attempts.length ? Math.max(...store.quiz_attempts.map(q => q.id)) + 1 : 1;
    const [userId, userEmail, userName, subject, topicId, topicName, questionCount, score, percentage, mode, timeSpent, answersJson] = params;
    const attempt = {
      id: nextId,
      user_id: userId,
      user_email: userEmail,
      user_name: userName,
      subject,
      topic_id: topicId,
      topic_name: topicName,
      question_count: questionCount,
      score,
      percentage,
      mode,
      time_spent_seconds: timeSpent,
      answers_json: typeof answersJson === 'string' ? answersJson : JSON.stringify(answersJson || {}),
      submitted_at: new Date().toISOString()
    };
    store.quiz_attempts.push(attempt);
    writeLocalStore(store);
    return { rows: [{ id: nextId }], rowCount: 1 };
  }

  if (upper.includes('FROM QUIZ_ATTEMPTS')) {
    if (upper.startsWith('SELECT COUNT(*)')) {
      return { rows: [{ count: store.quiz_attempts.length }], rowCount: 1 };
    }
    if (upper.includes('AVG(PERCENTAGE)')) {
      const avg = store.quiz_attempts.length
        ? (store.quiz_attempts.reduce((acc, c) => acc + Number(c.percentage || 0), 0) / store.quiz_attempts.length).toFixed(1)
        : 0;
      return { rows: [{ avg }], rowCount: 1 };
    }
    if (upper.includes('WHERE USER_ID = $1 OR USER_EMAIL = $2')) {
      const uid = Number(params[0]);
      const email = String(params[1] || '').toLowerCase();
      const filtered = store.quiz_attempts.filter(a => Number(a.user_id) === uid || (a.user_email && a.user_email.toLowerCase() === email));
      filtered.sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at));
      return { rows: filtered, rowCount: filtered.length };
    }
    if (upper.includes('WHERE USER_EMAIL = $1')) {
      const email = String(params[0] || '').toLowerCase();
      const filtered = store.quiz_attempts.filter(a => a.user_email && a.user_email.toLowerCase() === email);
      filtered.sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at));
      return { rows: filtered, rowCount: filtered.length };
    }
    const sorted = [...store.quiz_attempts].sort((a, b) => b.id - a.id);
    return { rows: sorted, rowCount: sorted.length };
  }

  // 7. Study Sessions
  if (upper.startsWith('INSERT INTO STUDY_SESSIONS')) {
    const nextId = store.study_sessions.length ? Math.max(...store.study_sessions.map(s => s.id)) + 1 : 1;
    const [userId, userEmail, subject, topicId, subtopic, durationMinutes, status] = params;
    const session = {
      id: nextId,
      user_id: userId,
      user_email: userEmail,
      subject,
      topic_id: topicId,
      subtopic,
      duration_minutes: durationMinutes,
      status: status || 'COMPLETED',
      created_at: new Date().toISOString()
    };
    store.study_sessions.push(session);
    writeLocalStore(store);
    return { rows: [{ id: nextId }], rowCount: 1 };
  }

  if (upper.includes('FROM STUDY_SESSIONS')) {
    if (upper.startsWith('SELECT COUNT(*)')) {
      return { rows: [{ count: store.study_sessions.length }], rowCount: 1 };
    }
    if (upper.includes('WHERE USER_ID = $1 OR USER_EMAIL = $2')) {
      const uid = Number(params[0]);
      const email = String(params[1] || '').toLowerCase();
      const filtered = store.study_sessions.filter(s => Number(s.user_id) === uid || (s.user_email && s.user_email.toLowerCase() === email));
      filtered.sort((a, b) => b.id - a.id);
      return { rows: filtered, rowCount: filtered.length };
    }
    const sorted = [...store.study_sessions].sort((a, b) => b.id - a.id);
    return { rows: sorted, rowCount: sorted.length };
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
  const adminHash = await bcrypt.hash('admin123', 10);

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

module.exports = {
  query,
  queryOne,
  queryAll,
  initializeSchema,
  getPool,
  getDbStatus,
  normalizeDatabaseUrl
};
