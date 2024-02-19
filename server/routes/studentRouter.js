const express = require("express")
const router = express.Router();

const {getCart, addToCart, removeFromCart,contentWatched,enrolledCourses,createReview, createOrderId, validatePayment, buyCart, orderIdForMultiple} = require("../controllers/studentController");
router.get("/getCart",getCart);
router.post("/addToCart",addToCart);
router.post("/removeFromCart",removeFromCart);
router.post("/orderIdForMultiple",orderIdForMultiple);
// router.post("/buyCart",buyCart);
router.post("/createOrderId",createOrderId);
router.post("/validatePayment",validatePayment)
router.post("/contentWatched",contentWatched);
router.get("/enrolledCources",enrolledCourses);
router.post("/createReview",createReview);
module.exports = router;