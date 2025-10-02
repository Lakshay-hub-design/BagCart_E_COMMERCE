const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], default: 'user'
    },
    address: {
        fullName: String,
        phone: String,
        street: String,
        city: String,
        state: String,
        pincode: String,
      },
    picture: {
      type: String
    },
}, {timestamps: true});

module.exports = mongoose.model('user', userSchema)