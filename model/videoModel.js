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
    ...baseModel
})
module.exports = videoSchema