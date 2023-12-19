const razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config();
exports.instance = new razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET 
})