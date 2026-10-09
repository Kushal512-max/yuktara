// netlify/functions/auth-register.js
// POST /api/auth/register
// Registers a user and stores the account in Supabase PostgreSQL.

'use strict';

const bcrypt = require('bcryptjs');
const {
  queryOne,
  query,
  initializeSchema,
} = require('./db/database');

// ------------------------------------------------------------
// CORS
// ------------------------------------------------------------

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

let schemaReady = false;

// ------------------------------------------------------------
// Helper: JSON response
// ------------------------------------------------------------

function response(statusCode, data) {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(data),
  };
}

// ------------------------------------------------------------
// Netlify Function
// ------------------------------------------------------------

exports.handler = async (event) => {
  // ----------------------------------------------------------
  // CORS preflight
  // ----------------------------------------------------------

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: '',
    };
  }

  // ----------------------------------------------------------
  // Only POST is allowed
  // ----------------------------------------------------------

  if (event.httpMethod !== 'POST') {
    return response(405, {
      success: false,
      error: 'Method not allowed.',
    });
  }

  // ----------------------------------------------------------
  // Initialize database schema
  // ----------------------------------------------------------

  if (!schemaReady) {
    try {
      await initializeSchema();
      schemaReady = true;

      console.log('[REGISTER] PostgreSQL schema is ready.');
    } catch (error) {
      console.error(
        '[REGISTER] Database schema initialization failed:',
        error.message
      );

      return response(503, {
        success: false,
        error:
          'Database is not available. Please verify DATABASE_URL in Netlify.',
      });
    }
  }

  // ----------------------------------------------------------
  // Parse request body
  // ----------------------------------------------------------

  let body;

  try {
    body = JSON.parse(event.body || '{}');
  } catch (error) {
    return response(400, {
      success: false,
      error: 'Invalid JSON request body.',
    });
  }

  // ----------------------------------------------------------
  // Get registration data
  // ----------------------------------------------------------

  const { fullName, email, password } = body;

  console.log(
    `[AUTH] Registration request received for: ${
      email || '(no email)'
    }`
  );

  // ----------------------------------------------------------
  // Validate required fields
  // ----------------------------------------------------------

  if (!fullName || !email || !password) {
    return response(400, {
      success: false,
      error: 'Full name, email, and password are all required.',
    });
  }

  // ----------------------------------------------------------
  // Clean input
  // ----------------------------------------------------------

  const trimmedName = String(fullName).trim();
  const cleanEmail = String(email).trim().toLowerCase();
  const cleanPassword = String(password);

  // ----------------------------------------------------------
  // Validate name
  // ----------------------------------------------------------

  if (trimmedName.length < 2) {
    return response(400, {
      success: false,
      error: 'Full name must be at least 2 characters.',
    });
  }

  if (trimmedName.length > 255) {
    return response(400, {
      success: false,
      error: 'Full name is too long.',
    });
  }

  // ----------------------------------------------------------
  // Validate email
  // ----------------------------------------------------------

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
      error: 'Email address is too long.',
    });
  }

  // ----------------------------------------------------------
  // Validate password
  // ----------------------------------------------------------

  if (cleanPassword.length < 6) {
    return response(400, {
      success: false,
      error: 'Password must be at least 6 characters.',
    });
  }

  // ----------------------------------------------------------
  // Request information
  // ----------------------------------------------------------

  const headers = event.headers || {};

  const clientIp =
    headers['x-forwarded-for'] ||
    headers['client-ip'] ||
    headers['x-real-ip'] ||
    '0.0.0.0';

  const userAgent =
    headers['user-agent'] ||
    'Unknown';

  // ----------------------------------------------------------
  // Database operations
  // ----------------------------------------------------------

  try {
    // --------------------------------------------------------
    // Check if email already exists
    // --------------------------------------------------------

    console.log(
      `[AUTH] Checking whether email already exists: ${cleanEmail}`
    );

    const existingUser = await queryOne(
      `
        SELECT id
        FROM users
        WHERE email = $1
        LIMIT 1
      `,
      [cleanEmail]
    );

    if (existingUser) {
      console.warn(
        `[AUTH] Registration rejected. Email already exists: ${cleanEmail}`
      );

      // Try to record the failed registration.
      try {
        await query(
          `
            INSERT INTO auth_logs
              (
                email,
                action,
                ip_address,
                user_agent,
                status
              )
            VALUES
              (
                $1,
                'REGISTER_FAILED',
                $2,
                $3,
                'EMAIL_EXISTS'
              )
          `,
          [
            cleanEmail,
            clientIp,
            userAgent,
          ]
        );
      } catch (logError) {
        console.error(
          '[AUTH] Failed to write duplicate-email auth log:',
          logError.message
        );
      }

      return response(409, {
        success: false,
        error:
          'An account with this email already exists. Please sign in.',
      });
    }

    // --------------------------------------------------------
    // Hash password
    // --------------------------------------------------------

    console.log('[AUTH] Hashing password...');

    const passwordHash = await bcrypt.hash(
      cleanPassword,
      12
    );

    // --------------------------------------------------------
    // INSERT USER INTO POSTGRESQL
    // --------------------------------------------------------

    console.log(
      `[AUTH] Creating PostgreSQL user: ${trimmedName} <${cleanEmail}>`
    );

    const result = await queryOne(
      `
        INSERT INTO users
          (
            name,
            email,
            password_hash,
            role,
            created_at,
            last_login_at
          )
        VALUES
          (
            $1,
            $2,
            $3,
            'student',
            NOW(),
            NULL
          )
        RETURNING
          id,
          name,
          email,
          role,
          created_at
      `,
      [
        trimmedName,
        cleanEmail,
        passwordHash,
      ]
    );

    // --------------------------------------------------------
    // Make sure INSERT actually returned a user
    // --------------------------------------------------------

    if (!result) {
      throw new Error(
        'User INSERT completed but no user was returned.'
      );
    }

    const userId = Number(result.id);

    console.log(
      `[AUTH] User successfully inserted into PostgreSQL. ID: ${userId}`
    );

    // --------------------------------------------------------
    // Create successful authentication log
    // --------------------------------------------------------

    try {
      await query(
        `
          INSERT INTO auth_logs
            (
              user_id,
              email,
              action,
              ip_address,
              user_agent,
              status
            )
          VALUES
            (
              $1,
              $2,
              'REGISTER',
              $3,
              $4,
              'SUCCESS'
            )
        `,
        [
          userId,
          cleanEmail,
          clientIp,
          userAgent,
        ]
      );
    } catch (logError) {
      // Registration itself succeeded.
      // Don't turn a successful registration into a failure
      // just because logging failed.
      console.error(
        '[AUTH] User created, but auth log failed:',
        logError.message
      );
    }

    // --------------------------------------------------------
    // Return success
    // --------------------------------------------------------

    return response(201, {
      success: true,

      user: {
        id: userId,
        fullName: result.name,
        email: result.email,
        role: result.role,
        createdAt: result.created_at,
      },

      message:
        'Account successfully registered and stored in PostgreSQL.',
    });

  } catch (error) {

    // --------------------------------------------------------
    // PostgreSQL duplicate-key protection
    // --------------------------------------------------------

    if (error && error.code === '23505') {
      console.warn(
        `[AUTH] PostgreSQL rejected duplicate email: ${cleanEmail}`
      );

      return response(409, {
        success: false,
        error:
          'An account with this email already exists. Please sign in.',
      });
    }

    // --------------------------------------------------------
    // Database error
    // --------------------------------------------------------

    console.error(
      '[AUTH] Registration database error:',
      error
    );

    return response(500, {
      success: false,
      error:
        'Registration failed. Please try again.',
    });
  }
};