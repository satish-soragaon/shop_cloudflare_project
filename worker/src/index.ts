export interface Env {
  DB: D1Database
  JWT_SECRET: string
  FRONTEND_URL: string
}

// ── Tiny JWT helpers (no external library needed) ──────────────────────────

async function signToken(payload: object, secret: string): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = btoa(JSON.stringify(payload))
  const data = `${header}.${body}`
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
  return `${data}.${sigB64}`
}

async function verifyToken(token: string, secret: string): Promise<{ id: number; email: string } | null> {
  try {
    const [header, body, sig] = token.split('.')
    const data = `${header}.${body}`
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )
    const sigBytes = Uint8Array.from(atob(sig.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0))
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(data))
    if (!valid) return null
    return JSON.parse(atob(body))
  } catch {
    return null
  }
}

// ── Password hashing ────────────────────────────────────────────────────────

async function hashPassword(password: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

// ── CORS headers ────────────────────────────────────────────────────────────

function corsHeaders(env: Env): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': env.FRONTEND_URL || '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

function json(data: unknown, status = 200, env: Env): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(env) },
  })
}

function err(message: string, status: number, env: Env): Response {
  return json({ message }, status, env)
}

// ── Auth middleware ─────────────────────────────────────────────────────────

async function getUser(req: Request, env: Env): Promise<{ id: number; email: string } | null> {
  const auth = req.headers.get('Authorization') || ''
  const token = auth.replace('Bearer ', '')
  if (!token) return null
  return verifyToken(token, env.JWT_SECRET || 'secret')
}

// ── Main handler ────────────────────────────────────────────────────────────

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url)
    const path = url.pathname

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(env) })
    }

    // POST /api/register
    if (path === '/api/register' && req.method === 'POST') {
      const { email, password } = await req.json() as { email: string; password: string }
      if (!email || !password) return err('Email and password required', 400, env)

      const existing = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first()
      if (existing) return err('Email already registered', 409, env)

      const password_hash = await hashPassword(password)
      const result = await env.DB.prepare(
        'INSERT INTO users (email, password_hash) VALUES (?, ?) RETURNING id, email'
      ).bind(email, password_hash).first<{ id: number; email: string }>()

      const token = await signToken({ id: result!.id, email: result!.email }, env.JWT_SECRET || 'secret')
      return json({ token, user: { id: result!.id, email: result!.email } }, 201, env)
    }

    // POST /api/login
    if (path === '/api/login' && req.method === 'POST') {
      const { email, password } = await req.json() as { email: string; password: string }
      if (!email || !password) return err('Email and password required', 400, env)

      const user = await env.DB.prepare('SELECT id, email, password_hash FROM users WHERE email = ?')
        .bind(email).first<{ id: number; email: string; password_hash: string }>()
      if (!user) return err('Invalid email or password', 401, env)

      const hash = await hashPassword(password)
      if (hash !== user.password_hash) return err('Invalid email or password', 401, env)

      const token = await signToken({ id: user.id, email: user.email }, env.JWT_SECRET || 'secret')
      return json({ token, user: { id: user.id, email: user.email } }, 200, env)
    }

    // GET /api/books
    if (path === '/api/books' && req.method === 'GET') {
      const user = await getUser(req, env)
      if (!user) return err('Unauthorized', 401, env)

      const { results } = await env.DB.prepare('SELECT * FROM books ORDER BY id').all()
      return json(results, 200, env)
    }

    // POST /api/orders
    if (path === '/api/orders' && req.method === 'POST') {
      const user = await getUser(req, env)
      if (!user) return err('Unauthorized', 401, env)

      const { customer_name, address, phone, items, total_amount } =
        await req.json() as {
          customer_name: string
          address: string
          phone: string
          total_amount: number
          items: { book_id: number; quantity: number }[]
        }

      if (!customer_name || !address || !phone || !items?.length) {
        return err('Missing required fields', 400, env)
      }

      const order = await env.DB.prepare(
        'INSERT INTO orders (user_id, customer_name, address, phone, total_amount) VALUES (?, ?, ?, ?, ?) RETURNING id'
      ).bind(user.id, customer_name, address, phone, total_amount).first<{ id: number }>()

      const stmts = items.map((item) =>
        env.DB.prepare('INSERT INTO order_items (order_id, book_id, quantity) VALUES (?, ?, ?)')
          .bind(order!.id, item.book_id, item.quantity)
      )
      await env.DB.batch(stmts)

      return json({ message: 'Order placed successfully', order_id: order!.id }, 201, env)
    }

    return err('Not found', 404, env)
  },
}
