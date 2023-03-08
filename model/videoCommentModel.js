const mongoose = require('mongoose')
const baseModel = require('./baseModel')
const commentSchame = mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    video:{
        type:mongoose.ObjectId,
        required:true,
        ref:'Myvideo'
    },
    user:{
        type:mongoose.ObjectId,
        required:true,
        ref:'Myuser'
    },
    ...baseModel
})
module.exports = commentSchame