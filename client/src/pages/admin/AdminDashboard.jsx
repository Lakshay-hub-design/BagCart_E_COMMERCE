import React, { useEffect, useState } from "react";
import Sidebar from "../../components/adminDashboard/SideBar";
import StatsCard from "../../components/adminDashboard/StatsCard";
import ProductCard from "../../components/adminDashboard/ProductCard";
import axios from "axios";
import EditModal from "../../components/adminDashboard/EditModel";
import { useProduct } from "../../context/ProductsContext";
import { HiMenu } from "react-icons/hi";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { products, setProducts, searchQuery, setSearchQuery, page, setPage, totalPages } = useProduct();
  const [deleteId, setDeleteId] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [isOpen, setIsOpen] = useState(false); // sidebar toggle

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/product/admin/stats", {
          withCredentials: true,
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async () => {
    try {
      await axios.post(`http://localhost:3000/api/product/delete/${deleteId}`, {}, {
        withCredentials: true,
      });
      setProducts(products.filter((p) => p._id !== deleteId));
      toast.success("Product deleted")
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    } finally {
      setDeleteId(null);
    }
  };

  const handleUpdate = async (updateProduct) => {
    try {
      const { _id, ...data } = updateProduct;
      const res = await axios.post(
        `http://localhost:3000/api/product/editproduct/${_id}`,
        data,
        { withCredentials: true }
      );
      setProducts((prev) =>
        prev.map((p) => (p._id === _id ? res.data.product : p))
      );
      setEditProduct(null);
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main className="relative flex-1 md:p-8 bg-gray-50">
        {/* Mobile Menu Button */}

        <div className="md:hidden w-full flex justify-between px-2 py-2 fixed top-0 left-0 items-center bg-white shadow">
          <h4 className="text-blue-600 font-bold ml-2">Admin Dashboard</h4>
          <button
          onClick={() => setIsOpen(true)}
          className="px-3 py-2 text-blue-600 rounded flex items-center gap-2"
          >
          <HiMenu size={20} />
          </button>
        </div>

        <div className="pt-14 md:pt-0 mb-10">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 p-4">
          <StatsCard title="Products" value={stats.totalProducts} />
          <StatsCard title="Orders" value={stats.totalOrders} />
          <StatsCard title="Users" value={stats.totalUsers} />
          <StatsCard title="Revenue" value={stats.totalRevenue} />
        </div>

        {/* Product Controls */}
        <div className="mb-6 p-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded px-4 py-2 w-full md:w-1/3"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 p-4">
          {products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              isAdmin
              onDelete={() => setDeleteId(p._id)}
              onEdit={() => setEditProduct(p)}
            />
          ))}
        </div>

        {/* Edit Modal */}
        {editProduct && (
          <EditModal
            product={editProduct}
            onClose={() => setEditProduct(null)}
            onSave={handleUpdate}
          />
        )}

        {/* Delete Modal */}
        {deleteId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <p>Are you sure you want to delete this product?</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setDeleteId(null)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="w-full flex justify-center mt-6 space-x-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              className={`px-3 py-1 rounded ${
                pg === page ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setPage(pg)}
            >
              {pg}
            </button>
          ))}
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
