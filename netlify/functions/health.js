// netlify/functions/health.js
// GET /api/health — backend and database health check

'use strict';

const { queryOne, classifyDbError } = require('./db/database');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: '',
    };
  }

  const rawUrl = (process.env.DATABASE_URL || '').trim();
  const isConfigured = Boolean(rawUrl);

  if (!isConfigured) {
    return {
      statusCode: 503,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        status: 'error',
        service: 'YUKTARA Backend (Netlify Functions)',
        database: 'PostgreSQL',
        databaseConfigured: false,
        error: 'DATABASE_URL environment variable is not configured.',
        timestamp: new Date().toISOString(),
      }),
    };
  }

  try {
    await queryOne('SELECT 1 AS ok', []);
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        status: 'ok',
        service: 'YUKTARA Backend (Netlify Functions)',
        database: 'PostgreSQL',
        databaseConfigured: true,
        connection: 'Connected successfully',
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (err) {
    console.error('[HEALTH] Database health check failed:', err.message, err.code);
    const safeError = classifyDbError(err);
    return {
      statusCode: 503,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        status: 'error',
        service: 'YUKTARA Backend (Netlify Functions)',
        database: 'PostgreSQL',
        databaseConfigured: true,
        error: safeError,
        timestamp: new Date().toISOString(),
      }),
    };
  }
};
