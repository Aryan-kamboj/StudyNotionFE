const STUDENT = require("../models/student");
exports.getCart = async (req,res)=>{
    try {
        const {email,userType} = req.locals;
        if(email&&userType==="student"){
            const student = await STUDENT.findOne({email:email});
            return res.status(200).json({
                cart:student.cart,
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
            const student = await STUDENT.findOne({email:email});
            if(student){
                if(!student.cart.includes(course)){
                    student.cart.unshift(course);
                    await STUDENT.findOneAndUpdate({email:email},{cart:student.cart});
                    const studentUpdated = await STUDENT.findOne({email:email});
                    console.log(studentUpdated.cart);
                    return res.status(200).json({
                        cart:studentUpdated.cart,
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
            const student = await STUDENT.findOne({email:email});
            if(student){
                student.cart = student.cart.filter((cartCource)=>{
                    return (!course===cartCource);
                })
                await STUDENT.findOneAndUpdate({email:email},{cart:student.cart});
                const studentUpdated = await STUDENT.findOne({email:email})
                console.log(studentUpdated);
                return res.status(200).json({
                    cart:studentUpdated.cart,
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
            const user = await STUDENT.findOne({email:email});
            const courseIdx = user.enrolledCources.findIndex((course)=>{return course.courseId == courseId});
            user.enrolledCources[courseIdx].contentConsumed.push(contentId);
            await STUDENT.findOneAndReplace({email:email},user);
            const newUser = await STUDENT.findOne({email:email})
            return res.status(200).json(newUser);
        }
    } catch (error) {
        return res.status(500).json({
            error:error
        })
    }
}
