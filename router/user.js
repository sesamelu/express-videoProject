const express = require('express')
const router = express.Router()
const controller = require('../controller/userController')
const userValidator = require('../middleware/validator/userValidator')

//用户注册
router.post('/register',userValidator.register,controller.register)
//用户登录
router.post('/login',userValidator.login,controller.login)

module.exports = router