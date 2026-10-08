// netlify/functions/auth-register.js
// POST /api/auth/register
// Validates input, hashes password with bcrypt, INSERTs into PostgreSQL users table.

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

  // Ensure schema exists (idempotent — safe to call every time)
  if (!schemaReady) {
    try { await initializeSchema(); schemaReady = true; } catch (e) {
      console.error('[REGISTER] Schema init error:', e.message);
      return { statusCode: 503, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Database not ready. Please try again.' }) };
    }
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { body = {}; }

  const { fullName, email, password } = body;

  console.log(`[AUTH] Registration request for: ${email || '(none)'}`);

  // --- Validation ---
  if (!fullName || !email || !password) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Full name, email, and password are all required.' }) };
  }

  const trimmedName = String(fullName).trim();
  const cleanEmail = String(email).trim().toLowerCase();

  if (trimmedName.length < 2) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Full name must be at least 2 characters.' }) };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Please provide a valid email address.' }) };
  }

  if (String(password).length < 6) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Password must be at least 6 characters.' }) };
  }

  const clientIp = event.headers['x-forwarded-for'] || event.headers['client-ip'] || '0.0.0.0';
  const userAgent = event.headers['user-agent'] || 'Unknown';

  try {
    // Check duplicate email
    console.log(`[AUTH] Checking duplicate email: ${cleanEmail}`);
    const existing = await queryOne('SELECT id FROM users WHERE email = $1', [cleanEmail]);
    if (existing) {
      console.warn(`[AUTH] Registration rejected: email already exists (id=${existing.id})`);
      await query(
        `INSERT INTO auth_logs (email, action, ip_address, user_agent, status) VALUES ($1, 'REGISTER_FAILED', $2, $3, 'EMAIL_EXISTS')`,
        [cleanEmail, clientIp, userAgent]
      );
      return { statusCode: 409, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'An account with this email already exists. Please sign in.' }) };
    }

    // Hash password with bcrypt (cost factor 12)
    const passwordHash = await bcrypt.hash(String(password), 12);

    // INSERT into PostgreSQL
    console.log(`[AUTH] Inserting new user into PostgreSQL: ${trimmedName} <${cleanEmail}>`);
    const result = await queryOne(
      `INSERT INTO users (name, email, password_hash, role, created_at, last_login_at)
       VALUES ($1, $2, $3, 'student', NOW(), NOW())
       RETURNING id, name, email, role, created_at`,
      [trimmedName, cleanEmail, passwordHash]
    );

    const userId = Number(result.id);
    console.log(`[AUTH] User inserted successfully with ID: ${userId}`);

    // Create auth log
    await query(
      `INSERT INTO auth_logs (user_id, email, action, ip_address, user_agent, status) VALUES ($1, $2, 'REGISTER', $3, $4, 'SUCCESS')`,
      [userId, cleanEmail, clientIp, userAgent]
    );

    console.log(`[AUTH] Registration successful for ${cleanEmail} (ID: ${userId})`);

    return {
      statusCode: 201,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        user: {
          id: userId,
          fullName: result.name,
          email: result.email,
          role: result.role,
          createdAt: result.created_at,
        },
        message: 'Account successfully registered and stored in PostgreSQL.',
      }),
    };
  } catch (err) {
    console.error('[AUTH] Registration error (PostgreSQL):', err.message);
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Registration failed. Please try again.' }) };
  }
};
