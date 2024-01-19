const CATEGORIES = require("../models/categories");
const COURSE = require("../models/course");
exports.getCategories = async (req,res)=>{
    try {
        const categories = await CATEGORIES.find({},{_id:0,__v:0}) ;
        return res.status(200).json({
            categories:categories
        })
    } catch (error) {
        return res.status(500).json({
            error:error
        })
    }
}
exports.getCourse = async (req,res)=>{
    try {
        const {course} = req.query;
        // console.log(req);
        // const {instructor,courseName,courseDesc,coursePrice,tags,thumbnail,benifits,requirements,sections,isPublic,createdAt,rating,reviewCount,enrolled}
        const courseDetails
        = await COURSE.findById(course).select({
            "instructor.fullName":1,
            "instructor.profilePhoto":1,
            "courseName":1,
            "courseDesc":1,
            "coursePrice":1,
            "tags":1,
            "thumbnail":1,
            "benifits":1,
            "requirements":1,
            "sections.sectionName":1,
            "sections.lectures.lectureTitle":1,
            "sections.lectures.length":1,
            "isPublic":1,
            "createdAt":1,
            "rating":1,
            "reviewCount":1,
            "enrolled":1,
            "_id":0
        });
        console.log(courseDetails);
        return res.status(200).json({
            courseDetails:courseDetails
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error:error
        })
    }
}
exports.getCategoryData = async (req,res)=>{
    try {
        const {category} = req.query;
        console.log(category);
        const categories = await CATEGORIES.find({});
        // console.log(categories);
        const data = await COURSE.find({courseCategory:category},"thumbnail courseName coursePrice rating reviewCount");
        let randomCategory = categories[Math.floor(Math.random()*1000)%categories.length].categoryName;
        while(randomCategory===category){
            randomCategory = categories[Math.floor(Math.random()*1000)%categories.length].categoryName;
        }
        const randomCatData = await COURSE.find({courseCategory:randomCategory},"thumbnail courseName price rating reviewCount courseCategory");
        return res.status(200).json({
            data:data,
            randomData:randomCatData,
        })
    } catch (error) {
        return res.status(500).json({
            error:error
        })
    }
}