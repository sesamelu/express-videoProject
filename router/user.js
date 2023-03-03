const express = require('express')
const router = express.Router()
const controller = require('../controller/userController')

//用户注册、登录、jwt认证
router.use('/register',controller.register)
router.use('/login',controller.login)

module.exports = router