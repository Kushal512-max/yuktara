// netlify/functions/auth-register.js
// POST /api/auth/register
// Registers a new user and stores the account in PostgreSQL.

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
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: '',
    };
  }

  // Only POST is allowed
  if (event.httpMethod !== 'POST') {
    return response(405, {
      success: false,
      error: 'Method not allowed.',
    });
  }

  // Check if DATABASE_URL is provided in environment
  if (!process.env.DATABASE_URL || !process.env.DATABASE_URL.trim()) {
    console.error('[AUTH-REGISTER] FATAL: DATABASE_URL is not set.');
    return response(503, {
      success: false,
      error: 'Database is not configured. DATABASE_URL environment variable is missing in Netlify.',
    });
  }

  // Ensure database schema is ready (idempotent CREATE TABLE IF NOT EXISTS)
  if (!schemaReady) {
    try {
      await initializeSchema();
      schemaReady = true;
      console.log('[AUTH-REGISTER] PostgreSQL schema ready.');
    } catch (schemaError) {
      console.error('[AUTH-REGISTER] Schema initialization failed:', schemaError.message, schemaError.code);
      const safeMessage = classifyDbError(schemaError);
      return response(503, {
        success: false,
        error: safeMessage,
      });
    }
  }

  // Parse request body
  let body;
  try {
    body = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : (event.body || {});
  } catch (parseError) {
    return response(400, {
      success: false,
      error: 'Invalid JSON request body.',
    });
  }

  const { fullName, email, password } = body;

  // Validate required fields
  if (!fullName || !email || !password) {
    return response(400, {
      success: false,
      error: 'Full name, email, and password are all required.',
    });
  }

  // Sanitize and normalize input
  const trimmedName = String(fullName).trim();
  const cleanEmail = String(email).trim().toLowerCase();
  const cleanPassword = String(password);

  // Validate name
  if (trimmedName.length < 2) {
    return response(400, {
      success: false,
      error: 'Full name must be at least 2 characters long.',
    });
  }

  if (trimmedName.length > 255) {
    return response(400, {
      success: false,
      error: 'Full name is too long (maximum 255 characters).',
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return response(400, {
      success: false,
      error: 'Please provide a valid email address.',
    });
  }

  if (cleanEmail.length > 255) {
    return response(400, {
      success: false,
      error: 'Email address is too long (maximum 255 characters).',
    });
  }

  // Validate password length
  if (cleanPassword.length < 6) {
    return response(400, {
      success: false,
      error: 'Password must be at least 6 characters long.',
    });
  }

  // Client metadata for audit logs
  const headers = event.headers || {};
  const clientIp = headers['x-forwarded-for'] || headers['client-ip'] || headers['x-real-ip'] || '0.0.0.0';
  const userAgent = headers['user-agent'] || 'Unknown';

  try {
    // Check if email already exists
    console.log(`[AUTH-REGISTER] Checking duplicate email: ${cleanEmail}`);
    const existingUser = await queryOne(
      'SELECT id FROM users WHERE email = $1 LIMIT 1',
      [cleanEmail]
    );

    if (existingUser) {
      console.warn(`[AUTH-REGISTER] Registration rejected — email exists: ${cleanEmail}`);
      try {
        await query(
          'INSERT INTO auth_logs (email, action, ip_address, user_agent, status) VALUES ($1, $2, $3, $4, $5)',
          [cleanEmail, 'REGISTER_FAILED', clientIp, userAgent, 'EMAIL_EXISTS']
        );
      } catch (logErr) {
        console.error('[AUTH-REGISTER] Auth log error:', logErr.message);
      }

      return response(409, {
        success: false,
        error: 'An account with this email address already exists. Please sign in instead.',
      });
    }

    // Hash password with bcrypt (salt factor: 12)
    console.log('[AUTH-REGISTER] Hashing password with bcrypt...');
    const passwordHash = await bcrypt.hash(cleanPassword, 12);

    // INSERT new user into PostgreSQL
    console.log(`[AUTH-REGISTER] Inserting user into PostgreSQL: ${trimmedName} <${cleanEmail}>`);
    const result = await queryOne(
      `INSERT INTO users (name, email, password_hash, role, created_at, last_login_at)
       VALUES ($1, $2, $3, 'student', NOW(), NULL)
       RETURNING id, name, email, role, created_at`,
      [trimmedName, cleanEmail, passwordHash]
    );

    if (!result) {
      throw new Error('User record creation failed to return data.');
    }

    const userId = Number(result.id);
    console.log(`[AUTH-REGISTER] User inserted successfully with ID: ${userId}`);

    // Record successful registration in auth_logs
    try {
      await query(
        'INSERT INTO auth_logs (user_id, email, action, ip_address, user_agent, status) VALUES ($1, $2, $3, $4, $5, $6)',
        [userId, cleanEmail, 'REGISTER', clientIp, userAgent, 'SUCCESS']
      );
    } catch (logErr) {
      console.error('[AUTH-REGISTER] Auth log creation non-fatal error:', logErr.message);
    }

    // Return success response WITHOUT exposing password hash
    return response(201, {
      success: true,
      user: {
        id: userId,
        fullName: result.name,
        name: result.name,
        email: result.email,
        role: result.role,
        createdAt: result.created_at,
      },
      message: 'Account successfully registered and stored in PostgreSQL.',
    });
  } catch (error) {
    // Unique constraint violation race condition
    if (error && error.code === '23505') {
      console.warn(`[AUTH-REGISTER] Concurrent unique violation on email: ${cleanEmail}`);
      return response(409, {
        success: false,
        error: 'An account with this email address already exists. Please sign in instead.',
      });
    }

    // Detailed server logging
    console.error('[AUTH-REGISTER] Registration database error:', error.message, error.code);
    const safeMessage = classifyDbError(error);

    return response(500, {
      success: false,
      error: safeMessage,
    });
  }
};