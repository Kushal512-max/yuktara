// netlify/functions/auth-login.js
// POST /api/auth/login
// Finds user in PostgreSQL, compares bcrypt hash, updates last_login_at.

'use strict';

const bcrypt = require('bcryptjs');
const { queryOne, query, initializeSchema } = require('./db/database');

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
      return { statusCode: 503, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Database not ready. Please try again.' }) };
    }
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { body = {}; }

  const { email, password } = body;

  if (!email || !password) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Email and password are required.' }) };
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const clientIp = event.headers['x-forwarded-for'] || event.headers['client-ip'] || '0.0.0.0';
  const userAgent = event.headers['user-agent'] || 'Unknown';

  console.log(`[AUTH] Login attempt for: ${cleanEmail}`);

  try {
    // Find user in PostgreSQL
    const user = await queryOne('SELECT * FROM users WHERE email = $1', [cleanEmail]);

    if (!user) {
      console.warn(`[AUTH] Login failed: user not found (${cleanEmail})`);
      await query(
        `INSERT INTO auth_logs (email, action, ip_address, user_agent, status) VALUES ($1, 'LOGIN_FAILED', $2, $3, 'USER_NOT_FOUND')`,
        [cleanEmail, clientIp, userAgent]
      );
      return { statusCode: 401, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Invalid email or password.' }) };
    }

    // Compare password using bcrypt
    const passwordMatch = await bcrypt.compare(String(password), user.password_hash);

    if (!passwordMatch) {
      console.warn(`[AUTH] Login failed: wrong password for ${cleanEmail}`);
      await query(
        `INSERT INTO auth_logs (user_id, email, action, ip_address, user_agent, status) VALUES ($1, $2, 'LOGIN_FAILED', $3, $4, 'WRONG_PASSWORD')`,
        [user.id, cleanEmail, clientIp, userAgent]
      );
      return { statusCode: 401, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Invalid email or password.' }) };
    }

    // Update last_login_at in PostgreSQL
    await query('UPDATE users SET last_login_at = NOW() WHERE id = $1', [user.id]);

    // Create auth log
    await query(
      `INSERT INTO auth_logs (user_id, email, action, ip_address, user_agent, status) VALUES ($1, $2, 'LOGIN_SUCCESS', $3, $4, 'SUCCESS')`,
      [user.id, cleanEmail, clientIp, userAgent]
    );

    console.log(`[AUTH] Login successful: ${cleanEmail} (ID: ${user.id}, role: ${user.role})`);

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        user: {
          id: Number(user.id),
          fullName: user.name,
          email: user.email,
          role: user.role,
          lastLoginAt: new Date().toISOString(),
        },
      }),
    };
  } catch (err) {
    console.error('[AUTH] Login error:', err.message);
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Login failed. Please try again.' }) };
  }
};
