const express = require('express')
const productController = require('../controller/product.controller')
const { authMiddleware, isAdmin } = require('../middleware/auth.middleware')
const router = express.Router()
const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage(),
})

router.get('/shop', authMiddleware, productController.getProducts)
router.post('/create', authMiddleware, isAdmin, upload.single('image'), productController.createProducts)
router.post("/editproduct/:id", authMiddleware, isAdmin, productController.updateProduct)
router.post("/delete/:id", authMiddleware, isAdmin, productController.deleteProduct)

router.get("/admin/stats", authMiddleware, isAdmin, productController.getAdminStats);
router.get("/admin/analytics",authMiddleware, isAdmin, productController.getUserAnalytics);

module.exports = router