const {Video,Comment} = require('../model/index')
// 视频入库
module.exports.createVideo = async (req,res)=>{
    let userId = req.user.userInfo._id
    let body = req.body
    body.user = userId
    let videoInfo = await new Video(body)
    try {
        let back = await videoInfo.save()
        res.status(200).json(back)
    } catch (error) {
        res.status(500).json(error)
    }
}
//获取视频列表
module.exports.list = async (req,res)=>{
    let {pageNum,pageSize} = req.body
    let videoList = await Video.find()
                        .skip((pageNum-1)*pageSize)
                        .limit(pageSize)
                        .sort({createAt:-1})//按照创建时间降序
                        .populate('user','_id username _avatar')
    let total = await Video.countDocuments()//获取总条数
    res.status(200).json({videoList,total})
}
// 获取视频详情
module.exports.getVideo = async (req,res)=>{
    let videoId = req.params.videoId
    //根据用户是否登录返回不同的信息  登录的用户会显示是否喜欢
    let videoInfo = Video.findById(videoId)
                        .populate('user','_id username avatar')
    //逻辑待完善
}
// 评论视频
module.exports.comment = async (req,res)=>{
    let videoId = req.params.videoId
    let userId = req.user.userInfo._id
    try {
        var videoInfo = await Video.findById(videoId)
    } catch (error) {
        return res.status(404).json({error:'视频不存在'})
    }
    if(!req.body.content){
        return res.status(400).json({error:'请传入评论内容'})
    }
    let commentInfo = await Comment({
        content:req.body.content,
        user:userId,
        video:videoId
    }).save()
    videoInfo.commentCount ++ 
    await videoInfo.save()
    res.status(200).json(commentInfo)
}
// 获取评论列表
module.exports.commentList = async (req,res)=>{
    let videoId = req.params.videoId
    let {pageNum,pageSize} = req.body
    try {
        let list = await Comment.find({video:videoId})
                .skip((pageNum-1) * pageSize)
                .limit(pageSize)
                .sort({createAt:-1})
                .populate('user','_id username avatar')
        let total = await Comment.countDocuments({video:videoId})
        res.status(200).json({list,total})
    } catch (error) {
        res.status(404).json({error:'视频不存在'})
    }
}
// 删除评论
module.exports.delComment = async (req,res)=>{
    let videoId = req.params.videoId
    let commentId = req.params.commentId
    //视频是否存在
    try {
        var videoInfo = await Video.findById(videoId)
    } catch (error) {
        return res.status(404).json({error:'视频不存在'})
    }
    //评论是否存在
    try {
        var commentInfo = await Comment.findById(commentId)
    } catch (error) {
        return res.status(404).json({error:'评论不存在'})
    }
    //是否有权限删除
    if(!commentInfo?.user.equals(req.user.userInfo._id)){
        return res.status(403).json({error:'评论不可删除'})
    }
    //评论删除后，评论总数减1
    await commentInfo.deleteOne()
    videoInfo.commentCount -- 
    await videoInfo.save()
    res.status(200).json({msg:'删除成功'})
}