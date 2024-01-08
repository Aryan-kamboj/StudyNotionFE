const STUDENT = require("../models/student");
const COURSE = require("../models/course");
const REVIEW = require("../models/review")
exports.getCart = async (req,res)=>{
    try {
        const {email,userType} = req.locals;
        if(email&&userType==="student"){
            const {cart} = await STUDENT.findOne({email:email},"cart");
            const cartDetails = [];
            for(const course of cart){
                const {courseCatagory,reviewCount,coursePrice,courseDesc,rating} = await COURSE.findById(course);
                cartDetails.push({
                    courseCatagory:courseCatagory,
                    courseDesc:courseDesc,
                    coursePrice:coursePrice,
                    rating:rating,
                    reviewCount:reviewCount
                })
            }
            return res.status(200).json({
                cart:cartDetails,
            });
        }
        else if(userType==="instructor"){
            throw("You are an instructor you cant buy a course");
        }
        else{
            throw("There was some error please log in again ");
        }
        
    } catch (error) {
        return res.status(500).json({
            error:error
        })
    }
}
exports.addToCart = async (req,res)=>{
    try {
        const {course} = req.body;
        const {email,userType} = req.locals;
        if(email&&userType==="student"&&course){
            const student = await STUDENT.findOne({email:email},"cart");
            if(student){
                if(!student.cart.includes(course)){
                    student.cart.unshift(course);
                    await STUDENT.findOneAndUpdate({email:email},{cart:student.cart});
                    const {cart} = await STUDENT.findOne({email:email},"cart");
                    console.log(cart);
                    return res.status(200).json({
                        cart:cart,
                    });
                }
                else{
                    res.status(400).json({
                        message:"Course already added to cart"
                    })
                }
            }
        }
        else if(userType==="instructor"){
            throw("An instructor can't buy a course");
        }
        else{
            throw(`${email?course?"":"There has been some error please try again ":"There has been some error please log in again"}`);
        }
    } catch (error) {
        res.status(500).json({
            error:error
        })
    }
}
exports.removeFromCart = async (req,res)=>{
    try {
        const {course} = req.body;
        const {email,userType} = req.locals;
        if(email&&userType==="student"&&course){
            const student = await STUDENT.findOne({email:email},"cart");
            if(student){
                student.cart = student.cart.filter((cartCource)=>{
                    cartCource = String(cartCource)
                    // console.log("cartCourse => "+typeof cartCource + " course => "+typeof course);
                    return (!(course===cartCource));
                })
                console.log(student.cart);
                await STUDENT.findOneAndUpdate({email:email},{cart:student.cart});
                const {cart} = await STUDENT.findOne({email:email},"cart")
                // console.log(studentUpdated);
                return res.status(200).json({
                    cart:cart,
                });
            }
        }
        else if(userType==="instructor"){
            throw("An instructor can't buy a course");
        }
        else{
            throw(`${email?course?"":"There has been some error please try again ":"There has been some error please log in again"}`);
        }
    } catch (error) {
        res.status(500).json({
            error:error
        })
    }
}

// gonna work on it later so right now directly leting them enroll 
const razorpayInstance = require("../config/razorpay");
// special treatment ..... abhi rhta hai ye
exports.buyCourse = async (req,res)=>{
    try {
        const {course,paymentId,orderId} = req.body;
        const {email,userType} = req.locals;
        if(email&&userType==="student"){
            const user = await STUDENT.findOne({email:email});
            if(user)
            {       
                const enrollmentObj = {
                    courseId:course,
                    paymentId:paymentId,
                    orderId:orderId,
                    contentConsumed:[],
                }
                user.enrolledCources.push(enrollmentObj);
                await STUDENT.updateOne({email:email},{enrolledCources:user.enrolledCources});
                return res.status(200).json({
                    message:"Course bought successfully"
                })
            }
            else{
                return res.status(400).json({
                    message:"There has been some error please try again ",
                })
            }
        }
        else{
            res.status(400).json({
                message:"There has been some error please log in again",
            })
        }

    } catch (error) {
        return res.status(500).json({
            error:error
        })
    }
    // const {razorpay_payment_id,razorpay_order_id,} = req.body;
    // const secret = process.env.RAZORPAY_SECRET;
    // var { validatePaymentVerification, validateWebhookSignature } = require('./dist/utils/razorpay-utils');
    // console.log(validatePaymentVerification({"order_id":razorpay_order_id , "payment_id": razorpay_payment_id}, validateWebhookSignature, secret));
}
exports.contentWatched = async (req,res)=>{
    try {
        const {email,userType} = req.locals;
        const {courseId,contentId} = req.body;
        if(email&&userType==="student"&&courseId&&contentId){
            const student = await STUDENT.findOne({email:email},"enrolledCources");
            const courseIdx = student.enrolledCources.findIndex((course)=>{
                const id = String(course.courseId)
                console.log(id , courseId);
                return (id === courseId)
            });
            student.enrolledCources[courseIdx].contentConsumed.push(contentId);
            await STUDENT.findOneAndUpdate({email:email},{enrolledCources:student.enrolledCources});
            const {enrolledCources} = await STUDENT.findOne({email:email},"enrolledCources")
            return res.status(200).json(enrolledCources[courseIdx]);
        }
    } catch (error) {
        return res.status(500).json({
            error:error
        })
    }
}
exports.enrolledCources = async (req,res) =>{
    try {
        const {email,userType} = req.locals;
        if(email&&userType==="student"&&userType){
            const {enrolledCources} = await STUDENT.findOne({email:email});
            const enrolledIn = [];
            for(const course of enrolledCources){
                const {courseName,thumbnail,courseDesc,sections,_id} = await COURSE.findById(course.courseId,"courseName thumbnail courseDesc sections ");
                const duration = sections.reduce((acc,section)=>{
                    return acc+section.lectures.reduce((accLec,lecture)=>{
                        return accLec+lecture.length;
                    },0);
                },0);
                const totalLectures = sections.reduce((acc,section)=>{
                    return acc+section.lectures.length;
                },0);
                const lengthConsumed = course.contentConsumed.length;
                const progress = Math.floor((lengthConsumed/totalLectures)*100);
                enrolledIn.push({
                    courseName:courseName,
                    thumbnail:thumbnail,
                    desc:courseDesc,
                    courseId:_id,
                    duration:duration,
                    progress:progress
                })
            }
            return res.status(200).json({
                enrolledCources:enrolledIn
            })
        }
        else{
            return res.status(400).json({
                message:"All fields required"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error:error
        })
    }
}
exports.createReview = async (req,res) =>{
    try { 
        const {email,userType} = req.locals;
        const {review,rating,course} = req.body;
        if(review&&rating&&course&&email&&userType==="student"){
            const {enrolledCourses} = await STUDENT.findOne({email:email},"enrolledCourses.courseId");
            // checking if the user is enrolled in the course they are creating a review in
            if(enrolledCourses.reduce((acc,enrolledCourse)=>{
                if(course===enrolledCourse.courseId.toString())return acc+1 
            },0)){
                const newReview = await REVIEW.create({
                    review:review,
                    rating:rating,
                    user:email,
                    course:course
                });
                // console.log(newReview);
                if(newReview)
                return res.status(200).json({
                    message:"Review created succesfully"
                })
                else
                throw("There has been some error in creating the review try again");
            }
            else{
                return res.status(400).json({
                    message:"You don't have access to this course"
                });
            }
        }
        else{
            return res.status(400).json({
                message:"All fields required"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error:error
        })
    }
}