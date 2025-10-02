import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/shop/NavBar";

export default function OrdersPage() {
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


  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
    <Navbar />
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-xl bg-gradient-to-r from-white to-gray-50 shadow-lg p-6 hover:scale-[1.01] transition-transform"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div className="space-y-1">
                  <p className="text-gray-700">
                    <span className="font-semibold">Order ID:</span> {order._id}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(order.date).toLocaleString()}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status || "Processing"}
                  </span>
                  <p className="text-xl font-bold text-orange-500">
                    ₹{order.totalAmount}
                  </p>
                </div>
              </div>

              {/* Products List */}
              <div className="overflow-x-auto">
                <div className="flex space-x-6">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="min-w-[200px] flex-shrink-0 border rounded-lg p-3 bg-white shadow hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={item.product.image || "https://via.placeholder.com/150"}
                        alt={item.name}
                        className="mx-auto h-28 object-cover rounded mb-3"
                      />
                      <h4 className="text-gray-800 font-medium truncate">{item.product.name}</h4>
                      <p className="text-gray-600 mt-1">Price: ₹{item.product.price}</p>
                      {item.product.discount && (
                        <p className="text-red-500 text-sm mt-1">Discount: ₹{item.product.discount}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Footer */}
              <div className="mt-4 text-right">
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
