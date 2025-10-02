const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRoutes = require('./routes/auth.route')
const productRoutes = require('../src/routes/product.route')
const userRoutes = require('./routes/user.route')
const cartRoutes = require('./routes/cart.route')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [
        'http://localhost:5173'
    ],
    credentials: true
}))

app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/user', userRoutes)
app.use('/api/cart', cartRoutes)

module.exports = app