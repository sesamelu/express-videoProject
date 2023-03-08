const {body} = require('express-validator')
const validate = require('./errorBack')
module.exports.createVideo = validate([
    body('vodvideoId')
    .notEmpty().withMessage('vodvideoId不能为空').bail(),
    body('title')
    .notEmpty().withMessage('视频标题不能为空').bail()
])