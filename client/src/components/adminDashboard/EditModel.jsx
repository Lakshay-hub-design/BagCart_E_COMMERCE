import { useState } from "react";

const EditModal = ({ product, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    discount: product.discount || "",
    stock: product.stock,
    bgcolor: product.bgcolor,
    panelcolor: product.panelcolor,
    textcolor: product.textcolor,
    image: product.image,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, _id: product._id });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 ">
      <div className="bg-white w-[400px] p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="number"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            placeholder="Discount %"
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full border px-3 py-2 rounded"
          />

          {/* Colors */}
          <div className="flex gap-2">
            <input
              type="color"
              name="bgcolor"
              value={form.bgcolor}
              onChange={handleChange}
            />
            <input
              type="color"
              name="panelcolor"
              value={form.panelcolor}
              onChange={handleChange}
            />
            <input
              type="color"
              name="textcolor"
              value={form.textcolor}
              onChange={handleChange}
            />
          </div>

          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border px-3 py-2 rounded"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
