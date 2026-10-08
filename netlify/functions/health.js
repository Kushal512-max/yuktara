// netlify/functions/health.js
// GET /api/health — backend health check

'use strict';

const { queryOne } = require('./db/database');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  try {
    await queryOne('SELECT 1', []);
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        status: 'ok',
        service: 'YUKTARA Backend (Netlify Functions)',
        database: 'PostgreSQL',
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (err) {
    return {
      statusCode: 503,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        status: 'error',
        service: 'YUKTARA Backend (Netlify Functions)',
        database: 'PostgreSQL',
        error: 'Database connection failed.',
        timestamp: new Date().toISOString(),
      }),
    };
  }
};
