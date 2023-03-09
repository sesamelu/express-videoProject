const mongoose = require('mongoose')
const baseModel = require('./baseModel')
const collectSchame = mongoose.Schema({
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
module.exports = collectSchame