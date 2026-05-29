import { ShoppingCart } from 'lucide-react'
import type { Book } from '../types/book'
import { useCart } from '../context/CartContext'
import { toast } from 'sonner'

interface Props {
  book: Book
}

export default function BookCard({ book }: Props) {
  const { addToCart } = useCart()

  function handleAdd() {
    addToCart(book)
    toast.success(`"${book.title}" added to cart`)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <img
        src={book.image_url}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
            {book.title}
          </h3>
          <p className="text-gray-500 text-xs mt-1">{book.author}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-blue-600">${book.price.toFixed(2)}</span>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1 bg-blue-600 text-white text-xs font-medium px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart size={14} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
