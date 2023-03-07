const {User,Subscribe} = require('../model/index')
const {createToken} = require('../util/jwt')
const fs = require('fs')
const {promisify} = require('util')
const rename = promisify(fs.rename)
const lodash = require('lodash')
//用户注册
module.exports.register = async (req,res) => {
    const user = new User(req.body)
    const userBack = await user.save()
    const userInfo = userBack.toJSON()
    delete userInfo.password
    res.status(200).json(userInfo)
}
//用户登录
module.exports.login = async (req,res) => {
    var user = await User.findOne(req.body)
    if(!user){
        res.status(402).json('用户名或密码不正确')
    }
    var userInfo = user.toJSON()
    userInfo.token = await createToken(userInfo)
    res.status(200).json(userInfo)
}
//用户信息修改
module.exports.update = async (req,res) => {
    const id = req.user.userInfo._id
    var userInfo = await User.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json(userInfo)
}
//上传用户头像
module.exports.uploadavatar = async (req,res) => {
    // req.file
    // {
    //     fieldname: 'avatar',
    //     originalname: '7f6f962c681239eb4ee1746f88502068.mp4',
    //     encoding: '7bit',
    //     mimetype: 'video/mp4',
    //     destination: 'public/',
    //     filename: '84add7497ce24d3a337fb7d5795b6f99',
    //     path: 'public/84add7497ce24d3a337fb7d5795b6f99',
    //     size: 4088064
    //   }
    //修改文件名称
    var filename = req.file.filename
    var typeArr = req.file.originalname.split('.')
    var type = typeArr[typeArr.length-1]
    try{
        await rename(
            'public/' + filename,
            'public/' + filename + '.' + type,
        )
        res.status(200).json({filename:filename + '.' + type})
    }catch(err){
        res.status(500).json({error:err})
    }
}
//关注频道
module.exports.subscribe = async (req,res) => {
    const id = req.user.userInfo._id
    const channelId = req.params.channelId
    if(id === channelId){
        return res.status(402).json({error:'不能自己关注自己'})
    }
    //判断是否关注过
    var info = await Subscribe.findOne({
        user:id,
        channel:channelId
    })
    if(info){
        return res.status(402).json({error:'您已经关注此频道'})
    }else{
        await new Subscribe({
            user:id,
            channel:req.params.channelId
        }).save()
        const user = await User.findById(channelId)
        user.subscribeCount ++
        await user.save()
        res.status(200).json({msg:'关注成功'})
    }
}
//取消关注
module.exports.unsubscribe = async (req,res) => {
    let userId = req.user.userInfo._id
    let channelId = req.params.channelId
    if(userId === channelId){
        return res.status(402).json({error:'不能关注自己'})
    }
    //判断是否关注过
    let info = await Subscribe.findOne({
        user:userId,
        channel:channelId
    })
    if(info){
        await Subscribe.deleteOne(info)
        let user = await User.findById(channelId)
        user.subscribeCount --
        await user.save()
        res.status(200).json({msg:'取消关注成功'})
    }else{
        return res.status(402).json({error:'您未订阅此频道'})
        
    }
}
//获取频道信息
module.exports.getuser = async (req,res) => {
    let userId = req.user.userInfo._id
    let channelId = req.params.channelId
    //判断用户是否登录
    // 如果登录了需要返回是否关注字段，不管是否登录，都要返回用户信息
    let isSubsctibe = false
    if(req.user){
        let subscribe = await Subscribe.findOne({
            user:userId,
            channel:channelId
        })
        if(subscribe){
            isSubsctibe = true
        }
    }
    let user = await User.findById(channelId)
    // let userInfo = user.toJSON()
    // userInfo.isSubsctibe = isSubsctibe
    // res.status(200).json(userInfo)
    res.status(200).json({
        ...lodash.pick(user,[
            '_id',
            'username',
            'avatar',
            'channelDes',
            'subscribeCount'
        ]),isSubsctibe
    })
}
//查看某个用户的关注列表
module.exports.getsubscribe = async (req,res) => {
   let userId = req.params.userId
   let subscribeList = await Subscribe.find({
        user:userId
   }).populate('channel')
   subscribeList = subscribeList.map(item=>{
    return lodash.pick(item.channel,[
        '_id',
        '_username',
        'avatar',
        'subscribeCount'
    ])
   })
   res.status(200).json(subscribeList)
}
//查看当前用户的粉丝列表
module.exports.getchannel = async (req,res) => {
    const userId = req.user.userInfo._id
    let channelList = await Subscribe.find({
        channel:userId
    }).populate('user')
    channelList = channelList.map(item=>{
        return lodash.pick(item.user,[
            '_id',
            '_username',
            'avatar',
            'subscribeCount'
        ])
       })
       res.status(200).json(channelList)
    
}