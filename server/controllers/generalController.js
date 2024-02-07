const INSTRUCTOR = require("../models/instructor")
const COURSE = require("../models/course");
const STUDENT = require("../models/student");
exports.getCourseInfo = async (req,res)=>{
    try {
        const {email,userType} = req.locals;
        const {course} = req.body;
        if(course&&email&&userType)
        {
            if(userType==="instructor"){
                const instructor = await INSTRUCTOR.findOne({email:email});
                const myCourses = instructor.myCourses?.map((course)=>{
                    return course.toString();
                })
                console.log("hellouuuu")
                if(myCourses.includes(course)){
                    const details = await COURSE.findById(course,"thumbnail courseName courseDesc coursePrice tags benifits requirements sections isPublic courseCategory");
                    if(details){
                        return res.status(200).json(details);
                    }
                    else
                        throw new Error("Could not find the details");
                }
                else return res.status(400).json({
                    message:"You don't have access to this course's details"
                })
            }
            else if(userType==="student"){
                const student = await STUDENT.findOne({email:email});
                const enrolledCourses = student.enrolledCourses?.map((course)=>{
                    return course.courseId.toString();
                })
                if(enrolledCourses.includes(course)){
                    const details = await COURSE.findById(course,"courseName sections")
                    return res.status(200).json({
                        details
                    });
                }
            }
        }
        else
            throw new Error ({
                code:400,
                message:"Course id required",
            });
    } catch (error) {
        return res.status(500).json({
            message:error,
        })
    }
}