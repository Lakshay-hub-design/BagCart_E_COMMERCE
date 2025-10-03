import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/user/logout`, {
      withCredentials: true,
    });
    localStorage.removeItem("user");
    navigate("/user/login");
  };

  return (
    <aside
      className={`
        fixed inset-y-0 right-0 z-40 w-64 bg-gray-100 p-4 shadow-lg transform 
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        md:translate-x-0 md:static md:w-64
      `}
    >
      <h1 className="text-2xl text-blue-500 font-bold mb-4">Bag Cart</h1>
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li><Link to="/admin-dashboard">Dashboard</Link></li>
        <li><Link to="/create">Create Product</Link></li>
        <li><Link to="/user-analytics">User Analytics</Link></li>
        <li><Link to="/admin/orders">Orders</Link></li>
        <li>
          <button
            onClick={handleLogout}
            className="text-red-500 cursor-pointer"
          >
            Logout
          </button>
        </li>
      </ul>

      {/* Close button (only mobile) */}
      <button
        onClick={() => setIsOpen(false)}
        className="md:hidden px-2 py-2 mt-2 mr-2 absolute top-0 right-0 bg-gray-200 text-black rounded-full"
      >
        <RxCross2 />
      </button>
    </aside>
  );
};

export default Sidebar;
