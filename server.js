// server.js — Local Development Server for YUKTARA
// Uses PostgreSQL (via the same Netlify Functions) for local dev.
// For production: deploy to Netlify — Functions handle all /api/* routes.
//
// This file serves static files locally and proxies /api/* to the same
// Netlify Function handlers, so local and production use identical code.

'use strict';

const http = require('node:http');
const fs   = require('node:fs');
const path = require('node:path');

// Load .env file for local development
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx < 0) continue;
      const key = trimmed.substring(0, eqIdx).trim();
      const val = trimmed.substring(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      if (key && !process.env[key]) process.env[key] = val;
    }
    console.log('[ENV] Loaded .env file for local development.');
  }
} catch (e) {
  console.warn('[ENV] Could not load .env:', e.message);
}

if (!process.env.DATABASE_URL) {
  console.error('');
  console.error('╔══════════════════════════════════════════════════════════╗');
  console.error('║  FATAL: DATABASE_URL is not set.                         ║');
  console.error('║  Create a .env file with your PostgreSQL connection URL: ║');
  console.error('║  DATABASE_URL=postgresql://user:pass@host:5432/dbname    ║');
  console.error('╚══════════════════════════════════════════════════════════╝');
  console.error('');
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

// Initialize PostgreSQL schema on startup
const { initializeSchema } = require('./netlify/functions/db/database');
initializeSchema()
  .then(() => console.log('[DB] PostgreSQL schema ready.'))
  .catch(err => {
    console.error('[DB] Schema initialization failed:', err.message);
    process.exit(1);
  });

// Import Netlify Function handlers for local use
const handlers = {
  '/api/health':               require('./netlify/functions/health').handler,
  '/api/auth/register':        require('./netlify/functions/auth-register').handler,
  '/api/auth/login':           require('./netlify/functions/auth-login').handler,
  '/api/auth/logout':          require('./netlify/functions/auth-logout').handler,
  '/api/client-context':       require('./netlify/functions/client-context').handler,
  '/api/quiz/attempt':         require('./netlify/functions/quiz-attempt').handler,
  '/api/quiz/attempts':        require('./netlify/functions/quiz-attempt').handler,
  '/api/study/session':        require('./netlify/functions/study-session').handler,
  '/api/admin/data':           require('./netlify/functions/admin-data').handler,
  '/api/admin/query':          require('./netlify/functions/admin-query').handler,
  '/api/admin/export':         require('./netlify/functions/admin-export').handler,
  '/api/admin/user-detail':    require('./netlify/functions/admin-user-detail').handler,
  '/api/init-db':              require('./netlify/functions/init-db').handler,
};

// MIME types for static file serving
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
};

// Parse request body into string
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; if (body.length > 5e6) reject(new Error('Body too large')); });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

// Convert Node.js IncomingMessage into a Netlify Function event object
async function toNetlifyEvent(req, body) {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const queryStringParameters = {};
  url.searchParams.forEach((v, k) => { queryStringParameters[k] = v; });
  return {
    httpMethod:  req.method,
    path:        url.pathname,
    headers:     req.headers,
    queryStringParameters,
    body:        body || null,
    isBase64Encoded: false,
  };
}

// Convert Netlify Function response into Node.js ServerResponse
function sendNetlifyResponse(res, netlifyRes) {
  res.writeHead(netlifyRes.statusCode || 200, netlifyRes.headers || {});
  res.end(netlifyRes.body || '');
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Email',
    });
    return res.end();
  }

  // Route /api/* to matching Netlify Function handler
  const handler = handlers[pathname];
  if (handler) {
    try {
      const body = await readBody(req);
      const event = await toNetlifyEvent(req, body);
      const result = await handler(event, {});
      return sendNetlifyResponse(res, result);
    } catch (err) {
      console.error(`[SERVER] Handler error for ${pathname}:`, err.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: 'Internal server error.' }));
    }
  }

  // Serve static files
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403); return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      if (!path.extname(pathname)) {
        filePath = path.join(__dirname, 'index.html');
      } else {
        res.writeHead(404); return res.end('404 Not Found');
      }
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    fs.readFile(filePath, (readErr, content) => {
      if (readErr) { res.writeHead(500); return res.end('500 Internal Server Error'); }
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('=======================================================');
  console.log('🚀 YUKTARA Local Dev Server Running!');
  console.log(`🌐 Local URL:  http://localhost:${PORT}`);
  console.log('💾 Database:   PostgreSQL (DATABASE_URL)');
  console.log(`📊 Health:     http://localhost:${PORT}/api/health`);
  console.log('=======================================================');
  console.log('');
});
