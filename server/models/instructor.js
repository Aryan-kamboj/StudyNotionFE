const mongoose = require("mongoose");
const instructorSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    myCources:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"COURSE",
        }
    ]
})

const INSTRUCTOR = mongoose.model("INSTRUCTOR",instructorSchema);
module.exports=INSTRUCTOR;