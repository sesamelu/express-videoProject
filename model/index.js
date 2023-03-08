//model模块主要用来配置MongoDB数据库以及Redis
const {mongopath} = require('../config/config.default')
//使用mongoose链接MongoDB
const mongoose = require('mongoose')
const main = async () => {
    await mongoose.connect(mongopath)
}
main().then((res) => {
    console.log('mongo链接成功')
}).catch((err) => {
    console.log('mongo链接失败',err)
})

module.exports = {
    User:mongoose.model('Myuser',require('./userModel')),
    Subscribe:mongoose.model('Mysubscribe',require('./subscribeModel')),
    Video:mongoose.model('Myvideo',require('./videoModel')),
    Comment:mongoose.model('Mycomment',require('./videoCommentModel'))
}