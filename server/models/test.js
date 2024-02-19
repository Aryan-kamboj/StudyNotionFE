const mongoose = require("mongoose");
const test = new mongoose.Schema({
    testField:{
        type:String,
        required:true
    },
    testField2:{
        type:String,
        required:true
    },
    testArr:[{
        type:String,
        required:true
    }]
})
const TEST = mongoose.model("TEST",test);
module.exports = TEST;