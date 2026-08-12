// counter.mjs — zero dependências externas
// Chama counterapi.dev do lado do servidor (sem CORS)
const CORS = {
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control'               : 'no-store',
  'Content-Type'                : 'application/json',
};
export default async function handler(req) {
  if (req.method === 'OPTIONS')
    return new Response(null, { status: 204, headers: CORS });
  try {
    if (req.method === 'GET') {
      const r = await fetch('https://api.counterapi.dev/v1/grafoslatex/grafos/');
      const d = await r.json();
      return new Response(JSON.stringify({ count: d.count??d.value??0 }), { status:200, headers:CORS });
    }
    if (req.method === 'POST') {
      const r = await fetch('https://api.counterapi.dev/v1/grafoslatex/grafos/up');
      const d = await r.json();
      return new Response(JSON.stringify({ count: d.count??d.value??0 }), { status:200, headers:CORS });
    }
  } catch(e) {
    return new Response(JSON.stringify({error:e.message}), { status:500, headers:CORS });
  }
  return new Response('Method not allowed', { status:405, headers:CORS });
}
export const config = { path: '/api/counter' };
