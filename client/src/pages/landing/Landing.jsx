import React from 'react'
import {Link} from "react-router-dom"
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavBar from '../../components/landing/NavBar'
import Hero from '../../components/landing/Hero'
import WhyChoseUs from '../../components/landing/WhyChoseUs'
import Footer from '../../components/landing/Footer'
import ProductCrousel from '../../components/landing/ProductCrousel'

export const Landing = () => {

  return (
    <div className='bg-blue-300 text-white scroll-smooth'>
      <NavBar />
      <main className='container mx-auto px-4 sm:px-8 bg-gradient-to-r from-[#0F172A] to-[#1E293B]'>
        <Hero />
      </main>
      <WhyChoseUs />
      <ProductCrousel />
      <Footer />
    </div>
  )
}
