// netlify/functions/init-db.js
// Run once to initialize the PostgreSQL schema.
// GET /.netlify/functions/init-db  (admin only via secret token)

'use strict';

const { initializeSchema } = require('./db/database');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Email, X-Init-Token',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  // Protect with a token to prevent unauthorized schema init calls
  const providedToken = event.headers['x-init-token'] || event.queryStringParameters?.token || '';
  const expectedToken = process.env.INIT_TOKEN || '';

  if (expectedToken && providedToken !== expectedToken) {
    return {
      statusCode: 403,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, error: 'Forbidden: invalid init token.' }),
    };
  }

  try {
    await initializeSchema();
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        message: 'PostgreSQL schema initialized successfully (CREATE TABLE IF NOT EXISTS).',
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (err) {
    console.error('[INIT-DB] Schema init error:', err.message);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, error: 'Schema initialization failed.' }),
    };
  }
};
