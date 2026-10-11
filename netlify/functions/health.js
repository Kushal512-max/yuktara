// netlify/functions/health.js
// GET /api/health — backend and database health check

'use strict';

const { queryOne, getDbStatus, classifyDbError } = require('./db/database');

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

  const dbStatus = typeof getDbStatus === 'function' ? getDbStatus() : {};

  try {
    await queryOne('SELECT 1 AS ok', []);
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        status: 'ok',
        service: 'sArathI Backend (Netlify Functions)',
        database: dbStatus.databaseType || 'PostgreSQL',
        databaseConfigured: Boolean(dbStatus.isPostgresConfigured),
        databaseConnected: Boolean(dbStatus.isPostgresConnected),
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (err) {
    console.error('[HEALTH] Database health check notice:', err.message);
    const safeError = typeof classifyDbError === 'function' ? classifyDbError(err) : err.message;
    return {
      statusCode: 503,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        status: 'error',
        service: 'sArathI Backend (Netlify Functions)',
        error: safeError,
        timestamp: new Date().toISOString(),
      }),
    };
  }
};
