/**
 * Vercel serverless proxy — keeps REELLY_API_KEY off the client.
 * /api/reelly/* → https://api-reelly.up.railway.app/api/v2/clients/*
 */
const UPSTREAM = 'https://api-reelly.up.railway.app/api/v2/clients'

export default async function handler(request) {
  const url = new URL(request.url)
  const subpath = url.pathname.replace(/^\/api\/reelly\/?/, '')
  const target = `${UPSTREAM}/${subpath}${url.search}`

  const headers = {
    Accept: 'application/json',
    'X-API-Key': process.env.REELLY_API_KEY || '',
  }

  const init = {
    method: request.method,
    headers,
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = await request.text()
  }

  const upstream = await fetch(target, init)
  const body = await upstream.arrayBuffer()

  return new Response(body, {
    status: upstream.status,
    headers: {
      'Content-Type': upstream.headers.get('content-type') || 'application/json',
      'Cache-Control': upstream.headers.get('cache-control') || 'no-store',
    },
  })
}
