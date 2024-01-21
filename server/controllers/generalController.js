const COURSE = require("../models/course");

exports.getCourseInfo = async (req,res)=>{
    try {
        const {course} = req.body;
        if(course){
            const details = await COURSE.findById(course);
            if(details){
                return res.status(200).json(details);
            }
            else
                throw new Error({code:500,message:"Could not find the details"});
        }
        else
            throw new Error ({
                code:400,
                message:"Course id required",
            });
    } catch (error) {
        return res.status(error.code).json({
            message:error.message,
        })
    }
}