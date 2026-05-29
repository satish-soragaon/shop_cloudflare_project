import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, BookOpen, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { logout } = useAuth()
  const { items } = useCart()
  const navigate = useNavigate()

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="h-16 bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-lg">
          <BookOpen size={24} />
          BookStore
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/catalog" className="text-gray-700 hover:text-blue-600 font-medium text-sm">
            Catalog
          </Link>

          <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-gray-500 hover:text-red-500 text-sm font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
