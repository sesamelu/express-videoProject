const express = require('express')
const router = express.Router()
const controller = require('../controller/userController')
const userValidator = require('../middleware/validator/userValidator')
const {verifyToken} = require('../util/jwt')
const multer = require('multer')
const upload = multer({dest:'public/'})

// 用户注册
router.post('/register',userValidator.register,controller.register)
// 用户登录
router.post('/login',userValidator.login,controller.login)
// 用户信息修改
router.put('/',verifyToken(),userValidator.update,controller.update)
// 用户头像上传
router.post('/uploadavatar',verifyToken(),upload.single('avatar'),controller.uploadavatar)


module.exports = router