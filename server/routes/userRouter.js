const express = require("express");
const router = express.Router();

const { forgotPassword,newPassword } = require("../controllers/authControllers");
const {myProfile,updateProfile,deleteAccount, changeProfilePhoto} = require("../controllers/userControllers");
router.post("/forgotPassword",forgotPassword);
router.post("/newPassword/:token",newPassword);
router.get("/myProfile",myProfile);
router.post("/changeDP",changeProfilePhoto);
router.post("/updateProfile",updateProfile);
router.get("/deleteAccount",deleteAccount);
module.exports = router;