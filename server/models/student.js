const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    enrolledCources:[
        {
            courseId:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"Course",
            },
            contentConsumed:[
                {
                    type:String,
                    required:true,
                }
            ],
            orderId:{
                type:String,
                required:true
            },
            paymentId:{
                type:String,
                required:true,
            }
        }
    ],
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Course"
        }
    ],
})

const STUDENT = mongoose.model("STUDENT",studentSchema);

module.exports = STUDENT;