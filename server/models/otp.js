const mongoose = require("mongoose");
const otpTemplate = require("../templets/otpTemplate");
const mailSender = require("../config/mailingService");
const OTPschema = new mongoose.Schema({
    otp:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    expiresAt:{
        type:Date,
        required:true,
    },
    attempts:{
        type:Number,
        required:true,
    }
});

const sendVerificationEmail = async (email,otp) =>{
    return (await mailSender(email,otpTemplate(otp)));
}   

OTPschema.pre("save",async function (next){
    if(this.isNew){
		console.log(await sendVerificationEmail(this.email, this.otp));
        next();
    }
})

const OTP = mongoose.model("OTP", OTPschema);
module.exports = OTP;