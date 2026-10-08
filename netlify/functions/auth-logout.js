// netlify/functions/auth-logout.js
// POST /api/auth/logout
// Creates a logout auth log entry in PostgreSQL.

'use strict';

const { query, initializeSchema } = require('./db/database');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

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
      // Non-critical — logout should still succeed even if log fails
    }
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { body = {}; }

  const cleanEmail = body.email ? String(body.email).trim().toLowerCase() : 'unknown';
  const clientIp = event.headers['x-forwarded-for'] || '0.0.0.0';
  const userAgent = event.headers['user-agent'] || 'Unknown';

  try {
    await query(
      `INSERT INTO auth_logs (email, action, ip_address, user_agent, status) VALUES ($1, 'LOGOUT', $2, $3, 'SUCCESS')`,
      [cleanEmail, clientIp, userAgent]
    );
  } catch (err) {
    // Non-critical — don't block logout if DB log fails
    console.warn('[AUTH] Logout log error (non-critical):', err.message);
  }

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({ success: true, message: 'Logged out successfully.' }),
  };
};
