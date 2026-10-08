// netlify/functions/quiz-attempt.js
// POST /api/quiz/attempt  — store a quiz attempt in PostgreSQL
// GET  /api/quiz/attempts — fetch attempts (optional ?email= filter)

'use strict';

const { queryOne, queryAll, query, initializeSchema } = require('./db/database');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

let schemaReady = false;
async function ensureSchema() {
  if (!schemaReady) { await initializeSchema(); schemaReady = true; }
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  try { await ensureSchema(); } catch (e) {
    return { statusCode: 503, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Database not ready.' }) };
  }

  // GET /api/quiz/attempts
  if (event.httpMethod === 'GET') {
    try {
      const email = event.queryStringParameters?.email;
      let attempts;
      if (email) {
        attempts = await queryAll(
          'SELECT * FROM quiz_attempts WHERE user_email = $1 ORDER BY submitted_at DESC LIMIT 100',
          [email.trim().toLowerCase()]
        );
      } else {
        attempts = await queryAll(
          'SELECT * FROM quiz_attempts ORDER BY submitted_at DESC LIMIT 100',
          []
        );
      }
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: true, attempts }),
      };
    } catch (err) {
      console.error('[QUIZ] Fetch attempts error:', err.message);
      return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Failed to fetch quiz attempts.' }) };
    }
  }

  // POST /api/quiz/attempt
  if (event.httpMethod === 'POST') {
    let data;
    try { data = JSON.parse(event.body || '{}'); } catch { data = {}; }

    const {
      userEmail, userName, subject, topicId, topicName,
      questionCount, score, percentage, mode, timeSpentSeconds, answers,
    } = data;

    const cleanEmail = (userEmail || 'anonymous').trim().toLowerCase();

    try {
      // Look up user_id from email
      const userRow = await queryOne('SELECT id FROM users WHERE email = $1', [cleanEmail]);
      const userId = userRow ? Number(userRow.id) : null;

      const result = await queryOne(
        `INSERT INTO quiz_attempts
          (user_id, user_email, user_name, subject, topic_id, topic_name,
           question_count, score, percentage, mode, time_spent_seconds, answers_json, submitted_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
         RETURNING id`,
        [
          userId,
          cleanEmail,
          userName || 'Student',
          subject || 'General Engineering',
          topicId || 'general',
          topicName || 'Module Quiz',
          Number(questionCount) || 10,
          Number(score) || 0,
          Number(percentage) || 0,
          mode || 'practice',
          Number(timeSpentSeconds) || 0,
          JSON.stringify(answers || {}),
        ]
      );

      return {
        statusCode: 201,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: true,
          attemptId: Number(result.id),
          message: 'Quiz attempt saved to PostgreSQL.',
        }),
      };
    } catch (err) {
      console.error('[QUIZ] Save attempt error:', err.message);
      return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Failed to save quiz attempt.' }) };
    }
  }

  return { statusCode: 405, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Method not allowed.' }) };
};
