import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { HiMenu } from "react-icons/hi";
import Sidebar from "../../components/adminDashboard/SideBar";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export default function UserAnalytics() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/admin/analytics`, {
          withCredentials: true,
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnalytics();
  }, []);

  if (!data) return <div className="p-10">Loading...</div>;

  // Transform monthly signup data
  const signupData = Object.entries(data.monthlySignups).map(([month, count]) => ({
    month,
    count,
  }));

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Drawer */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="md:hidden w-full flex justify-between px-2 py-2 fixed top-0 left-0 z-30 items-center bg-white shadow h-12">
          <h4 className="text-blue-600 font-bold ml-2">User Analytics</h4>
          <button
            onClick={() => setIsOpen(true)}
            className="px-3 py-2 text-blue-600 rounded flex items-center gap-2"
          >
            <HiMenu size={20} />
          </button>
        </div>

        <main className="flex-1 p-6 pt-14 md:pt-4 mb-10">
          <h2 className="text-2xl font-bold mb-6">User Analytics</h2>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white shadow rounded p-6">
              <h3 className="text-gray-500">Total Users</h3>
              <p className="text-2xl font-bold">{data.totalUsers}</p>
            </div>
            <div className="bg-white shadow rounded p-6">
              <h3 className="text-gray-500">Active Users</h3>
              <p className="text-2xl font-bold">{data.activeUsers}</p>
            </div>
            <div className="bg-white shadow rounded p-6">
              <h3 className="text-gray-500">Avg Orders/User</h3>
              <p className="text-2xl font-bold">{data.avgOrdersPerUser.toFixed(2)}</p>
            </div>
            <div className="bg-white shadow rounded p-6">
              <h3 className="text-gray-500">Avg Revenue/User</h3>
              <p className="text-2xl font-bold">₹{data.avgRevenuePerUser.toFixed(2)}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Signups */}
            <div className="bg-white shadow rounded p-6">
              <h3 className="text-lg font-semibold mb-4">Monthly Signups</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={signupData}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Users by Revenue */}
            <div className="bg-white shadow rounded p-6">
              <h3 className="text-lg font-semibold mb-4">Top Users by Revenue</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.userOrders.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="username" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalSpent" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
