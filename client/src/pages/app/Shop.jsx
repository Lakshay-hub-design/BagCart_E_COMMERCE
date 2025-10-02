import React from 'react'

import Navbar from '../../components/shop/NavBar'
import ShopContent from '../../components/shop/ShopPage'
import Footer from '../../components/shop/Footer'
import Slider from '../../components/shop/Slider'
import { ProductsProvider } from '../../context/ProductsContext'

const Shop = () => {
  return (
    <div>
        <Navbar />
        <Slider />
        <ShopContent />
        <Footer />
    </div>
  )
}

export default Shop