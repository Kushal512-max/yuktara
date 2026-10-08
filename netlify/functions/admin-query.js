// netlify/functions/admin-query.js
// POST /api/admin/query — Live SQL runner, admin-only, SELECT-only for safety.
// Blocks all destructive operations (DROP, DELETE, TRUNCATE, etc.)

'use strict';

const { query, queryAll, queryOne, initializeSchema } = require('./db/database');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Email',
  'Content-Type': 'application/json',
};

// Patterns that are NEVER allowed — destructive SQL
const BLOCKED_PATTERNS = /\b(DROP|TRUNCATE|DELETE|ALTER|CREATE\s+TABLE(?!\s+IF\s+NOT\s+EXISTS)|INSERT|UPDATE|GRANT|REVOKE|COPY|VACUUM|REINDEX)\b/i;

let schemaReady = false;

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Method not allowed.' }) };
  }

  if (!schemaReady) {
    try { await initializeSchema(); schemaReady = true; } catch (e) {
      return { statusCode: 503, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Database not ready.' }) };
    }
  }

  // Admin authorization
  const adminEmail = (event.headers['x-admin-email'] || '').trim().toLowerCase();
  if (!adminEmail) {
    return { statusCode: 401, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Unauthorized.' }) };
  }

  try {
    const adminUser = await queryOne('SELECT role FROM users WHERE email = $1', [adminEmail]);
    if (!adminUser || adminUser.role !== 'admin') {
      return { statusCode: 403, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Forbidden: admin access only.' }) };
    }

    let body;
    try { body = JSON.parse(event.body || '{}'); } catch { body = {}; }

    const sqlQuery = (body.query || '').trim();
    if (!sqlQuery) {
      return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'SQL query is required.' }) };
    }

    // Block destructive operations
    if (BLOCKED_PATTERNS.test(sqlQuery)) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: 'This operation is not allowed in the live SQL runner. Only SELECT and EXPLAIN queries are permitted.',
        }),
      };
    }

    // Only allow SELECT/EXPLAIN/SHOW/\\d type queries
    if (!/^\s*(SELECT|EXPLAIN|SHOW|WITH)/i.test(sqlQuery)) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: false, error: 'Only SELECT, EXPLAIN, SHOW, and WITH queries are permitted.' }),
      };
    }

    const startTime = Date.now();
    const rows = await queryAll(sqlQuery, []);
    const durationMs = (Date.now() - startTime).toFixed(0);
    const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        columns,
        rows,
        rowCount: rows.length,
        durationMs,
        query: sqlQuery,
      }),
    };
  } catch (err) {
    console.error('[ADMIN-QUERY] SQL error:', err.message);
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, error: 'Query failed: ' + err.message }),
    };
  }
};
