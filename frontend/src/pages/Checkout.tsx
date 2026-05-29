import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '../services/api'
import { useCart } from '../context/CartContext'

interface FormData {
  customer_name: string
  address: string
  phone: string
}

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  async function onSubmit(data: FormData) {
    setLoading(true)
    try {
      await api.placeOrder({
        ...data,
        total_amount: total,
        items: items.map((i) => ({ book_id: i.book.id, quantity: i.quantity })),
      })
      clearCart()
      setSuccess(true)
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <CheckCircle size={56} className="text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
        <p className="text-gray-500 mb-6">Thank you for your purchase. Your order is confirmed.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <h2 className="font-semibold text-gray-900 text-lg">Delivery Details</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              {...register('customer_name', { required: 'Full name is required' })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
            {errors.customer_name && <p className="text-red-500 text-xs mt-1">{errors.customer_name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              {...register('address', { required: 'Address is required' })}
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="123 Main St, City, Country"
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              {...register('phone', { required: 'Phone number is required' })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1 234 567 8900"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || items.length === 0}
            className="mt-2 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>

        {/* Order Summary */}
        <div>
          <h2 className="font-semibold text-gray-900 text-lg mb-4">Order Summary</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
            {items.map(({ book, quantity }) => (
              <div key={book.id} className="flex justify-between text-sm">
                <span className="text-gray-700">{book.title} × {quantity}</span>
                <span className="font-medium">${(book.price * quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-blue-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
