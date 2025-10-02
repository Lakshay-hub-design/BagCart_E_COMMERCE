const express = require('express');
const router = express.Router();
const {authMiddleware, isAdmin} = require('../middleware/auth.middleware')
const userController = require('../controller/user.controller')
const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage(),
})

router.get("/me", authMiddleware , userController.getUser)
router.post('/upload', authMiddleware, upload.single('picture'), userController.profileUpload)
router.post("/address", authMiddleware, userController.addAddress)
router.get('/address', authMiddleware, userController.getAddress)
router.post('/order', authMiddleware, userController.placeOrder)
router.get('/orders', authMiddleware, userController.getOrders)
router.post('/update', authMiddleware, userController.updateCartQuantity)

router.get('/admin/orders', authMiddleware, isAdmin, userController.getAllOrders)
router.post('/admin/update/:id/status', authMiddleware, isAdmin, userController.updateOrderStatus)

module.exports = router 