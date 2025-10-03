import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Sidebar from "../../components/adminDashboard/SideBar";
import { HiMenu } from "react-icons/hi";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/admin/orders`, {
        withCredentials: true,
      });
      setOrders(res.data);
      setPages(res.data.pages || 1);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter, search]);

  // Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/admin/update/${orderId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      toast.success(`Order ${res.data.order._id} updated to ${res.data.order.status}`);
      fetchOrders();
    } catch (err) {
      console.error("Error updating order:", err);
      toast.error("Failed to update order");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Navbar */}
      <div className="md:hidden w-full flex justify-between px-4 py-3 fixed top-0 left-0 z-30 items-center bg-white shadow h-12">
        <h4 className="text-blue-600 font-bold">Orders</h4>
        <button
          onClick={() => setIsOpen(true)}
          className="px-3 py-2 text-blue-600 rounded flex items-center gap-2"
        >
          <HiMenu size={20} />
        </button>
      </div>

      <div className="flex-1 pt-14 p-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="Search by user/orderId"
            className="border px-2 py-1 rounded flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border px-2 py-1 rounded"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Orders */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="border-collapse border w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-3 py-2">Order ID</th>
                    <th className="border px-3 py-2">User</th>
                    <th className="border px-3 py-2">Items</th>
                    <th className="border px-3 py-2">Total</th>
                    <th className="border px-3 py-2">Status</th>
                    <th className="border px-3 py-2">Date</th>
                    <th className="border px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o._id}>
                      <td className="border px-3 py-2">{o._id}</td>
                      <td className="border px-3 py-2">
                        {o.user?.username} <br />
                        <span className="text-sm text-gray-500">{o.user?.email}</span>
                      </td>
                      <td className="border px-3 py-2">
                        {o.items.map((item) => (
                          <div key={item._id} className="flex gap-2 h-20 items-center">
                            <img
                              src={item.product?.image}
                              alt={item.product?.name}
                              className="w-10 h-10 object-cover"
                            />
                            <span>
                              {item.product?.name} × {item.quantity}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="border px-3 py-2">₹{o.totalAmount}</td>
                      <td className="border px-3 py-2">{o.status}</td>
                      <td className="border px-3 py-2">
                        {new Date(o.date).toLocaleDateString()}
                      </td>
                      <td className="border px-3 py-2">
                        <select
                          value={o.status}
                          onChange={(e) => handleStatusChange(o._id, e.target.value)}
                          className="border px-2 py-1 rounded"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {orders.map((o) => (
                <div key={o._id} className="border rounded bg-white shadow p-3">
                  <p className="font-bold text-blue-600">Order ID: {o._id}</p>
                  <p className="text-sm text-gray-700">
                    {o.user?.username} - {o.user?.email}
                  </p>
                  <div className="mt-2">
                    {o.items.map((item) => (
                      <div key={item._id} className="flex items-center gap-2 mb-2">
                        <img
                          src={item.product?.image}
                          alt={item.product?.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span>
                          {item.product?.name} × {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-1">Total: ₹{o.totalAmount}</p>
                  <p className="mt-1">Status: {o.status}</p>
                  <p className="mt-1">Date: {new Date(o.date).toLocaleDateString()}</p>
                  <div className="mt-2">
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o._id, e.target.value)}
                      className="border px-2 py-1 rounded w-full"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1 ? "bg-gray-300" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
