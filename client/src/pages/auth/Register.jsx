// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/user/register`, form, {
            withCredentials: true
        })
      await new Promise((r) => setTimeout(r, 900));
      navigate('/dashboard')
      alert("Registration successful! Please login.");
    } catch (error) {
      setErr(error.response.data.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-50 via-blue-100 to-white">
      {/* Decorative background orbs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo + Title */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 shadow-lg shadow-blue-500/20 ring-1 ring-white/40">
              <span className="text-2xl font-extrabold text-white">B</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-900">
              Join BagCart
            </h1>
            <p className="mt-2 text-sm text-blue-700/80">
              Create an account to explore premium bags and exclusive deals.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-blue-200/60 bg-white/70 p-6 shadow-xl backdrop-blur-md">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="username" className="mb-1 block text-sm font-medium text-blue-900">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={form.username}
                  onChange={handleChange}
                  placeholder="e.g. baglover_21"
                  className="w-full rounded-xl border border-blue-200 bg-white px-3 py-2.5 text-blue-900 placeholder-blue-400 shadow-sm outline-none ring-blue-400 transition focus:border-blue-400 focus:ring-2"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-blue-900">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-blue-200 bg-white px-3 py-2.5 text-blue-900 placeholder-blue-400 shadow-sm outline-none ring-blue-400 transition focus:border-blue-400 focus:ring-2"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium text-blue-900">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-blue-200 bg-white px-3 py-2.5 text-blue-900 placeholder-blue-400 shadow-sm outline-none ring-blue-400 transition focus:border-blue-400 focus:ring-2"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-2 my-1 inline-flex items-center rounded-lg px-3 text-sm text-blue-700/80 hover:bg-blue-50"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {err && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {err}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 px-4 py-2.5 font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:shadow-blue-600/40 disabled:from-blue-400 disabled:to-sky-300"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/15 transition group-hover:translate-x-0" />
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <div className="mt-5 text-center text-sm text-blue-800/80">
              Already have an account?{" "}
              <Link
                to="/user/login"
                className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-blue-900"
              >
                Log in
              </Link>
            </div>
          </div>

          {/* Foot note */}
          <p className="mt-6 text-center text-xs text-blue-700/70">
            By signing up, consent is given to BagCart’s Terms & Privacy.
          </p>
        </div>
      </div>
    </div>
  );
}
