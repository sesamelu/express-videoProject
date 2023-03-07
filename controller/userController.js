const {User} = require('../model/index')
const {createToken} = require('../util/jwt')
const fs = require('fs')
const {promisify} = require('util')
const rename = promisify(fs.rename)
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