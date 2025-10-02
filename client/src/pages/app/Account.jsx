import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/shop/NavBar";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Account = () => {
  const { user, setUser, logout } = useAuth();
  const { cart } = useCart();
  const [activeTab, setActiveTab] = useState("overview");
  const fileInputRef = useRef(null);
  const navigate = useNavigate()

  const [orders, setOrders] = useState([]);
  useEffect(() => {
      const fetchOrders = async () => {
        try {
          const res = await axios.get("http://localhost:3000/api/user/orders", {
            withCredentials: true,
          });
          setOrders(res.data);
        } catch (err) {
          console.error("Error fetching orders", err);
        }
      };
      fetchOrders();
    }, []);

  const handleUpload = async (selectedFile) => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("picture", selectedFile);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/upload",
        formData,
        { withCredentials: true }
      );
      setUser({ ...user, picture: res.data.picture });
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    handleUpload(selectedFile);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-1 md:p-6">
        {/* Profile Section */}
        <div className="max-w-5xl mx-auto bg-white shadow rounded-lg overflow-hidden">
          <div className="flex items-center p-6 border-b">
            <div className="relative w-32 h-32">
              {/* Profile Picture */}
              <img
                src={user?.picture || "https://via.placeholder.com/150"}
                alt="profile"
                className="w-32 h-32 rounded-full border-2 border-blue-500 object-cover"
              />

              {/* Pencil Icon Overlay */}
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-2 right-2 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 shadow"
              >
                <FaPencilAlt size={14} />
              </button>

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{user?.username}</h2>
              <p className="text-gray-500">{user?.email}</p>
              <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-50 border-r p-0 pt-2 md:p-3">
              <ul className="space-y-2">
                {["overview", "orders", "address", "cart"].map((tab) => (
                  <li key={tab}>
                    <button
                      onClick={() => setActiveTab(tab)}
                      className={`w-full text-left px-2 py-2 rounded-lg ${
                        activeTab === tab
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-100"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={logout}
                    className="w-full text-left px-2 py-2 rounded-lg hover:bg-red-100 text-red-600"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>

            {/* Content Area */}
            <div className="w-3/4 p-6">
              {activeTab === "overview" && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Welcome back!</h3>
                  <p className="text-gray-600">
                    Here you can manage your orders, addresses, and more.
                  </p>
                </div>
              )}

              {activeTab === "orders" && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">My Orders</h3>
                  {orders && orders.length > 0 ? (
                    <>
                      <ul className="space-y-2">
                        {orders.slice(0, 2).map((order) => (
                          <li
                            key={order._id}
                            className="p-4 border rounded-lg shadow-sm bg-gray-50"
                          >
                            <p>
                              <strong>Order ID:</strong> {order._id}
                            </p>
                            <p>
                              <strong>Status:</strong> {order.status}
                            </p>
                            <p>
                              <strong>Total:</strong> ₹{order.totalAmount}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => navigate('/orders')}
                        className="mt-4 text-blue-500 hover:underline"
                      >
                        View All Orders
                      </button>
                    </>
                  ) : (
                    <p className="text-gray-600">No orders yet.</p>
                  )}
                </div>
              )}

              {activeTab === "address" && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">My Address</h3>
                  {user?.address ? (
                    <div className="p-4 border rounded-lg bg-gray-50">
                      <p>{user.address.street}</p>
                      <p>
                        {user.address.city}, {user.address.state} -{" "}
                        {user.address.pincode}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-600">No address saved.</p>
                  )}
                </div>
              )}

              {activeTab === "cart" && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">My Cart</h3>
                  {cart && cart.length > 0 ? (
                    <>
                    <ul className="space-y-2">
                      {cart.slice(0, 3).map((item, idx) => (
                        <li
                          key={idx}
                          className="p-4 border rounded-lg flex justify-between items-center bg-gray-50"
                        >
                          <span>{item.productId.name}</span>
                          <span>₹{item.productId.price}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => navigate('/cart')}
                      className="mt-2 text-blue-500 hover:underline"
                    >
                      View Full Cart
                    </button>
                    </>
                  ) : (
                    <div>
                      <p className="text-gray-600">Your cart is empty.</p>
                      <button 
                      onClick={() => navigate('/shop')}
                      className="text-xl mt-6 text-blue-500 hover:text-blue-700 hover:underline">Shop Now.</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
