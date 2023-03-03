const { Schema } = require("mongoose");

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    }
})
module.exports = userSchema