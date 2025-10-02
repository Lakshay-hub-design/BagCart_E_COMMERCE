const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model('cart', cartSchema)