import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import NavBar from "../../components/shop/NavBar"
import { useNavigate } from "react-router-dom";


export default function CartPage() {
  const { cart, fetchCart, removeFromCart } = useCart();
  const [address, setAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const navigate = useNavigate()

  useEffect(() => {
    fetchCart();
    fetchAddress()
  }, []);

  const fetchAddress = async () =>{
    try{
      const res = await axios.get('http://localhost:3000/api/user/address',{
        withCredentials: true
      });
      if(res.data) setAddress(res.data)
    }catch (err) {
      console.error("Error fetching address", err);
    }
  }

  const handleRemove = async (id)=>{
    await removeFromCart(id)
    await fetchCart()
  }

  const updateQuantity = async (productId, newQty) => {
    try {
      await axios.post("http://localhost:3000/api/user/update", {
        productId,
        quantity: newQty,
      }, { withCredentials: true });
      fetchCart();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3000/api/user/address',
        formData,
        { withCredentials: true }
      )
      setAddress(res.data)
      setShowForm(false)
    } catch (err) {
      console.error("Error saving address", err);
    }
  };

  // Price calculation
  const subtotal = cart?.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  ) || 0;

  const discount = cart?.reduce(
    (sum, item) =>
      sum + ((item.productId.discount || 0) ),
    0
  ) || 0;

  const delivery = subtotal > 500 ? 0 : 40;
  const total = subtotal - discount + delivery;

  return (
    <>
      <NavBar />
      <div className="relative max-w-7xl mx-auto p-2 sm:p-4 grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Section - Cart Items */}
        <div className="lg:col-span-2 bg-white shadow rounded-lg p-2 sm:p-4">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
            Shopping Cart
          </h2>
          {cart?.length === 0 ? (
            <p className="text-sm sm:text-base">Your cart is empty.</p>
          ) : (
            cart.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between border-b py-3 sm:py-4 gap-3 sm:gap-0"
              >
                {/* Product Info */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="w-10 h-14 sm:w-20 sm:h-28 md:w-24 md:h-32 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-medium">
                      {item.productId.name}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      ₹{item.productId.price}
                    </p>
                    {item.productId.discount > 0 && (
                      <p className="text-green-600 text-xs sm:text-sm">
                        {item.productId.discount}₹ off
                      </p>
                    )}
                    <button
                      onClick={() => handleRemove(item.productId._id)}
                      className="text-red-500 text-xs sm:text-sm mt-2 sm:mt-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button
                    onClick={() =>
                      updateQuantity(item.productId._id, item.quantity - 1)
                    }
                    className="px-2 py-1 border rounded text-sm sm:text-base"
                  >
                    -
                  </button>
                  <span className="text-sm sm:text-base">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.productId._id, item.quantity + 1)
                    }
                    className="px-2 py-1 border rounded text-sm sm:text-base"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Section - Price & Address */}
        <div className="bg-white shadow rounded-lg p-2 sm:p-4 space-y-3 sm:space-y-4">
          <h2 className="text-base sm:text-lg font-semibold border-b pb-2">
            Price Details
          </h2>
          <div className="flex justify-between text-sm sm:text-base">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm sm:text-base">
            <span>Discount</span>
            <span className="text-green-600">-₹{discount}</span>
          </div>
          <div className="flex justify-between text-sm sm:text-base">
            <span>Delivery</span>
            <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
          </div>
          <div className="flex justify-between font-semibold text-base sm:text-lg border-t pt-2">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          {/* Address Section */}
          <div className="mt-3 sm:mt-4">
            <h2 className="text-base sm:text-lg font-semibold mb-2">
              Delivery Address
            </h2>
            {address && !showForm && (
              <div className="border rounded p-3 bg-gray-50">
                {" "}
                <p className="font-medium">{address.fullName}</p>{" "}
                <p>
                  {" "}
                  {address.street}, {address.city}, {address.state} -{" "}
                  {address.pincode}{" "}
                </p>{" "}
                <p>Phone: {address.phone}</p>{" "}
                <button
                  onClick={() => {
                    setFormData(address);
                    setShowForm(true);
                  }}
                  className="mt-2 text-blue-600 text-sm"
                >
                  {" "}
                  Change Address{" "}
                </button>{" "}
              </div>
            )}{" "}
            {!address && !showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="w-full py-2 bg-blue-600 text-white rounded"
              >
                {" "}
                Add Address{" "}
              </button>
            )}{" "}
            {showForm && (
              <div className="border rounded p-3 bg-gray-50 space-y-2">
                {" "}
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />{" "}
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />{" "}
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />{" "}
                <div className="flex gap-2">
                  {" "}
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="flex-1 w-1/2 border px-2 py-1 rounded"
                  />{" "}
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="flex-1 border w-1/2 px-2 py-1 rounded"
                  />{" "}
                </div>{" "}
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />{" "}
                <button
                  onClick={handleSaveAddress}
                  className="w-full py-2 bg-green-600 text-white rounded"
                >
                  {" "}
                  Save Address{" "}
                </button>{" "}
              </div>
            )}
          </div>

          {/* Checkout */}
          <button
            onClick={() => navigate("/checkout", { state: { total, address } })}
            className="w-full py-2 sm:py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded text-sm sm:text-base"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
