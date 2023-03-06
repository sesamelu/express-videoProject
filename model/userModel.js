const mongoose = require('mongoose')
const baseModel = require('./baseModel')
const md5 = require('../util/md5')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        set:(val) => md5(val),
        select:false,//查询时不返回该字段
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    ...baseModel
})
module.exports = userSchema