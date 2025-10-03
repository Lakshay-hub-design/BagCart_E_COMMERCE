import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import Shop from '../pages/app/Shop'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute'
import CreateProduct from '../pages/admin/CreateProduct'
import "react-toastify/dist/ReactToastify.css";
import Account from '../pages/app/Account'
import Cart from '../pages/app/Cart'
import Orders from '../pages/admin/Orders'
import UserAnalytics from '../pages/admin/UserAnalytics'
import PaymentPage from '../pages/app/PaymentPage'
import OrdersPage from '../pages/app/OrdersPage'
import { Toaster } from 'sonner'
import { Landing } from '../pages/landing/Landing'
import { ProductsProvider } from '../context/ProductsContext'
import { CartProvider } from '../context/CartContext'

const AppRoute = () => {
  return (
    <>
    <Toaster position="top-right" richColors />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/user/register" element={<Register />} />
        <Route path='/user/login' element={<Login />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <ProductsProvider>
                <CartProvider>
                  <Routes>
                    {/* User Routes */}
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<PaymentPage />} />
                    <Route path="/orders" element={<OrdersPage />} />

                    {/* Admin Routes */}
                    <Route
                      path="/admin-dashboard"
                      element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
                    />
                    <Route
                      path="/create"
                      element={<ProtectedRoute role="admin"><CreateProduct /></ProtectedRoute>}
                    />
                    <Route
                      path="/admin/orders"
                      element={<ProtectedRoute role="admin"><Orders /></ProtectedRoute>}
                    />
                    <Route
                      path="/user-analytics"
                      element={<ProtectedRoute role="admin"><UserAnalytics /></ProtectedRoute>}
                    />
                  </Routes>
                </CartProvider>
              </ProductsProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default AppRoute
