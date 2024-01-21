const express = require("express");
const router = express.Router();

const { forgotPassword,newPassword, authTokenCheck } = require("../controllers/authControllers");
const {myProfile,updateProfile,deleteAccount, changeProfilePhoto} = require("../controllers/userControllers");
const { getCourseInfo } = require("../controllers/generalController");
router.post("/forgotPassword",forgotPassword);
router.post("/newPassword/:token",newPassword);
router.post("/getCourseInfo",authTokenCheck,getCourseInfo);
router.get("/myProfile",myProfile);
router.post("/changeDP",changeProfilePhoto);
router.post("/updateProfile",updateProfile);
router.get("/deleteAccount",deleteAccount);
module.exports = router;