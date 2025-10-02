import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import Shop from '../pages/app/Shop'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute'
import CreateProduct from '../pages/admin/CreateProduct'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Account from '../pages/app/Account'
import Cart from '../pages/app/Cart'
import Orders from '../pages/admin/Orders'
import UserAnalytics from '../pages/admin/UserAnalytics'
import PaymentPage from '../pages/app/PaymentPage'
import OrdersPage from '../pages/app/OrdersPage'
import { Toaster } from 'sonner'

const AppRoute = () => {
  return (
    <>
    <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/user/register" element={<Register />} />
        <Route path='/user/login' element={<Login />} />
        <Route 
          path='/shop' 
          element={
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
          } />
        <Route path='/account' element={<Account />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<PaymentPage />} />
        <Route path='/orders' element={<OrdersPage />} />
        
        <Route 
          path='/admin-dashboard' 
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
        <Route 
          path='/create'
          element={
            <CreateProduct />
          }
        />
        <Route path='/admin/orders' element={<Orders />} />
        <Route path='/user-analytics' element={<UserAnalytics />} />
      </Routes>
    </>
  )
}

export default AppRoute
