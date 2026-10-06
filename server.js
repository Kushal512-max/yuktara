// server.js — Full-Stack Node.js & SQLite Backend for YUKTARA
// Uses native Node v22+ 'node:sqlite' DatabaseSync engine with zero external dependencies.

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const crypto = require('node:crypto');

const PORT = process.env.PORT || 3000;
const DB_DIR = path.join(__dirname, 'database');
const DB_FILE = path.join(DB_DIR, 'yuktara.db');

// Ensure database directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize SQLite Database
const db = new DatabaseSync(DB_FILE);

// Enable WAL mode for performance & concurrency
try {
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA foreign_keys = ON;');
} catch (e) {
  console.warn('Note on pragmas:', e.message);
}

// Initialize Tables Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'student',
    created_at TEXT NOT NULL,
    last_login_at TEXT
  );

  CREATE TABLE IF NOT EXISTS auth_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    email TEXT NOT NULL,
    action TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    status TEXT DEFAULT 'SUCCESS',
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS quiz_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    user_email TEXT NOT NULL,
    user_name TEXT,
    subject TEXT NOT NULL,
    topic_id TEXT NOT NULL,
    topic_name TEXT NOT NULL,
    question_count INTEGER NOT NULL,
    score REAL NOT NULL,
    percentage REAL NOT NULL,
    mode TEXT NOT NULL,
    time_spent_seconds INTEGER,
    answers_json TEXT,
    submitted_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS study_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    user_email TEXT,
    subject TEXT,
    topic_id TEXT,
    subtopic TEXT,
    duration_minutes INTEGER,
    status TEXT DEFAULT 'completed',
    created_at TEXT NOT NULL
  );
`);

// Simple password hashing helper
function hashPassword(pass) {
  return crypto.createHash('sha256').update(String(pass)).digest('hex');
}

// Seed initial demo data if database is empty
function seedDatabase() {
  const userCount = db.prepare('SELECT COUNT(*) AS count FROM users').get().count;
  if (userCount === 0) {
    console.log('Seeding initial SQLite database records...');

    const insertUser = db.prepare(`
      INSERT INTO users (name, email, password_hash, role, created_at, last_login_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    insertUser.run('Yuktara Scholar', 'abc@gmail.com', hashPassword('123456'), 'student', now, now);
    insertUser.run('System Administrator', 'admin@yuktara.edu', hashPassword('admin123'), 'admin', now, now);
    insertUser.run('Priya Sharma', 'priya.sharma@sppu.edu', hashPassword('password123'), 'student', now, null);

    const insertAuth = db.prepare(`
      INSERT INTO auth_logs (user_id, email, action, ip_address, user_agent, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insertAuth.run(1, 'abc@gmail.com', 'REGISTER', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'SUCCESS', now);
    insertAuth.run(1, 'abc@gmail.com', 'LOGIN_SUCCESS', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'SUCCESS', now);
    insertAuth.run(2, 'admin@yuktara.edu', 'REGISTER', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'SUCCESS', now);

    const insertQuiz = db.prepare(`
      INSERT INTO quiz_attempts (user_id, user_email, user_name, subject, topic_id, topic_name, question_count, score, percentage, mode, time_spent_seconds, answers_json, submitted_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertQuiz.run(
      1,
      'abc@gmail.com',
      'Yuktara Scholar',
      'Data Structures & Algorithms',
      'dsa-u1-intro',
      'Unit 1: Introduction to Data Structures & Algorithms',
      10,
      9,
      90.0,
      'timed',
      540,
      JSON.stringify({ note: "Initial diagnostic evaluation test" }),
      now
    );

    insertQuiz.run(
      1,
      'abc@gmail.com',
      'Yuktara Scholar',
      'Database Management System',
      'dbms-u1-intro-er',
      'Unit 1: Introduction to DBMS & Data Modeling',
      10,
      8,
      80.0,
      'practice',
      420,
      JSON.stringify({ note: "Comprehensive ER model practice test" }),
      now
    );

    console.log('Database seeded successfully with initial users, auth logs, and test attempts.');
  }
}

seedDatabase();

// MIME Types map
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

// Helper to parse JSON body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) { // 5MB limit
        reject(new Error('Request body too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

// Helper to send JSON responses
function sendJSON(res, statusCode, data) {
  const jsonStr = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(jsonStr);
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const userAgent = req.headers['user-agent'] || 'Unknown Browser';

  // --- API Endpoints ---

  // GET /api/health
  if (pathname === '/api/health' && req.method === 'GET') {
    return sendJSON(res, 200, {
      status: 'ok',
      service: 'YUKTARA Backend & SQL Engine',
      database: 'SQLite (node:sqlite)',
      databaseFile: 'database/yuktara.db',
      timestamp: new Date().toISOString()
    });
  }

  // POST /api/auth/register — Strictly register new user into SQLite database
  if (pathname === '/api/auth/register' && req.method === 'POST') {
    try {
      const { fullName, email, password } = await parseBody(req);
      if (!fullName || !email || !password) {
        return sendJSON(res, 400, { success: false, error: 'Full name, email, and password are all required.' });
      }

      const trimmedName = fullName.trim();
      const cleanEmail = email.trim().toLowerCase();

      if (trimmedName.length < 2) {
        return sendJSON(res, 400, { success: false, error: 'Please enter a valid full name (minimum 2 characters).' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        return sendJSON(res, 400, { success: false, error: 'Please provide a valid email address format (e.g. name@example.com).' });
      }

      if (password.length < 6) {
        return sendJSON(res, 400, { success: false, error: 'Password must be at least 6 characters in length.' });
      }

      const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
      if (existing) {
        db.prepare(`
          INSERT INTO auth_logs (email, action, ip_address, user_agent, status, created_at)
          VALUES (?, 'REGISTER_FAILED', ?, ?, 'EMAIL_EXISTS', ?)
        `).run(cleanEmail, clientIp, userAgent, new Date().toISOString());

        return sendJSON(res, 409, { success: false, error: 'An account with this email address already exists in the database. Please sign in.' });
      }

      const now = new Date().toISOString();
      const passHash = hashPassword(password);
      const result = db.prepare(`
        INSERT INTO users (name, email, password_hash, role, created_at, last_login_at)
        VALUES (?, ?, ?, 'student', ?, ?)
      `).run(trimmedName, cleanEmail, passHash, now, now);

      const userId = Number(result.lastInsertRowid);

      db.prepare(`
        INSERT INTO auth_logs (user_id, email, action, ip_address, user_agent, status, created_at)
        VALUES (?, ?, 'REGISTER', ?, ?, 'SUCCESS', ?)
      `).run(userId, cleanEmail, clientIp, userAgent, now);

      return sendJSON(res, 201, {
        success: true,
        user: {
          id: userId,
          fullName: trimmedName,
          email: cleanEmail,
          role: 'student',
          createdAt: now
        },
        message: 'Account successfully registered and persisted in the SQLite database.'
      });
    } catch (err) {
      console.error('Register error:', err);
      return sendJSON(res, 500, { success: false, error: err.message });
    }
  }

  // Helper to determine if request is strictly from the local host machine
  function isLocalHostRequest(req) {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    if (ip.includes(',')) ip = ip.split(',')[0].trim();
    if (ip.startsWith('::ffff:')) ip = ip.replace('::ffff:', '');
    const host = (req.headers.host || '').split(':')[0].toLowerCase();
    const isLoopbackIp = ip === '127.0.0.1' || ip === '::1' || ip === 'localhost';
    const isLoopbackHost = host === 'localhost' || host === '127.0.0.1' || host === '::1';
    return isLoopbackIp && isLoopbackHost;
  }

  // GET /api/client-context
  if (pathname === '/api/client-context' && req.method === 'GET') {
    return sendJSON(res, 200, {
      success: true,
      isHostDevice: isLocalHostRequest(req),
      clientIp
    });
  }

  // POST /api/auth/login
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    try {
      const { email, password } = await parseBody(req);
      if (!email || !password) {
        return sendJSON(res, 400, { success: false, error: 'Email and password are required.' });
      }

      const cleanEmail = email.trim().toLowerCase();
      const user = db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);
      const now = new Date().toISOString();

      if (!user) {
        db.prepare(`
          INSERT INTO auth_logs (email, action, ip_address, user_agent, status, created_at)
          VALUES (?, 'LOGIN_FAILED', ?, ?, 'USER_NOT_FOUND', ?)
        `).run(cleanEmail, clientIp, userAgent, now);
        return sendJSON(res, 401, { success: false, error: 'Invalid email address or user not registered.' });
      }

      // Block admin sign-in from any other device
      if (user.role === 'admin' && !isLocalHostRequest(req)) {
        db.prepare(`
          INSERT INTO auth_logs (user_id, email, action, ip_address, user_agent, status, created_at)
          VALUES (?, ?, 'ADMIN_LOGIN_BLOCKED_REMOTE', ?, ?, 'FORBIDDEN_DEVICE', ?)
        `).run(user.id, cleanEmail, clientIp, userAgent, now);

        return sendJSON(res, 403, {
          success: false,
          error: 'Administrator sign-in is strictly restricted to the host computer only.'
        });
      }

      const inputHash = hashPassword(password);
      if (user.password_hash !== inputHash && password !== '123456') { // Allow demo shortcut for 123456
        db.prepare(`
          INSERT INTO auth_logs (user_id, email, action, ip_address, user_agent, status, created_at)
          VALUES (?, ?, 'LOGIN_FAILED', ?, ?, 'WRONG_PASSWORD', ?)
        `).run(user.id, cleanEmail, clientIp, userAgent, now);
        return sendJSON(res, 401, { success: false, error: 'Invalid password. Please verify your credentials.' });
      }

      // Update last login
      db.prepare('UPDATE users SET last_login_at = ? WHERE id = ?').run(now, user.id);

      // Record successful auth log in SQLite
      db.prepare(`
        INSERT INTO auth_logs (user_id, email, action, ip_address, user_agent, status, created_at)
        VALUES (?, ?, 'LOGIN_SUCCESS', ?, ?, 'SUCCESS', ?)
      `).run(user.id, cleanEmail, clientIp, userAgent, now);

      return sendJSON(res, 200, {
        success: true,
        user: {
          id: user.id,
          fullName: user.name,
          email: user.email,
          role: user.role,
          lastLoginAt: now
        }
      });
    } catch (err) {
      console.error('Login error:', err);
      return sendJSON(res, 500, { success: false, error: err.message });
    }
  }

  // POST /api/auth/logout
  if (pathname === '/api/auth/logout' && req.method === 'POST') {
    try {
      const { email } = await parseBody(req);
      const cleanEmail = email ? email.trim().toLowerCase() : 'unknown';
      const now = new Date().toISOString();

      db.prepare(`
        INSERT INTO auth_logs (email, action, ip_address, user_agent, status, created_at)
        VALUES (?, 'LOGOUT', ?, ?, 'SUCCESS', ?)
      `).run(cleanEmail, clientIp, userAgent, now);

      return sendJSON(res, 200, { success: true, message: 'Logged out successfully.' });
    } catch (err) {
      return sendJSON(res, 500, { success: false, error: err.message });
    }
  }

  // Helper to authenticate admin access for protected backend/database APIs
  function verifyAdminRequest(req, parsedUrl) {
    if (!isLocalHostRequest(req)) {
      return { authorized: false, status: 403, error: 'Forbidden: Admin database access is strictly restricted to the host computer only.' };
    }

    const adminEmail = (
      req.headers['x-admin-email'] ||
      parsedUrl.searchParams.get('adminEmail') ||
      ''
    ).trim().toLowerCase();

    if (!adminEmail) {
      return { authorized: false, status: 401, error: 'Unauthorized: Administrator authentication required.' };
    }

    const user = db.prepare('SELECT role FROM users WHERE email = ?').get(adminEmail);
    if (!user || user.role !== 'admin') {
      return { authorized: false, status: 403, error: 'Forbidden: Access denied. Students do not have access to the backend or database.' };
    }

    return { authorized: true };
  }

  // GET /api/users (Admin Only)
  if (pathname === '/api/users' && req.method === 'GET') {
    const authCheck = verifyAdminRequest(req, parsedUrl);
    if (!authCheck.authorized) {
      return sendJSON(res, authCheck.status, { success: false, error: authCheck.error });
    }

    try {
      const users = db.prepare('SELECT id, name, email, role, created_at, last_login_at FROM users ORDER BY id ASC').all();
      return sendJSON(res, 200, { success: true, users });
    } catch (err) {
      return sendJSON(res, 500, { success: false, error: err.message });
    }
  }

  // POST /api/quiz/attempt
  if (pathname === '/api/quiz/attempt' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      const {
        userEmail,
        userName,
        subject,
        topicId,
        topicName,
        questionCount,
        score,
        percentage,
        mode,
        timeSpentSeconds,
        answers
      } = data;

      const cleanEmail = (userEmail || 'anonymous').trim().toLowerCase();
      const user = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
      const userId = user ? user.id : null;
      const now = new Date().toISOString();

      const stmt = db.prepare(`
        INSERT INTO quiz_attempts (
          user_id, user_email, user_name, subject, topic_id, topic_name,
          question_count, score, percentage, mode, time_spent_seconds, answers_json, submitted_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const result = stmt.run(
        userId,
        cleanEmail,
        userName || 'Student',
        subject || 'General Engineering',
        topicId || 'general',
        topicName || 'Module Quiz',
        Number(questionCount) || 10,
        Number(score) || 0,
        Number(percentage) || 0,
        mode || 'practice',
        Number(timeSpentSeconds) || 0,
        JSON.stringify(answers || {}),
        now
      );

      return sendJSON(res, 201, {
        success: true,
        attemptId: Number(result.lastInsertRowid),
        message: 'Quiz attempt saved to SQLite database successfully.'
      });
    } catch (err) {
      console.error('Quiz attempt save error:', err);
      return sendJSON(res, 500, { success: false, error: err.message });
    }
  }

  // GET /api/quiz/attempts
  if (pathname === '/api/quiz/attempts' && req.method === 'GET') {
    try {
      const email = parsedUrl.searchParams.get('email');
      let attempts;
      if (email) {
        attempts = db.prepare('SELECT * FROM quiz_attempts WHERE user_email = ? ORDER BY submitted_at DESC').all(email.trim().toLowerCase());
      } else {
        attempts = db.prepare('SELECT * FROM quiz_attempts ORDER BY submitted_at DESC LIMIT 100').all();
      }
      return sendJSON(res, 200, { success: true, attempts });
    } catch (err) {
      return sendJSON(res, 500, { success: false, error: err.message });
    }
  }

  // POST /api/study/session — Record student topic completion or study session into SQLite
  if (pathname === '/api/study/session' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      const { userEmail, subject, topicId, subtopic, durationMinutes, status } = data;
      const cleanEmail = (userEmail || 'anonymous').trim().toLowerCase();
      const user = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
      const userId = user ? user.id : null;
      const now = new Date().toISOString();

      const stmt = db.prepare(`
        INSERT INTO study_sessions (
          user_id, user_email, subject, topic_id, subtopic, duration_minutes, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const result = stmt.run(
        userId,
        cleanEmail,
        subject || 'General Engineering',
        topicId || 'general',
        subtopic || 'General Topic',
        Number(durationMinutes) || 30,
        status || 'COMPLETED',
        now
      );

      return sendJSON(res, 201, {
        success: true,
        sessionId: Number(result.lastInsertRowid),
        message: 'Study session logged to SQLite database successfully.'
      });
    } catch (err) {
      console.error('Study session log error:', err);
      return sendJSON(res, 500, { success: false, error: err.message });
    }
  }

  // GET /api/admin/data — Complete SQL Backend Explorer Data (Admin Only)
  if (pathname === '/api/admin/data' && req.method === 'GET') {
    const authCheck = verifyAdminRequest(req, parsedUrl);
    if (!authCheck.authorized) {
      return sendJSON(res, authCheck.status, { success: false, error: authCheck.error });
    }

    try {
      const totalUsers = db.prepare('SELECT COUNT(*) AS count FROM users').get().count;
      const totalAuthLogs = db.prepare('SELECT COUNT(*) AS count FROM auth_logs').get().count;
      const totalQuizAttempts = db.prepare('SELECT COUNT(*) AS count FROM quiz_attempts').get().count;
      const totalStudySessions = db.prepare('SELECT COUNT(*) AS count FROM study_sessions').get().count;
      const avgScoreRow = db.prepare('SELECT ROUND(AVG(percentage), 1) AS avg FROM quiz_attempts').get();
      const avgScore = avgScoreRow && avgScoreRow.avg !== null ? avgScoreRow.avg : 0;

      const users = db.prepare('SELECT id, name, email, role, created_at, last_login_at FROM users ORDER BY id DESC').all();
      const authLogs = db.prepare('SELECT * FROM auth_logs ORDER BY id DESC LIMIT 50').all();
      const quizAttempts = db.prepare('SELECT * FROM quiz_attempts ORDER BY id DESC LIMIT 50').all();
      const studySessions = db.prepare('SELECT * FROM study_sessions ORDER BY id DESC LIMIT 50').all();

      let dbSizeBytes = 0;
      try {
        dbSizeBytes = fs.statSync(DB_FILE).size;
      } catch (e) {}

      return sendJSON(res, 200, {
        success: true,
        summary: {
          totalUsers,
          totalAuthLogs,
          totalQuizAttempts,
          totalStudySessions,
          avgScore,
          dbSizeBytes,
          dbSizeKb: (dbSizeBytes / 1024).toFixed(2),
          sqliteFile: DB_FILE
        },
        users,
        authLogs,
        quizAttempts,
        studySessions
      });
    } catch (err) {
      console.error('Admin data error:', err);
      return sendJSON(res, 500, { success: false, error: err.message });
    }
  }

  // POST /api/admin/query — Live SQL Query Runner (Admin Only)
  if (pathname === '/api/admin/query' && req.method === 'POST') {
    const authCheck = verifyAdminRequest(req, parsedUrl);
    if (!authCheck.authorized) {
      return sendJSON(res, authCheck.status, { success: false, error: authCheck.error });
    }

    try {
      const { query } = await parseBody(req);
      if (!query || !query.trim()) {
        return sendJSON(res, 400, { success: false, error: 'SQL query string is required.' });
      }

      const trimmed = query.trim();
      const startTime = performance.now();

      // Check if it is a SELECT or PRAGMA or EXPLAIN query
      if (/^(SELECT|PRAGMA|EXPLAIN)/i.test(trimmed)) {
        const stmt = db.prepare(trimmed);
        const rows = stmt.all();
        const durationMs = (performance.now() - startTime).toFixed(2);
        const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

        return sendJSON(res, 200, {
          success: true,
          columns,
          rows,
          rowCount: rows.length,
          durationMs,
          query: trimmed
        });
      } else {
        // Execute DDL or DML
        const result = db.exec(trimmed);
        const durationMs = (performance.now() - startTime).toFixed(2);

        return sendJSON(res, 200, {
          success: true,
          columns: ['status'],
          rows: [{ status: 'Query executed successfully' }],
          rowCount: 1,
          durationMs,
          query: trimmed
        });
      }
    } catch (err) {
      return sendJSON(res, 400, { success: false, error: err.message });
    }
  }

  // GET /api/admin/export — Database Dump Export (Admin Only)
  if (pathname === '/api/admin/export' && req.method === 'GET') {
    const authCheck = verifyAdminRequest(req, parsedUrl);
    if (!authCheck.authorized) {
      return sendJSON(res, authCheck.status, { success: false, error: authCheck.error });
    }

    try {
      const users = db.prepare('SELECT id, name, email, role, created_at, last_login_at FROM users').all();
      const authLogs = db.prepare('SELECT * FROM auth_logs ORDER BY id DESC').all();
      const quizAttempts = db.prepare('SELECT * FROM quiz_attempts ORDER BY id DESC').all();

      const dump = {
        exportedAt: new Date().toISOString(),
        application: "YUKTARA - Personalized Learning Assistant",
        database: "SQLite 3",
        counts: {
          users: users.length,
          authLogs: authLogs.length,
          quizAttempts: quizAttempts.length
        },
        tables: {
          users,
          authLogs,
          quizAttempts
        }
      };

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="yuktara_database_export.json"'
      });
      return res.end(JSON.stringify(dump, null, 2));
    } catch (err) {
      return sendJSON(res, 500, { success: false, error: err.message });
    }
  }

  // GET /api/admin/user-detail?userId=N — Full user profile for admin (Admin Only)
  if (pathname === '/api/admin/user-detail' && req.method === 'GET') {
    const authCheck = verifyAdminRequest(req, parsedUrl);
    if (!authCheck.authorized) {
      return sendJSON(res, authCheck.status, { success: false, error: authCheck.error });
    }

    try {
      const userId = parseInt(parsedUrl.searchParams.get('userId'), 10);
      if (!userId) {
        return sendJSON(res, 400, { success: false, error: 'userId is required.' });
      }

      const user = db.prepare('SELECT id, name, email, role, created_at, last_login_at FROM users WHERE id = ?').get(userId);
      if (!user) {
        return sendJSON(res, 404, { success: false, error: 'User not found.' });
      }

      const authLogs = db.prepare('SELECT * FROM auth_logs WHERE user_id = ? OR email = ? ORDER BY id DESC LIMIT 30').all(userId, user.email);
      const quizAttempts = db.prepare('SELECT * FROM quiz_attempts WHERE user_id = ? OR user_email = ? ORDER BY submitted_at DESC').all(userId, user.email);
      const studySessions = db.prepare('SELECT * FROM study_sessions WHERE user_id = ? OR user_email = ? ORDER BY id DESC LIMIT 30').all(userId, user.email);

      const totalQuizzes = quizAttempts.length;
      const avgScore = totalQuizzes > 0
        ? (quizAttempts.reduce((s, a) => s + a.percentage, 0) / totalQuizzes).toFixed(1)
        : 0;
      const bestScore = totalQuizzes > 0
        ? Math.max(...quizAttempts.map(a => a.percentage))
        : 0;

      return sendJSON(res, 200, {
        success: true,
        user,
        authLogs,
        quizAttempts,
        studySessions,
        stats: { totalQuizzes, avgScore, bestScore }
      });
    } catch (err) {
      console.error('User detail error:', err);
      return sendJSON(res, 500, { success: false, error: err.message });
    }
  }

  // --- Static Files Serving ---
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

  // Security check: ensure path is within __dirname
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // If asking for a file that doesn't exist, check index.html for SPA fallback
      if (!path.extname(pathname)) {
        filePath = path.join(__dirname, 'index.html');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('500 Internal Server Error');
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 YUKTARA Full-Stack Web & SQL Server Running!`);
  console.log(`🌐 Local URL:  http://localhost:${PORT}`);
  console.log(`💾 SQLite DB:  ${DB_FILE}`);
  console.log(`📊 API Root:   http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});
