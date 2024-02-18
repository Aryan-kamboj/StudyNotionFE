const mongoose = require("mongoose");
const rcpt = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    paymentInitiatedAt:{
        type:Date,
        default:Date.now()
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    orderId:{
        type:String
    },
    amount:{
        type:Number,
        required:true
    },
    paymentCompletedAt:{
        type:Date
    },
    paymentId:{
        type:String
    },
    paymentVerification:{
        type:String
    }
})
const PMNT_RCPT = mongoose.model("PMNT_RCPT",rcpt);
module.exports = PMNT_RCPT;