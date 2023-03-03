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
    User:mongoose.model('User',require('./userModel'))

}