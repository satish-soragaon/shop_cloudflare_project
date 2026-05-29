import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function ProtectedLayout() {
  const { token } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

function AppRoutes() {
  const { token } = useAuth()
  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
          <Toaster richColors position="top-right" closeButton />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
