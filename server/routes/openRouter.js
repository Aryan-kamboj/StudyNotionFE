const express = require("express");
const { getCategories, getCategoryData, getCourse } = require("../controllers/openControllers");
const router = express.Router();

router.get("/getCategories",getCategories);
router.get("/getCategoryData",getCategoryData);
router.get("/getCourse",getCourse);
module.exports = router;