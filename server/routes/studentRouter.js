const express = require("express")
const router = express.Router();

const {getCart, addToCart, removeFromCart,buyCourse,contentWatched} = require("../controllers/studentController");
router.get("/getCart",getCart);
router.post("/addToCart",addToCart);
router.post("/removeFromCart",removeFromCart);
router.post("/buy",buyCourse);
router.post("/contentWatched",contentWatched);
module.exports = router;