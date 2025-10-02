const express = require('express')
const cartController = require('../controller/cart.controller')
const { authMiddleware } = require('../middleware/auth.middleware')
const router = express.Router()

router.post('/add', authMiddleware, cartController.addToCart)
router.get('/', authMiddleware, cartController.getCart)
router.post('/:productId', authMiddleware, cartController.removeFromCart)

module.exports = router;