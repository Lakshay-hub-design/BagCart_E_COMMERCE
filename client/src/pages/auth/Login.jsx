import axios from "axios";
import { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductsContext";

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { fetchProduct } = useProduct()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/auth/user/login', form, {
        withCredentials: true
      })
      await new Promise((r) => setTimeout(r, 900));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      const role = res.data.user.role
      fetchProduct()
      login(res.data.user)
      if(role === "admin"){
        navigate('/admin-dashboard')
      }else{
        navigate('/shop')
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      setErr( error.response.data.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-50 via-blue-100 to-white">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo + Title */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 shadow-lg shadow-blue-500/20 ring-1 ring-white/40">
              <span className="text-2xl font-extrabold text-white">B</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-900">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-blue-700/80">
              Log in to continue shopping premium bags at BagCart.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-blue-200/60 bg-white/70 p-6 shadow-xl backdrop-blur-md">
            <form onSubmit={handleSubmit} className="space-y-5">
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
                    autoComplete="current-password"
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
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="mt-5 text-center text-sm text-blue-800/80">
              New to BagCart?{" "}
              <Link
                to="/user/register"
                className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-blue-900"
              >
                Create an account
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-blue-700/70">
            Protected by modern encryption. Never share passwords.
          </p>
        </div>
      </div>
    </div>
  );
}
