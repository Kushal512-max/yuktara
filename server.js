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
  console.warn('');
  console.warn('⚠️  NOTICE: DATABASE_URL is not set in environment.');
  console.warn('   sArathI will run using resilient local data storage.');
  console.warn('   To sync to cloud PostgreSQL, provide DATABASE_URL in .env');
  console.warn('');
}

const PORT = process.env.PORT || 3000;

// Initialize database schema on startup
const { initializeSchema } = require('./netlify/functions/db/database');
initializeSchema()
  .then(() => console.log('[DB] sArathI database ready.'))
  .catch(err => {
    console.warn('[DB] Schema initialization warning (continuing with resilient fallback):', err.message);
  });

const HANDLER_MAP = {
  '/api/health':               './netlify/functions/health',
  '/api/auth/register':        './netlify/functions/auth-register',
  '/api/auth/login':           './netlify/functions/auth-login',
  '/api/auth/logout':          './netlify/functions/auth-logout',
  '/api/client-context':       './netlify/functions/client-context',
  '/api/quiz/attempt':         './netlify/functions/quiz-attempt',
  '/api/quiz/attempts':        './netlify/functions/quiz-attempt',
  '/api/study/session':        './netlify/functions/study-session',
  '/api/admin/data':           './netlify/functions/admin-data',
  '/api/admin/query':          './netlify/functions/admin-query',
  '/api/admin/export':         './netlify/functions/admin-export',
  '/api/admin/user-detail':    './netlify/functions/admin-user-detail',
  '/api/init-db':              './netlify/functions/init-db',
  '/api/ai/chat':              './netlify/functions/ai-chat',
};

function getHandler(pathname) {
  const modPath = HANDLER_MAP[pathname];
  if (!modPath) return null;
  try {
    const resolved = require.resolve(modPath);
    delete require.cache[resolved];
    return require(modPath).handler;
  } catch (err) {
    console.error(`[SERVER] Error loading handler for ${pathname}:`, err);
    return null;
  }
}

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
  const handler = getHandler(pathname);
  if (handler) {
    try {
      const body = await readBody(req);
      const event = await toNetlifyEvent(req, body);
      const result = await handler(event, {});
      return sendNetlifyResponse(res, result);
    } catch (err) {
      console.error(`[SERVER] Handler error for ${pathname}:`, err.stack || err.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: err.message || 'Internal server error.' }));
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
  console.log('🚀 sArathI Local Dev Server Running!');
  console.log(`🌐 Local URL:  http://localhost:${PORT}`);
  console.log('💾 Database:   PostgreSQL / Resilient Store');
  console.log(`🤖 AI Engine:  sArathI Live LLM & Document Q&A Active`);
  console.log(`📊 Health:     http://localhost:${PORT}/api/health`);
  console.log('=======================================================');
  console.log('');
});
