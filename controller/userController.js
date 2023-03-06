const {User} = require('../model/index')
//用户注册
module.exports.register = async (req,res) => {
    const user = new User(req.body)
    const userBack = await user.save()
    const userInfo = userBack.toJSON()
    delete userInfo.password
    res.status(200).json({userInfo})
}
//用户登录
module.exports.login = async (req,res) => {

}