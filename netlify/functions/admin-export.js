// netlify/functions/admin-export.js
// GET /api/admin/export — JSON export of PostgreSQL database, admin-only.

'use strict';

const { queryOne, queryAll, initializeSchema } = require('./db/database');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Email',
};

let schemaReady = false;

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }, body: JSON.stringify({ success: false, error: 'Method not allowed.' }) };
  }

  if (!schemaReady) {
    try { await initializeSchema(); schemaReady = true; } catch (e) {
      return { statusCode: 503, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }, body: JSON.stringify({ success: false, error: e.message || 'Database not ready.' }) };
    }
  }

  const adminEmail = (event.headers['x-admin-email'] || event.queryStringParameters?.adminEmail || '').trim().toLowerCase();
  if (!adminEmail) {
    return { statusCode: 401, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }, body: JSON.stringify({ success: false, error: 'Unauthorized.' }) };
  }

  try {
    const adminUser = await queryOne('SELECT role FROM users WHERE email = $1', [adminEmail]);
    if (!adminUser || adminUser.role !== 'admin') {
      return { statusCode: 403, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }, body: JSON.stringify({ success: false, error: 'Forbidden.' }) };
    }

    const [users, authLogs, quizAttempts] = await Promise.all([
      queryAll('SELECT id, name, email, role, created_at, last_login_at FROM users ORDER BY id', []),
      queryAll('SELECT * FROM auth_logs ORDER BY id DESC', []),
      queryAll('SELECT * FROM quiz_attempts ORDER BY id DESC', []),
    ]);

    const dump = {
      exportedAt: new Date().toISOString(),
      application: 'YUKTARA - Personalized Learning Assistant',
      database: 'PostgreSQL',
      counts: { users: users.length, authLogs: authLogs.length, quizAttempts: quizAttempts.length },
      tables: { users, authLogs, quizAttempts },
    };

    return {
      statusCode: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="yuktara_postgres_export.json"',
      },
      body: JSON.stringify(dump, null, 2),
    };
  } catch (err) {
    return { statusCode: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }, body: JSON.stringify({ success: false, error: 'Export failed.' }) };
  }
};
