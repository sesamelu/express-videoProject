const {User} = require('../model/index')
const {createToken} = require('../util/jwt')
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
    const user = await User.findOne(req.body)
    if(!user){
        res.status(402).json('用户名或密码不正确')
    }
    const userInfo = user.toJSON()
    userInfo.token = createToken(userInfo)
    res.status(200).json(userInfo)
}