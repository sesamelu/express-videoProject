const mongoose = require('mongoose')
const baseModel = require('./baseModel')

const videoSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    vodvideoId:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.ObjectId,
        required:true,
        ref:'Myuser'
    },
    commentCount:{
        type:Number,
        default:0,
    },
    likeCount:{
        type:Number,
        default:0,
    },
    dislikeCount:{
        type:Number,
        default:0,
    },
    ...baseModel
})
module.exports = videoSchema