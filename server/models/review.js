const mongoose = require("mongoose");
 
const reviewSchema = new mongoose.Schema({
    review:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"COURSE",
        requires:true
    },
    user:{
        type:String,
        required:true
    }
})

const REVIEW = mongoose.model("REVIEW", reviewSchema);
module.exports = REVIEW;