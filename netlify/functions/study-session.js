// netlify/functions/study-session.js
// POST /api/study/session — store a study session in PostgreSQL

'use strict';

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
      return { statusCode: 503, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Database not ready.' }) };
    }
  }

  let data;
  try { data = JSON.parse(event.body || '{}'); } catch { data = {}; }

  const { userEmail, subject, topicId, subtopic, durationMinutes, status } = data;
  const cleanEmail = (userEmail || 'anonymous').trim().toLowerCase();

  try {
    const userRow = await queryOne('SELECT id FROM users WHERE email = $1', [cleanEmail]);
    const userId = userRow ? Number(userRow.id) : null;

    const result = await queryOne(
      `INSERT INTO study_sessions
        (user_id, user_email, subject, topic_id, subtopic, duration_minutes, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       RETURNING id`,
      [
        userId,
        cleanEmail,
        subject || 'General Engineering',
        topicId || 'general',
        subtopic || 'General Topic',
        Number(durationMinutes) || 30,
        status || 'COMPLETED',
      ]
    );

    return {
      statusCode: 201,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        sessionId: Number(result.id),
        message: 'Study session logged to PostgreSQL.',
      }),
    };
  } catch (err) {
    console.error('[STUDY] Session log error:', err.message);
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Failed to log study session.' }) };
  }
};
