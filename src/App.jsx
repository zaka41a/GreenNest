import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import AdminOrders from './pages/AdminOrders'
import Checkout from './pages/Checkout'
import MyOrders from './pages/MyOrders'
import OrderDetails from './pages/OrderDetails'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  const location = useLocation()

  // Cacher le header sur les pages d'authentification
  const hideHeader = ['/login', '/register'].includes(location.pathname)

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path="/my-orders" element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        } />
        <Route path="/orders/:id" element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin={true}>
            <Admin />
          </ProtectedRoute>
        } />
        <Route path="/admin/orders" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminOrders />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}
