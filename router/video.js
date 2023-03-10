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
// 评论视频
router.post('/comment/:videoId',verifyToken(),videoController.comment)
// 获取评论列表
router.post('/commentlist/:videoId',videoController.commentList)
// 删除评论
router.delete('/comment/:videoId/:commentId',verifyToken(),videoController.delComment)
// 喜欢视频
router.get('/like/:videoId',verifyToken(),videoController.like)
// 不喜欢视频
router.get('/dislike/:videoId',verifyToken(),videoController.dislike)
// 喜欢视频列表
router.get('/likelist',verifyToken(),videoController.likelist)
// 收藏视频
router.get('/collect/:videoId',verifyToken(),videoController.collect)
// 获取热门视频
router.get('/hotslist/:topnum',videoController.hotslist)

module.exports = router