const {body} = require('express-validator')
const {User} = require('../../model/index')
const validate = require('./errorBack')
//用户注册
module.exports.register = validate([
    body('username')
    .notEmpty().withMessage('用户名不能为空').bail()
    .custom(async username => {
        const userInfo = await User.findOne({username})
        if(userInfo){
            return Promise.reject('用户名已被注册')
        }
    }),
    body('phone')
    .notEmpty().withMessage('手机号不能为空').bail()
    .custom(async phone => {
        const phoneInfo = await User.findOne({phone})
        if(phoneInfo){
            return Promise.reject('手机号已被注册')
        }
    }),
    body('email')
    .notEmpty().withMessage('邮箱不能为空').bail()
    .isEmail().withMessage('邮箱格式不正确').bail()
    .custom(async email => {
        const emailInfo = await User.findOne({email})
        if(emailInfo){
            return Promise.reject('邮箱已被注册')
        }
    }),
    body('password')
    .notEmpty().withMessage('密码不能为空').bail()
    .isLength({min:6}).withMessage('密码长度不能小于6位').bail(),
])
//用户登录
module.exports.login = validate([
    body('phone')
    .notEmpty().withMessage('手机号不能为空').bail(),
    body('password')
    .notEmpty().withMessage('密码不能为空').bail()
])
//修改用户信息
module.exports.update = validate([
    body('username')
    .custom(async username => {
        const userInfo = await User.findOne({username})
        if(userInfo){
            return Promise.reject('用户名已被注册')
        }
    }),
    body('phone')
    .custom(async phone => {
        const phoneInfo = await User.findOne({phone})
        if(phoneInfo){
            return Promise.reject('手机号已被注册')
        }
    }),
    body('email')
    .custom(async email => {
        const emailInfo = await User.findOne({email})
        if(emailInfo){
            return Promise.reject('邮箱已被注册')
        }
    }),
])