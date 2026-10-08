// netlify/functions/admin-user-detail.js
// GET /api/admin/user-detail?userId=N — full user profile, admin-only.

'use strict';

const { queryOne, queryAll, initializeSchema } = require('./db/database');

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
      return { statusCode: 503, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Database not ready.' }) };
    }
  }

  const adminEmail = (event.headers['x-admin-email'] || '').trim().toLowerCase();
  if (!adminEmail) {
    return { statusCode: 401, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Unauthorized.' }) };
  }

  try {
    const adminUser = await queryOne('SELECT role FROM users WHERE email = $1', [adminEmail]);
    if (!adminUser || adminUser.role !== 'admin') {
      return { statusCode: 403, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Forbidden.' }) };
    }

    const userId = parseInt(event.queryStringParameters?.userId || '0', 10);
    if (!userId) {
      return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'userId is required.' }) };
    }

    const user = await queryOne(
      'SELECT id, name, email, role, created_at, last_login_at FROM users WHERE id = $1',
      [userId]
    );
    if (!user) {
      return { statusCode: 404, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'User not found.' }) };
    }

    const [authLogs, quizAttempts, studySessions] = await Promise.all([
      queryAll('SELECT * FROM auth_logs WHERE user_id = $1 OR email = $2 ORDER BY id DESC LIMIT 30', [userId, user.email]),
      queryAll('SELECT * FROM quiz_attempts WHERE user_id = $1 OR user_email = $2 ORDER BY submitted_at DESC', [userId, user.email]),
      queryAll('SELECT * FROM study_sessions WHERE user_id = $1 OR user_email = $2 ORDER BY id DESC LIMIT 30', [userId, user.email]),
    ]);

    const totalQuizzes = quizAttempts.length;
    const avgScore = totalQuizzes > 0
      ? (quizAttempts.reduce((s, a) => s + Number(a.percentage), 0) / totalQuizzes).toFixed(1)
      : 0;
    const bestScore = totalQuizzes > 0
      ? Math.max(...quizAttempts.map(a => Number(a.percentage)))
      : 0;

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        user,
        authLogs,
        quizAttempts,
        studySessions,
        stats: { totalQuizzes, avgScore, bestScore },
      }),
    };
  } catch (err) {
    console.error('[ADMIN-USER-DETAIL] Error:', err.message);
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Failed to load user detail.' }) };
  }
};
