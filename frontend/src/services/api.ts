import type { AuthResponse } from '../types/user'
import type { Book } from '../types/book'
import type { OrderPayload } from '../types/order'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

function getToken(): string | null {
  return localStorage.getItem('token')
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { ...headers, ...(options?.headers as Record<string, string>) },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(err.message || 'Request failed')
  }
  return res.json()
}

export const api = {
  register: (email: string, password: string): Promise<AuthResponse> =>
    request('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  login: (email: string, password: string): Promise<AuthResponse> =>
    request('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getBooks: (): Promise<Book[]> => request('/api/books'),

  placeOrder: (payload: OrderPayload): Promise<{ message: string; order_id: number }> =>
    request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}
