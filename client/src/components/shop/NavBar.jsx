import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const { user, loading } = useAuth();
  const { searchQuery, setSearchQuery } = useProduct();
  const { cart } = useCart();
  const location = useLocation();

  const showShopCart =
    location.pathname !== "/cart" &&
    location.pathname !== "/orders" &&
    location.pathname !== "/checkout" &&
    location.pathname !== "/account";

  return (
    <header className="sticky top-0 left-0 z-50 w-full bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link
          to="/shop"
          className="shrink-0 text-lg sm:text-xl font-bold text-slate-900 hover:text-blue-500 transition-all"
        >
          BagCart
        </Link>

        {showShopCart && (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="hidden md:flex flex-1 items-center justify-center px-4"
          >
            <div className="w-full max-w-2xl flex">
              <input
                type="text"
                placeholder="Search for products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-11 rounded-l-full border border-slate-300 bg-white px-4 text-[15px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="h-11 px-4 rounded-r-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
              </button>
            </div>
          </form>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link
            to="/shop"
            className="text-sm text-slate-800 hover:text-blue-700"
          >
            Shop
          </Link>

          {/* Account */}
          <Link
            to="/account"
            className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 shadow-sm px-3 h-9 text-sm text-slate-800 hover:border-slate-300"
          >
            <svg
              className="h-5 w-5 text-slate-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M6 20c0-3.3137 2.6863-6 6-6s6 2.6863 6 6" />
            </svg>
            {loading ? "..." : user?.username || "New"}
          </Link>

          {/* Cart */}
          {showShopCart && (
            <Link
              to="/cart"
              className="relative p-1.5 rounded-lg hover:bg-slate-100"
              aria-label="Cart"
            >
              <svg
                className="h-6 w-6 text-slate-800"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 6h14l-1.5 9H8L6 6z" />
                <circle cx="9" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>

      {showShopCart && (
        <div className="md:hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-2">
          <form onSubmit={(e) => e.preventDefault()} className="w-full">
            <input
              type="text"
              placeholder="Search for products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 rounded-full border border-slate-300 bg-white px-4 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
        </div>
      )}
    </header>
  );
}
