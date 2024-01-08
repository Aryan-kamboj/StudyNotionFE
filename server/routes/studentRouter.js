const express = require("express")
const router = express.Router();

const {getCart, addToCart, removeFromCart,buyCourse,contentWatched,enrolledCources,createReview} = require("../controllers/studentController");
router.get("/getCart",getCart);
router.post("/addToCart",addToCart);
router.post("/removeFromCart",removeFromCart);
router.post("/buy",buyCourse);
router.post("/contentWatched",contentWatched);
router.get("/enrolledCources",enrolledCources);
router.post("/createReview",createReview);
module.exports = router;