const express = require("express");
const router = express.Router();

const {createCourse,addSection,removeSection,addLecture,removeLecture,saveCourse,myCourses, setPublic, updateCourse, editLecture, editSectionName, deleteCourse} = require("../controllers/insturctorControllers");

router.post("/createCourse",createCourse);
router.post("/deleteCourse",deleteCourse);
router.post("/updateCourse",updateCourse);
router.post("/addSection",addSection);
router.post("/editSectionName",editSectionName);
router.post("/removeSection",removeSection);
router.post("/addLecture",addLecture);
router.post("/editLecture",editLecture);
router.post("/removeLecture",removeLecture);
router.post("/saveCourse",saveCourse);
router.post("/setPublic",setPublic);
router.get("/myCourses",myCourses);

module.exports = router;