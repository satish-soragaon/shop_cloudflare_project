import { useNavigate } from 'react-router-dom'
import { Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, removeFromCart, total } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
        <button
          onClick={() => navigate('/catalog')}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Browse Books
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>

      <div className="flex flex-col gap-4">
        {items.map(({ book, quantity }) => (
          <div key={book.id} className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4">
            <img src={book.image_url} alt={book.title} className="w-16 h-20 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">{book.title}</h3>
              <p className="text-gray-500 text-xs">{book.author}</p>
              <p className="text-blue-600 font-bold mt-1">${book.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Qty: {quantity}</span>
              <button
                onClick={() => removeFromCart(book.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
        <span className="font-semibold text-gray-900">Total</span>
        <span className="text-xl font-bold text-blue-600">${total.toFixed(2)}</span>
      </div>

      <button
        onClick={() => navigate('/checkout')}
        className="w-full mt-4 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Proceed to Checkout
      </button>
    </div>
  )
}
