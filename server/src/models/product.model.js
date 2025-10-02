const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: {
    type: String, 
    required: true,
  },
  name: String,
  price: Number,
  discount: {
    type: Number,
    default: 0,
  },
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
  stock: {
    type: Number,
    default: 0
  },
  sold: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('product', productSchema)