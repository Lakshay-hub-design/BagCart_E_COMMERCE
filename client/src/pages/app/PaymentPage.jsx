import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaMoneyBillWave, FaQrcode } from "react-icons/fa";
import { toast } from "sonner";
import Navbar from "../../components/shop/NavBar";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function PaymentPage() {
  const [method, setMethod] = useState("upi");
  const {cart, setCart} = useCart()
  const { user } = useAuth()
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const paymentStatus = method === "cod" ? "Pending" : "Paid";

      const orderData = {
      items: cart.map((item) => ({
        product: item.productId._id,
        quantity: item.quantity,
      })),
      totalAmount: cart?.reduce(
        (acc, item) => acc + item.productId.price * item.quantity,
        0
      ),
      address: user.address,
      paymentMethod: method,
      paymentStatus 
    };
    const res = await axios.post(
      "http://localhost:3000/api/user/order",
      orderData,
      { withCredentials: true }
    );
      setCart([])
      toast("Payment succesfull order placed")
      navigate("/orders");
    } catch (err) {
      console.error("Payment failed", err);
      toast.error("Something went wrong")
    }
  };

  const paymentOptions = [
    {
      value: "upi",
      label: "UPI (PhonePe / Google Pay)",
      icon: <FaQrcode className="text-blue-500 w-6 h-6" />,
    },
    {
      value: "card",
      label: "Credit / Debit Card",
      icon: <FaCreditCard className="text-purple-500 w-6 h-6" />,
    },
    {
      value: "cod",
      label: "Cash on Delivery",
      icon: <FaMoneyBillWave className="text-green-500 w-6 h-6" />,
    },
  ];

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Checkout Payment</h2>

        <div className="space-y-4">
          {paymentOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-shadow hover:shadow-lg ${
                method === option.value ? "border-green-500 bg-green-50" : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={option.value}
                checked={method === option.value}
                onChange={(e) => setMethod(e.target.value)}
                className="accent-green-500 w-5 h-5"
              />
              {option.icon}
              <span className="text-gray-800 font-medium">{option.label}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handlePayment}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-green-700 transition-colors"
        >
          Pay Now
        </button>

        <p className="text-center text-gray-500 mt-4 text-sm">
          Secure payment with SSL encryption 🔒
        </p>
      </div>
    </div>
    </>
  );
}
