const express = require("express");
const { createCategory } = require("../controllers/adminController");
const router = express.Router();

router.post("/createCategory",createCategory);

module.exports = router;