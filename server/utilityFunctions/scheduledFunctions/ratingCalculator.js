const COURSE = require("../../models/course");
const REVIEW = require("../../models/review");

exports.ratingCalc = async ()=>{
    try {
        const allCoursesIds = await COURSE.find({},{_id:1});
        const courseRatingInfo = [];
        for(const course of allCoursesIds){
            const res = await REVIEW.aggregate([
                {$match:{course:course._id}},
                {$group:{_id:course._id,ratingSum:{$sum:"$rating"},reviewCount:{$sum:1}}},
            ]).exec();
            courseRatingInfo.push(res[0]);
        }
        // if(null)
        for(const course of courseRatingInfo){
            console.log(course.reviewCount);
            const res = await COURSE.updateOne({_id:course._id},{rating:course.ratingSum/course.reviewCount,reviewCount:course.reviewCount});
            console.log(res)
        }
    } catch (error) {
        console.error(error);
    }
}

