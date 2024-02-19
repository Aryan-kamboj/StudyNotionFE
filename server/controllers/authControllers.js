const OTP = require("../models/otp");
const USER = require("../models/user");
const STUDENT = require("../models/student");
const INSTRUCTOR = require("../models/instructor");
const TEST = require("../models/test");
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const otpBuilder = require("../utilityFunctions/otpBuilder");
const mailSender = require("../config/mailingService");
const forgotPassword = require("../templets/forgotPassword")
dotenv.config();
exports.authTokenCheck = async (req,res,next)=>{
    try {
        const {login} = req.cookies;
        // console.log(req.cookies);
        if(login){
            const verify = jwt.verify(login,process.env.JWT_SECRET);
            const {email,userType} = verify;
            const check = await USER.findOne({email:email},"userType");
            // console.log(check.userType,verify)
            if(check.userType===userType){
                req.locals = {email,userType}
            }
            else{
                throw ("There has been some error please log in again ");
            }
            // console.log("token check ho gya bhai")
        }
        next();
    } catch (error) {
        res.clearCookie("login");
        res.status(403).json({
            message:"Login expired please log in again",
        });
    }
}
exports.signup = async (req,res)=>{
    try{
        const {email,fname,lname,phoneNo,countryCode,password,cnfPassword,otp,userType}=req.body;

        // all fields avilable
        if(!email||!fname||!lname||!phoneNo||!password||!otp||!userType||!countryCode){
            console.log(email,fname,lname,phoneNo,countryCode,password,cnfPassword,otp,userType)
            return res.status(403).json({
                success:false,
                message:"All fields required",
            })
        }

        // password and cnfPass match
        if(password!==cnfPassword){
            return res.status(403).json({
                success:false,
                message:"Password and confirm passwords do not match",
            })
        }

        // check if email already registered
        const checkAlreadyUser = await USER.findOne({email:email},{_id:1});
        if(checkAlreadyUser!==null){
            return res.status(403).json({
                success:false,
                message:"Email already registered",
            })
        }
        else{ 

            // check if otp generated
            const query = await OTP.findOne({email:email});
            if(query!=null){

                // check if otp is valid 
                if(query.attempts>0&&query.expiresAt>Date.now()){
                    if(query.otp===otp){
                        console.log(process.env.SALT_ROUNDS);
                        // await OTP.deleteMany({email:email});
                        const saltRounds  = Number(process.env.SALT_ROUNDS);
                        const hashedPass = await bcrypt.hash(password,saltRounds);

                        const newUser = {
                            email:email,
                            phoneNo:phoneNo,
                            countryCode:countryCode,
                            fname:fname,
                            lname:lname,
                            password:hashedPass,
                            userType:userType,
                            bio:"",
                            DOB:null,
                            profilePhoto:"",
                            gender:"",
                            resetPasswordToken:0,
                        }
                        let newUserEntry = null;
                        newUserEntry = await USER.create(newUser);
                        let newEntry = null;
                        console.log(userType);
                        if(userType==="student"){
                            const newStudent = {
                                email:email,
                                enrolledCourses:[],
                                cart:[]
                            };
                            newEntry = await STUDENT.create(newStudent);
                        }
    
                        if(userType==="instructor"){
                            const newInstructor = {
                                email:email,
                                myCources:[]
                            }
                            newEntry = await INSTRUCTOR.create(newInstructor);
                        }
                        if(userType==="admin"){
                            newEntry = true;
                        }
                        if(newEntry === null||newUserEntry === null){
                            await USER.findOneAndDelete({email:email});
                            await STUDENT.findOneAndDelete({email:email});
                            await INSTRUCTOR.findOneAndDelete({email:email});
                            throw("There has been some error in creating user");
                        }
                        else{
                            return res.status(200).json({
                                message:"Sign up successful"
                            });
                        }
                    }
                    else{
                        await OTP.updateOne({email:email},{attempts:(query.attempts-1)});
                        return res.status(401).json({
                            message:"Wrong otp Entered"
                        })
                    }
                }
                else{
                    await OTP.deleteOne({email:email});
                    return res.status(401).json({
                        message:"OTP expired please make a new one"
                    })
                }
            }
            else{
                // eslint-disable-next-line no-throw-literal
                throw("No otp found for the email");
            }
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message:error
        })
    }
}
exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        // console.log(req.locals);
        if(!email||!password){
            return res.status(403).json({
                message:"All fields required"
            })
        }
        else{
            const user = await USER.findOne({email:email},{_id:1,password:1,userType:1});
            const check = await bcrypt.compare(password,user.password);
            if(check){
                const jwtSecret = process.env.JWT_SECRET;
                const login = {
                    email:email,
                    userType:user.userType,
                }
                let token;
                if(user.userType==="admin"){
                    token = jwt.sign(login,jwtSecret,{expiresIn:15000*60});    
                }
                else{token = jwt.sign(login,jwtSecret,{expiresIn:"7d"});}
                return res.cookie("login",token,{
                    httpOnly: false, secure: true, sameSite: 'None'
                }).status(200).json({
                    user:user.userType,
                    token:token,
                    message:"Login successfull"
                });
            }
            else{
                res.status(401).json({
                    message:"Wrong password or Email"
                })
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:error
        })
    }
}
exports.forgotPassword = async (req,res)=>{
    try {
        const {email} = req.body;
        if(email){
            const user = await USER.findOne({email:email},"fname lname resetPasswordToken");
            if(user){
                const name = user.fname+" "+user.lname;
                const secret = process.env.JWT_SECRET;
                const payload = {
                    email:email,
                    tokenNo:user.resetPasswordToken
                }
                const token = jwt.sign(payload,secret,{expiresIn:"5d"})
                const link = `https://studynotionkamboj.netlify.app/newPassword/${token}`;
                const mailContent = forgotPassword(email,name,link);
                await mailSender(email,mailContent);
            }
            res.status(200).json({
                success:true,
                message:"Email sent succesfuly"
            })
            
        }
    } catch (error) {
        res.status(500).json({
            error:error
        })
    }
    
}
exports.newPassword = async (req,res)=>{
    try {
        const {password,cnfPassword} = req.body;
        const {token} = req.params;
        if(token&&password===cnfPassword&&password){
            const verify = jwt.verify(token,process.env.JWT_SECRET);
            if(verify){
                const {email,tokenNo} = verify;
                const user = await USER.findOne({email:email},"resetPasswordToken");
                if(user.resetPasswordToken === tokenNo){
                    const saltRounds  = Number(process.env.SALT_ROUNDS);
                    const hash = await bcrypt.hash(password,saltRounds);
                    await USER.findOneAndUpdate({email:email},{password:hash,resetPasswordToken:user.resetPasswordToken+1});
                    res.status(200).json({
                        message:"Password reset successfull"
                    })
                }
                else{
                    throw("Reset link expired pleas generate a new one");
                }
            }
        }
        else{
            throw("All fields required");
        }
    } catch (error) {
        res.status(500).json({
            error:error
        })
    }

}
exports.changePassword = async (req,res)=>{
   try {
        const {email} = req.locals;
        const {oldPassword,password,cnfPassword} = req.body;
        console.log(email,oldPassword,password,cnfPassword)
        if(!oldPassword||!password||!cnfPassword||!email){
            return res.status(400).json({
                message:"all fields mandatory"
            })
        }
        else{
            if(password===cnfPassword){
                const user = await USER.findOne({email:email},"password ");
                if(user){
                    const oldMatch = await bcrypt.compare(oldPassword,user.password);
                    if(oldMatch){
                        const saltRounds  = Number(process.env.SALT_ROUNDS);
                        const newHash = await bcrypt.hash(password,saltRounds);
                        const updatedUser = await USER.updateOne({email:email},{password:newHash});
                        if(updatedUser.acknowledged){
                            return res.status(200).json({
                                message:"Password changed successfully"
                            })
                        }
                        else{
                            throw("Could not change the password");
                        }
                    }
                    else{
                        return res.status(401).json({
                            message:"Old password did not match"
                        })
                    }
                }
                else{
                    return res.status(400).json({
                        message:"Email not identified"
                    })
                }
            }
            else{
                return res.status(400).json({
                    menubar:"password and confirm password don't match"
                })
            }
        }
   } catch (error) {
        return res.status(500).json({
            error:error
        })
   }
}
exports.generateOtp = async (req,res)=>{
    try {
        const {email} = req.body;
        const otp = otpBuilder(6,{symbols:false,lower:false,upper:false,numbers:true});
        const expiresAt = Date.now()+300000; //5 mins from creation of otp
        const attempts = 3;
        if(email){
            await OTP.deleteOne({email:email});
            await OTP.create({email:email,otp:otp,expiresAt:expiresAt,attempts:attempts});
            return res.status(200).json({
                message:"Email sent successfully"
            })
        }
        else{
            return res.status(403).json({
                message:"Email is required"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            error:error
        })
    }
}

// test controller
exports.hello = async (req,res)=>{
    await TEST.create({
        testField:"random",
        testField2:"random2",
        testArr:["random"]
    })
    const updateArr = [
        "random2","random3","random2","random3","random2","random3","random2","random3",
    ]
    
    const updatedTest = await TEST.findOne({testField:"kuch",testField2:"random2"});
    const updatedTest2 = await TEST.findOne({testField:"random",testField2:"random2"});
    // if(updatedTest){
        // console.log("hiii");
    // }
    return res.status(200).json({
        response:updatedTest,
        r2:updatedTest2
    })
}


