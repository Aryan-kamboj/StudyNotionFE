const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    phoneNo:{
        type:String,
        required:true,
    },
    fname:{
        type:String,
        require:true,
    },
    lname:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    resetPasswordToken:{
        type:Number
    },
    userType:{
        type:String,
        required:true
    },
    bio:{
        type:String
    },
    DOB:{
        type:Date
    },
    profilePhoto:{
        type:String
    },
    gender:{
        type:String
    },
})

const USER = mongoose.model("USER",userSchema);

module.exports = USER;