// netlify/functions/admin-data.js
// GET /api/admin/data — live PostgreSQL stats for the Backend & DB dashboard
// Protected: requires X-Admin-Email header with an admin-role user.

'use strict';

const { queryOne, queryAll, query, initializeSchema } = require('./db/database');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Email',
  'Content-Type': 'application/json',
};

let schemaReady = false;

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Method not allowed.' }) };
  }

  if (!schemaReady) {
    try { await initializeSchema(); schemaReady = true; } catch (e) {
      return { statusCode: 503, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: e.message || 'Database not ready.' }) };
    }
  }

  // Admin authorization check
  const adminEmail = (
    event.headers['x-admin-email'] ||
    event.queryStringParameters?.adminEmail ||
    ''
  ).trim().toLowerCase();

  if (!adminEmail) {
    return { statusCode: 401, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Unauthorized: admin email required.' }) };
  }

  try {
    const adminUser = await queryOne('SELECT role FROM users WHERE email = $1', [adminEmail]);
    if (!adminUser || adminUser.role !== 'admin') {
      return { statusCode: 403, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Forbidden: admin access only.' }) };
    }

    // Live PostgreSQL counts
    const [usersCount, authCount, quizCount, sessionsCount, avgRow] = await Promise.all([
      queryOne('SELECT COUNT(*)::int AS count FROM users', []),
      queryOne('SELECT COUNT(*)::int AS count FROM auth_logs', []),
      queryOne('SELECT COUNT(*)::int AS count FROM quiz_attempts', []),
      queryOne('SELECT COUNT(*)::int AS count FROM study_sessions', []),
      queryOne('SELECT ROUND(AVG(percentage)::numeric, 1) AS avg FROM quiz_attempts', []),
    ]);

    // Live data rows
    const [users, authLogs, quizAttempts, studySessions] = await Promise.all([
      queryAll('SELECT id, name, email, role, created_at, last_login_at FROM users ORDER BY id DESC', []),
      queryAll('SELECT * FROM auth_logs ORDER BY id DESC LIMIT 50', []),
      queryAll('SELECT * FROM quiz_attempts ORDER BY id DESC LIMIT 50', []),
      queryAll('SELECT * FROM study_sessions ORDER BY id DESC LIMIT 50', []),
    ]);

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        summary: {
          totalUsers: usersCount?.count || 0,
          totalAuthLogs: authCount?.count || 0,
          totalQuizAttempts: quizCount?.count || 0,
          totalStudySessions: sessionsCount?.count || 0,
          avgScore: avgRow?.avg || 0,
          dbSizeKb: 'N/A (PostgreSQL)',
          dbInfo: 'PostgreSQL (cloud)',
        },
        users,
        authLogs,
        quizAttempts,
        studySessions,
      }),
    };
  } catch (err) {
    console.error('[ADMIN] Data fetch error:', err.message);
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: err.message || 'Failed to load admin data.' }) };
  }
};
