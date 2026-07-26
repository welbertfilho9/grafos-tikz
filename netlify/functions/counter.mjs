// counter.mjs — zero imports, zero dependências
// Chama counterapi.dev SERVER-SIDE (sem CORS) e repassa pro browser

const CORS = {
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control'               : 'no-store',
  'Content-Type'                : 'application/json',
};

const API_GET = 'https://api.counterapi.dev/v1/grafoslatex/grafos/';
const API_HIT = 'https://api.counterapi.dev/v1/grafoslatex/grafos/up';

export default async function handler(req) {
  if (req.method === 'OPTIONS')
    return new Response(null, { status: 204, headers: CORS });

  try {
    if (req.method === 'GET') {
      const r = await fetch(API_GET);
      const d = await r.json();
      const count = d.count ?? d.value ?? 0;
      return new Response(JSON.stringify({ count }), { status: 200, headers: CORS });
    }

    if (req.method === 'POST') {
      const r = await fetch(API_HIT);
      const d = await r.json();
      const count = d.count ?? d.value ?? 0;
      return new Response(JSON.stringify({ count }), { status: 200, headers: CORS });
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: CORS });
  }

  return new Response('Method not allowed', { status: 405, headers: CORS });
}

export const config = { path: '/api/counter' };
