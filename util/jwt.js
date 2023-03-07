const jwt = require('jsonwebtoken')
const {uuid} = require('../config/config.default')
const {promisify} = require('util')
const toSign = promisify(jwt.sign)
const toVerify = promisify(jwt.verify)
//生成token
module.exports.createToken = async (userInfo) => {
    var token = await toSign({userInfo},uuid,{expiresIn: 60*60*24})
    return token
}
//中间件  校验token是否有效
module.exports.verifyToken = (required = true) => {//是否需要登录，默认需要
    return async (req,res,next) => {
        var token = req.headers.authorization
        token = token ? token.split('Bearer ')[1] : null
        if(token){
            try{
                var userInfo = await toVerify(token,uuid)
                req.user = userInfo //将userInfo放到req中，controller中处理逻辑时可用
                next()
            }catch(err){
                res.status(403).json({error:'token无效'})
            }
        }else if(required){
            res.status(403).json({error:'请传入token'})
        }else{
            next()
        }
    }
}