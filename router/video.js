const express = require('express')
const router = express.Router()
const vodController = require('../controller/vodController')
const videoController = require('../controller/videoController')
const {verifyToken} = require('../util/jwt')

// 获取vod上传凭证
router.get('/getvod',verifyToken(),vodController.getVod)




module.exports = router