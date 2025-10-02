const userModel = require('../models/user.model')
const cartModel = require('../models/cart.model')
const orderModel = require('../models/order.model')
const productModel = require('../models/product.model')
const storageService = require('../service/storage.service')
const { v4:uuid } = require('uuid')

async function getUser(req, res) {
  try {
    const user = await userModel.findById(req.user.id).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json({user})
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function profileUpload (req, res) {
    try {
      if(!req.file) return res.status(400).json({ message: "Image is require"})
        const user = await userModel.findById(req.user.id)
        if(!user) return res.status(400).json({ message: "User not found"})
          
        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())
        user.picture = fileUploadResult.url

        await user.save()

        res.json({ message: "Profile picture updated", picture: user.picture })
    } catch (err) {
        res.status(500).json({ message: "Error uploading profile picture", err })
    }
}

async function addAddress(req, res) {
  try{
    const user = await userModel.findById(req.user.id)
    if(!user) return res.status(400).json({message: "User not found"})
    user.address = req.body
    await user.save()
    res.json(user.address)
  }catch(err){
    res.status(500).json({ message: "Error saving Address", err})
  }
}

async function getAddress(req, res) {
  try{
    const user = await userModel.findById(req.user.id).select("address")
    res.json(user.address || null)
  }catch(err){
    res.status(500).json({ message: "Error fetching address", err })
  }
}

async function placeOrder(req, res) {
  try{
    const { items, totalAmount, address, paymentStatus } = req.body;
    const order = new orderModel({
      user: req.user.id,
      items,
      totalAmount,
      address,
      paymentStatus: paymentStatus || "Pending"
    })

    await order.save()

    for (const item of items) {
      await productModel.findByIdAndUpdate(
        item.product,
        {
          $inc: { stock: -item.quantity, sold: item.quantity },
        }
      );
    }

    await cartModel.findOneAndUpdate(
     { userId: req.user.id },
     { $set: { products: [] } },
     { new: true }
    );
    
    res.status(201).json({ message: 'Order placed', order})
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error placing order", error: err.message });
  }
}

async function getOrders(req, res) {
 try {
  const orders = await orderModel.find({ user: req.user.id })
    .populate({
      path: "items.product",
      model: "product",
      select: "name price image"
    })
    .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function getAllOrders(req, res) {
  const orders = await orderModel.find()
    .populate("user", "username email")
    .populate("items.product", "name price image")
    .sort({ createdAt: -1 });

  res.json(orders);
}

async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status, trackingId, paymentStatus } = req.body;

  const order = await orderModel.findById(id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  if (status) order.status = status;
  if (trackingId) order.trackingId = trackingId;
  if (paymentStatus) order.paymentStatus = paymentStatus;

  await order.save();
  res.json({ message: "Order updated successfully", order });
}

async function updateCartQuantity(req, res) {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    let cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.products[itemIndex].quantity = quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    return res.json(cart);
  } catch (err) {
    console.error("Error updating cart quantity:", err);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {getUser, profileUpload, addAddress, getAddress, placeOrder, getOrders, getAllOrders, updateOrderStatus, updateCartQuantity}