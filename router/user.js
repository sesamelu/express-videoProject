const express = require('express')
const router = express.Router()
const controller = require('../controller/userController')
const userValidator = require('../middleware/validator/userValidator')

//用户注册、登录、jwt认证
router.post('/register',userValidator.register,controller.register)
router.post('/login',controller.login)

module.exports = router