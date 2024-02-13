const express = require("express");
const { getCategories, getCategoryData, getCourse, contactUs } = require("../controllers/openControllers");
const router = express.Router();

router.get("/getCategories",getCategories);
router.get("/getCategoryData",getCategoryData);
router.get("/getCourse",getCourse);
router.post("/contactUs",contactUs)
module.exports = router;