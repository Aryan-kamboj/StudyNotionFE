const express = require("express");
const router = express.Router();

const {createCourse,addSection,removeSection,addLecture,removeLecture,saveCourse,myCources, setPublic, updateCourse} = require("../controllers/insturctorControllers");

router.post("/createCourse",createCourse);
router.post("/updateCourse",updateCourse);
router.post("/addSection",addSection);
router.post("/removeSection",removeSection);
router.post("/addLecture",addLecture);
router.post("/removeLecture",removeLecture);
router.post("/saveCourse",saveCourse);
router.post("/setPublic",setPublic);
router.get("/myCources",myCources);

module.exports = router;