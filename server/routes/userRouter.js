const express = require("express");
const router = express.Router();

const { forgotPassword,newPassword } = require("../controllers/authControllers");
router.post("/forgotPassword",forgotPassword);
router.post("/newPassword/:token",newPassword);
module.exports = router;