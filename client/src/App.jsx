import React from 'react'
import AppRoute from './routes/AppRoute'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ProductsProvider } from './context/ProductsContext'

const App = () => {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <AppRoute />
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  )
}

export default App