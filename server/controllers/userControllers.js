const USER = require("../models/user");
exports.updateProfile = async (req,res)=>{
    try {
        const {email} = req.locals;
        const {phoneNo,fname,lname,bio,DOB,gender} = req.body;
        if(email){
            const oldUser = await USER.findOne({email:email},"phoneNo fname lname bio gender DOB");
            const newUser = {
                phoneNo:phoneNo?phoneNo:oldUser.phoneNo,
                fname:fname?fname:oldUser.fname,
                lname:lname?lname:oldUser.lname,
                bio:bio?bio:oldUser.bio,
                gender:gender?gender:oldUser.gender,
                DOB:DOB?DOB:oldUser.DOB
            }
            await USER.updateOne({email:email},newUser);
            return res.status(200).json({
                message:"User update successfull"
            })
        }
        else{
            return res.status(400).json({
                message:"All fields are mandatory"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error:error
        })
    }
}
const deleteFile = require("../utilityFunctions/deleteFile");
const fileUpload = require("../utilityFunctions/fileUpload");
exports.changeProfilePhoto = async (req,res)=>{
    try {
        const {email} = req.locals;
        const {newPicture} = req.files;
        // console.log(profilePhoto)
        if(email&&newPicture&&newPicture.mimetype.split("/")[0]==="image") {
            const {profilePhoto} = await USER.findOne({email:email},"profilePhoto");
            let delRes;
            if(profilePhoto.length){
                const array = profilePhoto.split("/");
                const publicId = "studyNotion/"+array[array.length-1].split(".")[0];
                delRes = publicId.length?await deleteFile(publicId):true;
            }
            else
                delRes=true;
            const {secure_url} = await fileUpload(newPicture);
            const dbUpdate = await USER.updateOne({email:email},{profilePhoto:secure_url});
            // console.log(delRes,secure_url,dbUpdate);
            if(delRes&&secure_url&&dbUpdate)
                return res.status(200).json({
                    message:"Profile picture changed successfully"
                })
            else
                throw("There has been some error in changing the profile photo");
        }
        else
            return res.status(400).json({
                message:"All fields mandatory"
            });
    } catch (error) {
        return res.status(500).json({
            error:error
        })
    }
}
exports.myProfile = async (req,res)=>{
    try {
        const {email} = req.locals;
        if(email){
            const {bio,fname,lname,phoneNo,DOB,gender,profilePhoto} = await USER.findOne({email:email},"bio fname lname phoneNo DOB gender profilePhoto");
            if(bio&&fname&&lname&&phoneNo&&DOB&&gender&&profilePhoto){
                return res.status(200).json({
                    fullName:fname+" "+lname,
                    email:email,
                    profilePhoto:profilePhoto,
                    fname:fname,
                    lname:lname,
                    phoneNo:phoneNo,
                    DOB:DOB,
                    gender:gender
                })
            }
            else{
                throw "There has been some error in fetching the details";
            }
        }
        else{
            return res.status(400).json({
                message:"All fields are mandatory"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error:error
        })
    }
}
exports.deleteAccount = async (req,res)=>{
    try {
        return res.status(200).json({
            message:"this functionality is not wroking yet"
        })
    } catch (error) {
        return res.status(500).json({
            error:error
        })
    }
}