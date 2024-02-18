const STUDENT = require("../models/student");
const COURSE = require("../models/course");
const REVIEW = require("../models/review");
const getCartInfo = async (array)=>{
    const cartDetails = [];
    for(const course of array){
        const {_id,courseCategory,thumbnail,instructor,reviewCount,coursePrice,courseDesc,rating,courseName} = await COURSE.findById(course,"courseCategory instructor reviewCount coursePrice courseDesc rating courseName thumbnail _id");
        cartDetails.push({
            thumbnail:thumbnail,
            _id:_id,
            courseName:courseName,
            instructor:instructor,
            courseCategory:courseCategory,
            courseDesc:courseDesc,
            coursePrice:coursePrice,
            rating:rating,
            reviewCount:reviewCount
        })
    }
    return cartDetails;
}
exports.getCart = async (req,res)=>{
    try {
        const {email,userType} = req.locals;
        if(email&&userType==="student"){
            const {cart} = await STUDENT.findOne({email:email},"cart");
            const cartDetails = await getCartInfo(cart);
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
        console.log(req.body);
        const {course} = req.body;
        const {email,userType} = req.locals;
        if(email&&userType==="student"&&course){
            const student = await STUDENT.findOne({email:email},"cart");
            if(student){
                if(!student.cart.includes(course)){
                    student.cart.unshift(course);
                    await STUDENT.findOneAndUpdate({email:email},{cart:student.cart});
                    const {cart} = await STUDENT.findOne({email:email},"cart");
                    const cartDetails = await getCartInfo(cart);
                    return res.status(200).json({
                        cart:cartDetails,
                    });
                }
                else{
                    return res.status(405).json({
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
        console.log(course);
        const {email,userType} = req.locals;
        if(email&&userType==="student"&&course){
            const student = await STUDENT.findOne({email:email},"cart");
            if(student){
                student.cart = student.cart.filter((cartCource)=>{
                    cartCource = String(cartCource)
                    return (!(course===cartCource));
                })
                console.log(student.cart);
                await STUDENT.findOneAndUpdate({email:email},{cart:student.cart});
                const {cart} = await STUDENT.findOne({email:email},"cart")
                const cartDetails = await getCartInfo(cart);
                return res.status(200).json({
                    cart:cartDetails,
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
const {razorpay_instance} = require("../config/razorpay");
const PMNT_RCPT = require("../models/payment_recipts");
const crypto  = require("crypto");
// special treatment ..... abhi rhta hai ye
exports.buyCart = async (req,res)=>{
    // try {
    //     const {course,paymentId} = req.body;
    //     const {email,userType} = req.locals;
    //     if(email&&userType==="student"){
    //         const user = await STUDENT.findOne({email:email},"enrolledCourses");
    //         const courseCheck = await COURSE.findById(course,{_id:1,coursePrice:1,isPublic:1});
    //         if(user&&courseCheck&&courseCheck.isPublic);
    //         {       
    //             const options = {
    //                 amount:(courseCheck.coursePrice)*100,
    //                 currency:"INR",
    //                 receipt: "order_rcptid_11"
    //                 //can use it to store order information internally not using it rn.
    //             }
    //             // console.log(options);
    //             const {id} = await razorpay_instance.orders.create(options);
    //             console.log(id);
    //             return res.json({
    //                 id
    //             })
    //             // "orderId": {
    //             //     "id": "order_Nb8tvZPyz6L6jg",
    //             //     "entity": "order",
    //             //     "amount": 999900,
    //             //     "amount_paid": 0,
    //             //     "amount_due": 999900,
    //             //     "currency": "INR",
    //             //     "receipt": "order_rcptid_11",
    //             //     "offer_id": null,
    //             //     "status": "created",
    //             //     "attempts": 0,
    //             //     "notes": [],
    //             //     "created_at": 1707997324
    //             // }
    //             // const enrollmentObj = {
    //             //     courseId:course,
    //             //     paymentId:paymentId,
    //             //     orderId:orderId,
    //             //     contentConsumed:[],
    //             // }
    //             console.log(user);
    //             user.enrolledCourses.push(enrollmentObj);
    //             await STUDENT.updateOne({email:email},{enrolledCourses:user.enrolledCourses});
    //             await COURSE.updateOne({_id:course},{ $inc: { enrolled: 1 }});
    //             return res.status(200).json({
    //                 message:"Course bought successfully"
    //             })
    //         }
    //         // else{
    //         //     return res.status(400).json({
    //         //         message:"There has been some error please try again ",
    //         //     })
    //         // }
    //     }
    //     else{
    //         res.status(400).json({
    //             message:"There has been some error please log in again",
    //         })
    //     }

    // } catch (error) {
    //     return res.status(500).json({
    //         error:error
    //     })
    // }
    // const {razorpay_payment_id,razorpay_order_id,} = req.body;
    // const secret = process.env.RAZORPAY_SECRET;
    // var { validatePaymentVerification, validateWebhookSignature } = require('./dist/utils/razorpay-utils');
    // console.log(validatePaymentVerification({"order_id":razorpay_order_id , "payment_id": razorpay_payment_id}, validateWebhookSignature, secret));
}
exports.createOrderId = async (req,res)=>{
    try {
        const {email} = req.locals;
        const {courseId} = req.body;
        if(!courseId||!email){
            return res.status(400).json({
                message:"All fields required"
            })
        }
        else{
            const user = await STUDENT.findOne({email:email},"enrolledCourses");
            const courseCheck = await COURSE.findById(courseId,{_id:1,coursePrice:1,isPublic:1});
            if(user.enrolledCourses.filter((course)=> course.courseId.toString() === courseId).length>0)
                return res.status(400).json({
                    message:"User already enrolled in course"
                })
            if(user&&courseCheck&&courseCheck.isPublic)
            {       
                const options = {
                    amount:(courseCheck.coursePrice)*100,
                    currency:"INR",
                    receipt: "order_rcptid_11"
                }
                const order = await razorpay_instance.orders.create(options);
                console.log(order);
                await PMNT_RCPT.create({
                    user:email,
                    courseId:courseId,
                    amount:courseCheck.coursePrice,
                    orderId:order.id,
                });
                // console.log(id);
                return res.json({
                    orderId:order.id,
                    amount:courseCheck.coursePrice*100,
                    currency:"INR",
                }) 
            }
            else{
                return res.status(400).json({
                    message:"Course does not exists"
                })
            }
    } 
    }catch (error) {
        // console.log(error)
       return res.status(500).json({
        error:error
       }) 
    }
}
exports.orderIdForMultiple = async (req,res)=>{
    try {
        const {email} = req.locals;
        const {courseIds} = req.body;
        if(!email||!courseIds||!(courseIds.length>0)){
            return res.status(400).json({
                message:"All fields required"
            })
        }
        else{
            const {enrolledCourses} = await STUDENT.findOne({email:email},"enrolledCourses");
            const enrolledCoursesIds = enrolledCourses.map((course)=>{
                return course.courseId.toString()
            });
            const cources = [] ;
            for(const courseId of courseIds){
                if(enrolledCoursesIds.includes(courseId)){
                    return res.status(400).json({
                        message:"A course in your cart is already baught by you"
                    })
                }
                else
                cources.push(await COURSE.findById(courseId,"coursePrice isPublic courseName"));
            }
            let totalAmount = 0;
            cources.map((course)=>{
                if(!(course.isPublic))
                {
                    return res.status(400).json({
                        message:`The course ${course.courseName} does not exist please remove it from cart and try again`
                    })
                }
                else{
                    totalAmount+=(course.coursePrice*100)
                }
            })
            const options = {
                amount:totalAmount,
                currency:"INR",
                receipt: "order_rcptid_11"
            } 
            const order = await razorpay_instance.orders.create(options);
            //  {
            //  id: 'order_NcFMxCDldvbQYN',
            //  entity: 'order',
            //  amount: 999900,
            //  amount_paid: 0,
            //  amount_due: 999900,
            //  currency: 'INR',
            //  receipt: 'order_rcptid_11',
            //  offer_id: null,
            //  status: 'created',
            //  attempts: 0,
            //  notes: [],
            //  created_at: 1708238442
            // }
            for(const course of cources){
                // console.log(course);
                await PMNT_RCPT.create({
                    user:email,
                    courseId:course._id,
                    amount:course.coursePrice,
                    orderId:order.id,
                })
            }
            return res.status(200).json({
                orderId:order.id,
                amount:order.amount
            })
// await PMNT_RCPT.updateMany()
        }
    } catch (error) {
        return res.status(500).json({
            error:error 
        })
    }
}
exports.validatePayment = async(req,res)=>{
    try {
        const {email} = req.locals;
        const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;
        if(!email||!razorpay_order_id||!razorpay_payment_id||!razorpay_signature){
            return res.status(400).json({
                message:"All fields required"
            })
        }
        else{
            // pay_NbpyKkgmxHMBvd order_Nbpy4E8dXqUXqV 6b0589a05e35f48ba2357255b45d4342fd3873f8ef8c6f2cb21d00972f2bb2fc
            
            // we are pushing the course id that corresponds toh the order id
            // yes we could have easily got the course id form the client but that is risky as the client can send us 
            // the payment validation tokens of other course and id of a different course to so its a way to confirm that 
            // payment has been made for the same course that the user is requesting access to 
            const courseArr = await PMNT_RCPT.find({orderId:razorpay_order_id},"courseId");
            const razorpay_secret = process.env.RAZORPAY_SECRET;
            const generatedSignature = crypto.createHmac('sha256',razorpay_secret).update(razorpay_order_id+"|"+razorpay_payment_id).digest("hex");
            if(generatedSignature===razorpay_signature){
                // for buying single course
                let enrollmentObj;
                if(courseArr.length===1){
                    enrollmentObj = [{
                        courseId:courseArr[0].courseId,
                        contentWatched:[],
                        paymentId:razorpay_payment_id
                    }]
                    // console.log(enrollmentObj);
                    await PMNT_RCPT.findOneAndUpdate({orderId:razorpay_order_id},{paymentCompletedAt:Date.now(),paymentId:razorpay_payment_id,paymentVerification:razorpay_signature},{new:true});
                }
                // for buying through cart ie multiple cources in the same razorpay order id
                else if(courseArr.length>1){
                    enrollmentObj = courseArr.map((course)=>{
                        return {
                            courseId:course.courseId,
                            contentWatched:[],
                            paymentId:razorpay_payment_id
                        }
                    })
                    await PMNT_RCPT.updateMany({orderId:razorpay_order_id},{paymentCompletedAt:Date.now(),paymentId:razorpay_payment_id,paymentVerification:razorpay_signature});
                }
                else{
                    return res.status(400).json({
                        message:"Could not find the order id"
                    })
                }
                const {enrolledCourses} = await STUDENT.findOneAndUpdate({email:email},{$push:{enrolledCourses:{$each:enrollmentObj}}},{new:true},"enrolledCourses");
                    const enrolledIn = [];
                    for(const course of courseArr){
                        await COURSE.updateOne({_id:course.courseId},{$inc:{enrolled:1}});
                    }
                    for(const course of enrolledCourses){
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
                        console.log("total ",totalLectures," ,, length consumed ",lengthConsumed);
                        const progress = Math.floor((lengthConsumed/totalLectures)*100);
                        enrolledIn.push({
                            courseName:courseName,
                            thumbnail:thumbnail,
                            desc:courseDesc,
                            courseId:_id,
                            duration:duration,
                            progress:progress,
                            contentConsumed:course.contentConsumed,
                            totalLectures:totalLectures,
                        })
                    }
                    await STUDENT.updateOne({email:email},{cart:[]});
                    return res.status(200).json({
                        enrolledCources:enrolledIn
                    })
                }
            else{
                return res.status(400).json({
                    message:"The signatures do not match"
                })
            }
        }
        //    {
        //      razorpay_payment_id: 'pay_NbaOoDHpCAXX9h',
        //      razorpay_order_id: 'order_NbaOPWd8QbXwct',
        //      razorpay_signature: '7b87ae4a6b420030b5fefb459e4e27b196f3c7d9a02091e03a2a3b405349b3e1'
        //    }
    } catch (error) {
        return res.status(500).json({
            error:error
        })
    }
}
exports.contentWatched = async (req,res)=>{
    try {
        const {email,userType} = req.locals;
        const {courseId,contentId} = req.body;
        if(email&&userType==="student"&&courseId&&contentId){
            const student = await STUDENT.findOne({email:email},"enrolledCourses");
            const courseIdx = student.enrolledCourses.findIndex((course)=>{
                const id = String(course.courseId)
                // console.log(id , courseId);
                return (id === courseId)
            });
            student.enrolledCourses[courseIdx].contentConsumed.push(contentId);
            const {enrolledCourses} = await STUDENT.findOneAndUpdate({email:email},{enrolledCourses:student.enrolledCourses},{new:true},"enrolledCourses");
            return res.status(200).json(enrolledCourses[courseIdx]?.contentConsumed);
            // return res.status(200).json(enrolledCourses[courseIdx]);
        }
    } catch (error) {
        return res.status(500).json({
            error:error
        })
    }
}
exports.enrolledCourses = async (req,res) =>{
    try {
        const {email,userType} = req.locals;
        if(email&&userType==="student"&&userType){
            const {enrolledCourses} = await STUDENT.findOne({email:email},"enrolledCourses");
            const enrolledIn = [];
            if(enrolledCourses){
                for(const course of enrolledCourses){
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
                        progress:progress,
                        contentConsumed:course.contentConsumed,
                        totalLectures:totalLectures,
                    })
                }
            }
            return res.status(200).json({
                enrolledCourses:enrolledIn
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
exports.getCategory = async (req,res)=>{
    const {category} = req.body;
    const cources = await COURSE.find({courseCategory:category});
    return res.status(200).json({
        cources:cources
    })
}