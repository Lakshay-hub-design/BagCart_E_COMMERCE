import axios from 'axios'
import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import { toast } from "sonner"

const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])

    const fetchCart = async () =>{
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart`,
                {withCredentials: true}
            )
            setCart(res.data.products || [])
        } catch (error) {
            console.error('Error fetching cart', error)
        }
    }

    const addToCart = async (productId, quantity = 1) =>{
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/cart/add`, {productId, quantity}, 
                {withCredentials: true}
            )
            setCart(res.data.products)
            toast('Product added to cart!');
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    }

    const removeFromCart = async (productId) =>{
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/cart/${productId}`, {},
                {withCredentials: true}
            )
            setCart(res.data.products)
            toast("Product removed from cart")
        } catch (error) {
             console.error("Error removing from cart:", err);
        }
    }

    useEffect(() => {
        fetchCart();
    }, []);
  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, fetchCart }}>
      {children}
    </CartContext.Provider>

  )
}

export const useCart = () => useContext(CartContext)