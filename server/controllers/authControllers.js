const OTP = require("../models/otp");
const USER = require("../models/user");
const STUDENT = require("../models/student");
const INSTRUCTOR = require("../models/instructor");
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
        if(login){
            const verify = jwt.verify(login,process.env.JWT_SECRET);
            const {email,userType,exp} = verify;
            const check = await USER.findOne({email:email});
            if(check.userType===userType)
            req.locals = {email,userType,exp}
            else{
                throw ("There has been some error please log in again ");
            }
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
        const {email,fname,lname,phoneNo,password,cnfPassword,otp,userType}=req.body;

        // all fields avilable
        if(!email||!fname||!lname||!phoneNo||!password||!otp||!userType){
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
        const checkAlreadyUser = await USER.findOne({email:email});
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
                        await OTP.deleteMany({email:email});
                        const saltRounds  = Number(process.env.SALT_ROUNDS);
                        const hashedPass = await bcrypt.hash(password,saltRounds);

                        const newUser = {
                            email:email,
                            phoneNo:phoneNo,
                            fname:fname,
                            lname:lname,
                            password:hashedPass,
                            userType:userType,
                            bio:"",
                            DOB:null,
                            profilePhoto:"",
                            gender:"",
                        }
                        let newUserEntry = null;
                        newUserEntry = await USER.create(newUser);
    
                        let newEntry = null;
                        if(userType==="student"){
                            const newStudent = {
                                email:email,
                                enrolledCources:[],
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
                            response:"Wrong otp Entered"
                        })
                    }
                }
                else{
                    await OTP.deleteOne({email:email});
                    return res.status(401).json({
                        response:"OTP expired please make a new one"
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
            error:error
        })
    }
}
exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        // console.log(req.locals);
        if(!email||!password){
            return res.status(403).json({
                error:"All fields required"
            })
        }
        else{
            const user = await USER.findOne({email:email});
            if(!user)
                return res.status(400).json({
                    message:"Email not registered"
                })
            const check = await bcrypt.compare(password,user.password);
            if(check){
                const jwtSecret = process.env.JWT_SECRET;
                const login = {
                    email:email,
                    userType:user.userType,
                }
                const token = jwt.sign(login,jwtSecret,{expiresIn:"7d"});
                res.cookie("login",token,
                {
                    httpOnly:true,
                    secure:true,
                });
                return res.status(200).json({
                    message:"Login successfull"
                });
            }
            else{
                res.status(401).json({
                    message:"Wrong password enterd"
                })
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error:error
        })
    }
}
exports.forgotPassword = async (req,res)=>{
    try {
        const {email} = req.body;
        if(email){
            const user = await USER.findOne({email:email});
            // console.log(user);
            if(user){
                const name = user.fname+" "+user.lname;
                const secret = process.env.JWT_SECRET;
                const payload = {
                    email:email,
                }
                const token = jwt.sign(payload,secret,{expiresIn:"5m"})
                const link = `https://studynotionkamboj.netlify.app/newPassword/${token}`;
                const mailContent = forgotPassword(email,name,link);
                const response = await mailSender(email,mailContent);
                console.log(response);
            }
        }
    } catch (error) {
        
    }
    
}
exports.changePassword = async (req,res)=>{
   try {
        const {oldPassword,password,cnfPassword,email} = req.body;
        if(!oldPassword||!password||!cnfPassword||!email){
            return res.status(400).json({
                message:"all fields mandatory"
            })
        }
        else{
            if(password===cnfPassword){
                const user = await USER.findOne({email:email});
                if(user){
                    const oldMatch = await bcrypt.compare(oldPassword,user.password);
                    if(oldMatch){
                        console.log("jii");
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
    return res.status(200).json({
        response:"hellloooooo",
    })
}


