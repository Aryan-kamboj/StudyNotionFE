const express = require("express");
const router = express.Router();

const {hello,signup, login, changePassword, generateOtp, authTokenCheck} = require("../controllers/authControllers");

// router.get("/hello",hello);
router.post("/signup",signup);
router.post("/login",login);
router.post("/changePass",authTokenCheck,changePassword);
router.post("/generateOTP",generateOtp);
module.exports = router;