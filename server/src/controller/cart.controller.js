const cartModel = require('../models/cart.model')

async function addToCart(req, res) {
    try{
        const {productId, quantity} = req.body
        const userId = req.user.id

        if (!productId) {
            return res.status(400).json({ message: "productId is required" });
        }
        let cart = await cartModel.findOne({ userId })

        if(!cart){
            cart = new cartModel({
                userId,
                products: [{ productId, quantity }]
            })
            await cart.save()
            return res.status(201).json(cart)
        }

        const existing = await cart.products.find(
            (p) => p.productId.toString() === productId
        )

        if(existing){
            existing.quantity = existing.quantity + quantity
        }else{
            cart.products.push({ productId, quantity})
        }

        await cart.save()
        res.status(200).json(cart)
    } catch (err) {
        console.error("addToCart error:", err)
        return res.status(500).json({ message: "Server error" })
    }
};

async function getCart(req, res) {
  try {
    const userId = req.user.id
    const cart = await cartModel.findOne({ userId }).populate("products.productId")
    res.json(cart || { products: [] })
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err })
  }
};

async function removeFromCart(req, res) {
  try {
    const { productId } = req.params
    const userId = req.user.id

    const cart = await cartModel.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true }
    )

    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: "Error removing item", error: err })
  }
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart
}