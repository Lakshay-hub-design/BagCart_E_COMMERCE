import React, { useEffect, useState } from "react";
import Sidebar from "../../components/adminDashboard/SideBar";
import axios from "axios";
import { toast } from "sonner";
import { HiMenu } from "react-icons/hi";

const CreateProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    discount: "",
    bgColor: "#ffffff",
    panelColor: "#f3f3f3",
    textColor: "#000000",
    stock: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!form.image) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(form.image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [form.image]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("discount", form.discount);
      formData.append("bgcolor", form.bgColor);
      formData.append("panelcolor", form.panelColor);
      formData.append("textcolor", form.textColor);
      formData.append("stock", form.stock);
      if (form.image) formData.append("image", form.image);

      await axios.post("http://localhost:3000/api/product/create", formData, {
        withCredentials: true,
      });

      toast.success("Product created successfully ✅");

      setForm({
        name: "",
        price: "",
        discount: "",
        bgColor: "#ffffff",
        panelColor: "#f3f3f3",
        textColor: "#000000",
        stock: "",
        image: null,
      });
      setPreview(null);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main className="relative flex-1 bg-gray-50">
        {/* Navbar (same as AdminDashboard) */}
        <div className="md:hidden w-full flex justify-between px-2 py-2 fixed top-0 left-0 z-30 items-center bg-white shadow h-12">
          <h4 className="text-blue-600 font-bold ml-2">Create Product</h4>
          <button
            onClick={() => setIsOpen(true)}
            className="px-3 py-2 text-blue-600 rounded flex items-center gap-2"
          >
            <HiMenu size={20} />
          </button>
        </div>

        {/* Push content below navbar */}
        <div className="pt-14 md:pt-4 md:px-10 mb-10">
          <h2 className="text-2xl font-semibold mb-6">Create New Product</h2>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Left: Form */}
            <section className="xl:col-span-7 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium mb-4">Product Details</h3>

                {/* Image Upload */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700 cursor-pointer"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    PNG, JPG, or WEBP recommended.
                  </p>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Product Name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount
                    </label>
                    <input
                      type="number"
                      name="discount"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={form.discount}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      placeholder="0"
                      min="0"
                      value={form.stock || ""}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Colors & Theme */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium mb-4">Colors & Theme</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Background
                    </label>
                    <input
                      type="color"
                      name="bgColor"
                      value={form.bgColor}
                      onChange={handleChange}
                      className="h-10 w-full rounded-md cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Panel
                    </label>
                    <input
                      type="color"
                      name="panelColor"
                      value={form.panelColor}
                      onChange={handleChange}
                      className="h-10 w-full rounded-md cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Text
                    </label>
                    <input
                      type="color"
                      name="textColor"
                      value={form.textColor}
                      onChange={handleChange}
                      className="h-10 w-full rounded-md cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-white text-sm font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Create New Product
                </button>
              </div>
            </section>

            {/* Right: Live Preview */}
            <aside className="xl:col-span-5">
              <div className="xl:sticky xl:top-20">
                <div
                  className="rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                  style={{ backgroundColor: form.bgColor }}
                  aria-live="polite"
                >
                  <div className="relative w-full pb-[75%]">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Product preview"
                        className="absolute inset-0 h-full m-auto object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
                        No image selected
                      </div>
                    )}
                  </div>
                  <div
                    className="p-5"
                    style={{
                      backgroundColor: form.panelColor,
                      color: form.textColor,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-base font-semibold">
                          {form.name || "Product name"}
                        </h4>
                        <p className="mt-1 text-sm opacity-80">
                          Preview updates as fields change
                        </p>
                      </div>
                      <div className="text-right">
                        {form.discount ? (
                          <>
                            <div className="text-sm line-through opacity-70">
                              ₹{form.price || "0.00"}
                            </div>
                            <div className="text-lg font-semibold">
                              ₹{form.price - form.discount}
                            </div>
                          </>
                        ) : (
                          <div className="text-lg font-semibold">
                            ₹{form.price || "0.00"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs text-gray-500">
                  Preview uses a temporary blob URL; changing the file recreates it and cleans the old one.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateProduct;
