const express = require("express")
const router = express.Router();

const {getCart, setCart} = require("../controllers/studentController");
router.get("/getCart",getCart);
router.post("/setCart",setCart);
module.exports = router;