const {Video} = require('../model/index')
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