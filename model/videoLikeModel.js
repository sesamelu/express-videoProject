const mongoose = require('mongoose')
const baseModel = require('./baseModel')
const likeSchame = mongoose.Schema({
    like:{
        type:Number,
        enum:[1,-1],
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
module.exports = likeSchame