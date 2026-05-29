import type { Book } from './book'

export interface CartItem {
  book: Book
  quantity: number
}

export interface OrderPayload {
  customer_name: string
  address: string
  phone: string
  items: { book_id: number; quantity: number }[]
  total_amount: number
}
