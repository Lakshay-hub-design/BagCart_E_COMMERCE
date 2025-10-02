const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  paymentStatus: { type: String, enum: ["Pending", "Paid", "Refunded"], default: "Pending" },
  trackingId: { type: String },
  address: {
    fullName: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
  },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("order", orderSchema);
