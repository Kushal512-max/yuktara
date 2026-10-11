// netlify/functions/auth-login.js
// POST /api/auth/login
// Finds user in PostgreSQL, compares bcrypt hash, updates last_login_at.

'use strict';

const bcrypt = require('bcryptjs');
const {
  queryOne,
  query,
  initializeSchema,
  classifyDbError,
} = require('./db/database');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

let schemaReady = false;

function response(statusCode, data) {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(data),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return response(405, {
      success: false,
      error: 'Method not allowed.',
    });
  }

  if (!process.env.DATABASE_URL || !process.env.DATABASE_URL.trim()) {
    console.error('[AUTH-LOGIN] FATAL: DATABASE_URL is not set.');
    return response(503, {
      success: false,
      error: 'Database is not configured. DATABASE_URL environment variable is missing in Netlify.',
    });
  }

  if (!schemaReady) {
    try {
      await initializeSchema();
      schemaReady = true;
    } catch (schemaError) {
      console.error('[AUTH-LOGIN] Schema initialization failed:', schemaError.message);
      const safeMessage = classifyDbError(schemaError);
      return response(503, {
        success: false,
        error: safeMessage,
      });
    }
  }

  let body;
  try {
    body = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : (event.body || {});
  } catch {
    return response(400, {
      success: false,
      error: 'Invalid JSON request body.',
    });
  }

  const { email, password } = body;

  if (!email || !password) {
    return response(400, {
      success: false,
      error: 'Email and password are required.',
    });
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const cleanPassword = String(password);
  const headers = event.headers || {};
  const clientIp = headers['x-forwarded-for'] || headers['client-ip'] || headers['x-real-ip'] || '0.0.0.0';
  const userAgent = headers['user-agent'] || 'Unknown';

  console.log(`[AUTH-LOGIN] Login attempt for: ${cleanEmail}`);

  try {
    // Find user in PostgreSQL
    const user = await queryOne(
      'SELECT id, name, email, password_hash, role, created_at, last_login_at FROM users WHERE email = $1 LIMIT 1',
      [cleanEmail]
    );

    if (!user) {
      console.warn(`[AUTH-LOGIN] User not found: ${cleanEmail}`);
      try {
        await query(
          'INSERT INTO auth_logs (email, action, ip_address, user_agent, status) VALUES ($1, $2, $3, $4, $5)',
          [cleanEmail, 'LOGIN_FAILED', clientIp, userAgent, 'USER_NOT_FOUND']
        );
      } catch (logErr) {
        console.error('[AUTH-LOGIN] Auth log error:', logErr.message);
      }
      return response(401, {
        success: false,
        error: 'Invalid email or password. Please verify your credentials.',
      });
    }

    // Verify password against stored bcrypt hash
    const passwordMatch = await bcrypt.compare(cleanPassword, user.password_hash);

    if (!passwordMatch) {
      console.warn(`[AUTH-LOGIN] Incorrect password for: ${cleanEmail}`);
      try {
        await query(
          'INSERT INTO auth_logs (user_id, email, action, ip_address, user_agent, status) VALUES ($1, $2, $3, $4, $5, $6)',
          [user.id, cleanEmail, 'LOGIN_FAILED', clientIp, userAgent, 'WRONG_PASSWORD']
        );
      } catch (logErr) {
        console.error('[AUTH-LOGIN] Auth log error:', logErr.message);
      }
      return response(401, {
        success: false,
        error: 'Invalid email or password. Please verify your credentials.',
      });
    }

    // Update last_login_at in PostgreSQL
    await query('UPDATE users SET last_login_at = NOW() WHERE id = $1', [user.id]);

    // Record successful login in auth_logs
    try {
      await query(
        'INSERT INTO auth_logs (user_id, email, action, ip_address, user_agent, status) VALUES ($1, $2, $3, $4, $5, $6)',
        [user.id, cleanEmail, 'LOGIN_SUCCESS', clientIp, userAgent, 'SUCCESS']
      );
    } catch (logErr) {
      console.error('[AUTH-LOGIN] Auth log error:', logErr.message);
    }

    console.log(`[AUTH-LOGIN] Login successful for: ${cleanEmail} (ID: ${user.id}, Role: ${user.role})`);

    // Return sanitized user session WITHOUT exposing password_hash
    return response(200, {
      success: true,
      user: {
        id: Number(user.id),
        fullName: user.name,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLoginAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('[AUTH-LOGIN] Database error during login:', error.message, error.code);
    const safeMessage = classifyDbError(error);

    return response(500, {
      success: false,
      error: safeMessage,
    });
  }
};
