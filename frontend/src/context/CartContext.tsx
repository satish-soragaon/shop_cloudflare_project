import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Book } from '../types/book'
import type { CartItem } from '../types/order'

interface CartContextType {
  items: CartItem[]
  addToCart: (book: Book) => void
  removeFromCart: (bookId: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  function addToCart(book: Book) {
    setItems((prev) => {
      const existing = prev.find((i) => i.book.id === book.id)
      if (existing) {
        return prev.map((i) =>
          i.book.id === book.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { book, quantity: 1 }]
    })
  }

  function removeFromCart(bookId: number) {
    setItems((prev) => prev.filter((i) => i.book.id !== bookId))
  }

  function clearCart() {
    setItems([])
  }

  const total = items.reduce((sum, i) => sum + i.book.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
