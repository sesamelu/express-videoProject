const mongoose = require('mongoose')
const baseModel = require('./baseModel')
const md5 = require('../util/md5')

const subscribeSchema = mongoose.Schema({
    user:{
        type:mongoose.ObjectId,
        require:true,
        ref:'Myuser'
    },
    channel:{
        type:mongoose.ObjectId,
        require:true,
        ref:'Myuser'
    },
    ...baseModel
})
module.exports = subscribeSchema