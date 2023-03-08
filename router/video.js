const express = require('express')
const router = express.Router()
const vodController = require('../controller/vodController')
const videoController = require('../controller/videoController')
const {verifyToken} = require('../util/jwt')
const videoValidator = require('../middleware/validator/videoValidator')

// 获取vod上传凭证
router.get('/getvod',verifyToken(),vodController.getVod)
// 视频入库
router.post('/createVideo',verifyToken(),videoValidator.createVideo,videoController.createVideo)
// 视频列表
router.get('/list',videoController.list)
//视频详情
router.get('/video/:videoId',verifyToken(false),videoController.getVideo)



module.exports = router