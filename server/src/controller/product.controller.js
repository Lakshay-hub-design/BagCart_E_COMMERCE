const productModel = require('../models/product.model')
const userModel = require('../models/user.model')
const orderModel = require('../models/order.model')
const storageService = require('../service/storage.service')
const { v4:uuid } = require('uuid')

async function getProducts(req, res){
    try{

    let sortBy = req.query.sort || "popular";
    let filterBy = req.query.filter || "all";
    let search = req.query.search || "";
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 15;
    let skip = (page - 1) * limit
    
    let filter = {};
    if (filterBy === "new") {
        const last30days = new Date();
        last30days.setDate(last30days.getDate() - 30);
        filter.createdAt = { $gte: last30days };
    } else if (filterBy === "discounted") {
        filter.discount = { $gt: 0 };
    }

    if (search) {
        filter  .name = { $regex: search, $options: "i" };
    }

    let sort = {}
    if (sortBy === "lowtohigh") {
      sort = { price: 1, _id: 1 };
    } else if (sortBy === "hightolow") {
      sort = { price: -1, _id: 1 };
    } else if (sortBy === "newest") {
      sort = { createdAt: -1, _id: 1 };
    } else if (sortBy === "popular") {
      sort = { sold: -1, _id: 1 };
    }

    const products = await productModel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
    const total = await productModel.countDocuments(filter);

    res.status(200).json({
        total,
        page,
        pages: Math.ceil(total / limit),
        products,
    });
    }catch(err){
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Server error" });
    }
}

async function createProducts(req, res) {
    const { name, price, discount, bgcolor, panelcolor, textcolor, stock} = req.body

    try{
        if (!req.file || !name || !price) {
            return res.status(400).json({ message: "Image, name, and price are required" });
        }
        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())
        const product = await productModel.create({
            image: fileUploadResult.url,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
            stock
        });

        await product.save()

        res.status(201).json({
            message: "Product created succesfully",
            product
        })
    }catch(err){
        console.error("Error creating product", err)
        res.status(500).json({message: "Server error"});
    }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateProduct(req, res) {
    const { id } = req.params;
    const { name, price, discount, bgcolor, panelcolor, textcolor, stock } = req.body;
    try{
        const updated = await productModel.findByIdAndUpdate(
            id,
            { name, price, discount, bgcolor, panelcolor, textcolor, stock},
            { new: true }
        );

        if(!updated){
            return res.status(404).json({ message: "Product not found"})
        }

        res.status(200).json({
            message: 'Product updated succesfully',
            product: updated
        });
    } catch(error){
        console.error("Error updating product:", error)
        res.status(500).json({ message: "Server error"})
    }
}

async function getAdminStats(req, res) {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalProducts = await productModel.countDocuments();

    const totalOrders = await orderModel.countDocuments();

    const revenueData = await orderModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" }
        }
      }
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats", err });
  }
}


async function getUserAnalytics(req, res) {
  try {
    const users = await userModel.find();
    const totalUsers = users.length;

    // Fetch all orders grouped by user
    const orders = await orderModel.find().populate("user", "username email");

    // Active users = distinct users with at least one order
    const activeUsers = new Set(orders.map((o) => o.user?._id?.toString())).size;

    // Monthly Signups
    const monthlySignups = {};
    users.forEach((u) => {
      const month = new Date(u.createdAt).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      monthlySignups[month] = (monthlySignups[month] || 0) + 1;
    });

    // User-wise analytics
    const userOrdersMap = {};
    orders.forEach((o) => {
      if (!o.user) return; // safety check
      const userId = o.user._id.toString();
      if (!userOrdersMap[userId]) {
        userOrdersMap[userId] = {
          username: o.user.username,
          email: o.user.email,
          totalOrders: 0,
          totalSpent: 0,
        };
      }
      userOrdersMap[userId].totalOrders += 1;
      userOrdersMap[userId].totalSpent += o.totalAmount || 0;
    });

    const userOrders = Object.values(userOrdersMap);

    // Averages
    const avgOrdersPerUser =
      userOrders.reduce((sum, u) => sum + u.totalOrders, 0) / totalUsers;
    const avgRevenuePerUser =
      userOrders.reduce((sum, u) => sum + u.totalSpent, 0) / totalUsers;

    res.json({
      totalUsers,
      activeUsers,
      monthlySignups,
      userOrders,
      avgOrdersPerUser,
      avgRevenuePerUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching analytics", error: err.message });
  }
}

module.exports = {
    getProducts,
    createProducts,
    deleteProduct,
    updateProduct,
    getAdminStats,
    getUserAnalytics
}