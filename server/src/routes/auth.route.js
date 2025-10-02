const express = require('express');
const userController = require('../controller/auth.controller')
const router = express.Router()

// router.post('/admin/register', userController.createAdmin)
router.post("/user/register", userController.register)
router.post("/user/login", userController.login)
router.get("/user/logout", userController.logOut)

module.exports = router