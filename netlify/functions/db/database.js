// netlify/functions/db/database.js
// Centralized PostgreSQL connection module for YUKTARA
// All Netlify Functions import this module — single source of truth.

'use strict';

const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  console.error('[DB] FATAL: DATABASE_URL environment variable is not set.');
  // Don't throw at module load — let the function handle it gracefully.
}

// Create a connection pool — shared across all function invocations in the same container.
// SSL is required for cloud PostgreSQL providers (Neon, Supabase, Railway, etc.)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('localhost')
    ? false
    : { rejectUnauthorized: false },
  max: 5,              // max connections in pool (keep low for serverless)
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => {
  console.error('[DB] Unexpected PostgreSQL pool error:', err.message);
});

/**
 * Execute a parameterized query.
 * @param {string} text  - SQL query string with $1, $2, ... placeholders
 * @param {Array}  params - Parameter values (prevents SQL injection)
 * @returns {Promise<import('pg').QueryResult>}
 */
async function query(text, params) {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[DB] Query executed in ${duration}ms | rows: ${result.rowCount}`);
    }
    return result;
  } catch (err) {
    console.error('[DB] Query error:', err.message, '| Query:', text.substring(0, 100));
    throw err;
  }
}

/**
 * Get a single row — returns null if not found.
 */
async function queryOne(text, params) {
  const result = await query(text, params);
  return result.rows[0] || null;
}

/**
 * Get all rows.
 */
async function queryAll(text, params) {
  const result = await query(text, params);
  return result.rows;
}

/**
 * Initialize the PostgreSQL schema.
 * Uses CREATE TABLE IF NOT EXISTS — completely safe to run multiple times.
 * Never drops or truncates data.
 */
async function initializeSchema() {
  console.log('[DB] Initializing PostgreSQL schema (CREATE TABLE IF NOT EXISTS)...');

  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id         BIGSERIAL PRIMARY KEY,
      name       VARCHAR(255) NOT NULL,
      email      VARCHAR(255) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role       VARCHAR(50)  NOT NULL DEFAULT 'student',
      created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
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
      id               BIGSERIAL PRIMARY KEY,
      user_id          BIGINT REFERENCES users(id) ON DELETE SET NULL,
      user_email       VARCHAR(255) NOT NULL,
      user_name        VARCHAR(255),
      subject          TEXT NOT NULL,
      topic_id         TEXT NOT NULL,
      topic_name       TEXT NOT NULL,
      question_count   INTEGER NOT NULL,
      score            REAL    NOT NULL,
      percentage       REAL    NOT NULL,
      mode             VARCHAR(50) NOT NULL,
      time_spent_seconds INTEGER,
      answers_json     TEXT,
      submitted_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
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

  console.log('[DB] PostgreSQL schema ready.');
}

module.exports = { query, queryOne, queryAll, initializeSchema, pool };
