import React, { useState } from "react";
import { useProduct } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import ProductSkeleton from "./ProductSkeleton";

const ShopContent = () => {
  const {
    products,
    filter,
    setFilter,
    sort,
    setSort,
    page,
    setPage,
    totalPages,
    loading
  } = useProduct();
  const { addToCart } = useCart();

  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      <div className="flex md:hidden justify-between px-4 py-3 bg-white shadow sticky top-24 z-40">
        <button
          onClick={() => {
            setShowSort(!showSort);
            setShowFilter(false);
          }}
          className="px-4 py-2 w-1/2 border rounded text-sm font-medium"
        >
          Sort
        </button>
        <button
          onClick={() => {
            setShowFilter(!showFilter);
            setShowSort(false);
          }}
          className="px-4 py-2 w-1/2 border rounded text-sm font-medium"
        >
          Filter
        </button>
      </div>

      {showSort && (
        <div className="md:hidden bg-white shadow px-4 py-3 space-y-2">
          {[
            { value: "popular", label: "Popular" },
            { value: "lowtohigh", label: "Price: Low to High" },
            { value: "hightolow", label: "Price: High to Low" },
            { value: "newest", label: "Newest" },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`block cursor-pointer ${
                sort === opt.value ? "text-blue-500 font-semibold" : "text-gray-700"
              }`}
            >
              <input
                type="radio"
                name="sort"
                value={opt.value}
                checked={sort === opt.value}
                onChange={(e) => setSort(e.target.value)}
                className="hidden"
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}

      {showFilter && (
        <div className="md:hidden bg-white shadow px-4 py-3 space-y-2">
          {[
            { value: "new", label: "New Collection" },
            { value: "all", label: "All Products" },
            { value: "discounted", label: "Discounted Products" },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`block cursor-pointer ${
                filter === opt.value ? "text-blue-500 font-semibold" : "text-gray-700"
              }`}
            >
              <input
                type="radio"
                name="filter"
                value={opt.value}
                checked={filter === opt.value}
                onChange={(e) => setFilter(e.target.value)}
                className="hidden"
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}

      <div className="md:flex px-6 py-6 gap-4">
        {/* Left Filters */}
        <div className="hidden md:block w-1/5">
          <div className="bg-white shadow rounded p-4 h-full">
            <h2 className="font-bold mb-3 text-blue-600">Sort by:</h2>
            <div className="flex flex-col gap-2">
              {[
                { value: "popular", label: "Popular" },
                { value: "lowtohigh", label: "Price: Low to High" },
                { value: "hightolow", label: "Price: High to Low" },
                { value: "newest", label: "Newest" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`cursor-pointer px-3 rounded transition 
                    ${
                      sort === opt.value
                        ? " text-blue-400 font-semibold"
                        : "bg-gray-50"
                    }`}
                >
                  <input
                    type="radio"
                    name="sort"
                    value={opt.value}
                    checked={sort === opt.value}
                    onChange={(e) => setSort(e.target.value)}
                    className="hidden"
                  />
                  {opt.label}
                </label>
              ))}
            </div>

            <h2 className="font-bold mb-3 mt-3 text-blue-600">Filter by:</h2>
            <div className="flex flex-col gap-3">
              {[
                { value: "new", label: "New Collection" },
                { value: "all", label: "All Products" },
                { value: "discounted", label: "Discounted Products" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 px-4 rounded-lg cursor-pointer transition 
                  ${
                    filter === opt.value
                      ? "text-blue-400 font-semibold"
                      : "bg-gray-50 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="filter"
                    value={opt.value}
                    checked={filter === opt.value}
                    onChange={(e) => setFilter(e.target.value)}
                    className="hidden"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Products Grid */}
        <div className="lg:w-4/5 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {loading ?( 
            <ProductSkeleton />
          ) : ( 
          products.map((product, idx) => (
            <div
              key={idx}
              className="bg-white shadow rounded overflow-hidden relative"
            >
              {product.discount > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
                  ₹{product.discount} OFF
                </span>
              )}
              <div
                style={{ backgroundColor: product.bgcolor }}
                className="h-40 flex items-center justify-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-30 object-contain"
                />
              </div>
              <div
                style={{
                  backgroundColor: product.panelcolor,
                  color: product.textcolor,
                }}
                className="p-3 flex justify-between"
              >
                <div>
                  <h3 className="font-bold truncate text-[11px] md:text-[14px] w-20 md:w-30">{product.name}</h3>
                  <p className="text-[11px] md:text-m">₹{product.price}</p>
                </div>
                <div>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="mt-2 bg-white text-black h-6 w-6 md:h-8 md:w-8 flex items-center cursor-pointer justify-center text-[24px] rounded-full"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )))}
        </div>
      </div>

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
    </>
  );
};

export default ShopContent;
