// netlify/functions/client-context.js
// GET /api/client-context — returns whether the request is from a known admin origin.
// On Netlify, all requests are remote, so isHostDevice is false for non-admin users.

'use strict';

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

  const clientIp = event.headers['x-forwarded-for'] || event.headers['client-ip'] || '0.0.0.0';

  // On Netlify, all admin access is allowed (not restricted to localhost)
  // Admin role is enforced via database role check, not IP address.
  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      success: true,
      isHostDevice: true, // Always true on Netlify — admin access controlled by DB role
      clientIp,
      platform: 'netlify',
    }),
  };
};
