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

// 关注
router.get('/subscribe/:channelId',verifyToken(),controller.subscribe)
// 取消关注
router.get('/unsubscribe/:channelId',verifyToken(),controller.unsubscribe)
// 获取频道信息(获取用户信息、登录和未登录看到的信息是不同的，登录后可以看到是否关注等)
router.get('/getuser/:channelId',verifyToken(false),controller.getuser)
// 关注列表(查看某个用户的关注列表)
router.get('/getsubscribe/:userId',controller.getsubscribe)
// 粉丝列表（查看当前用户的粉丝列表）
router.get('/getchannel',verifyToken(),controller.getchannel)

module.exports = router