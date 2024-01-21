const INSTRUCTOR = require("../models/instructor");
const USER = require("../models/user");
const COURSE = require("../models/course");
const fileUpload = require("../utilityFunctions/fileUpload");
const deleteFilesMultiple = require("../utilityFunctions/deleteFilesMultiple");
const deleteFile = require("../utilityFunctions/deleteFile");
exports.createCourse = async (req,res)=>{
    try {
        const {email,userType} = req.locals;
        const {courseName,courseDesc,coursePrice,courseCategory,tags,benifits,requirements} = req.body;
        const {thumbnail} = req.files;
        const tags_parsed = JSON.parse(tags);
        const requirements_parsed = JSON.parse(requirements);
        if(courseName&&courseDesc&&coursePrice&&courseCategory&&tags_parsed&&thumbnail&&benifits&&requirements_parsed){
            if(email&&userType){
            const {secure_url} = await fileUpload(thumbnail);
            const user = await USER.findOne({email:email},{_id:1,fname:1,lname:1,profilePhoto:1});
            const instructor = await INSTRUCTOR.findOne({email:email},{_id:1});
            const instObj = {id:instructor._id,fullName:user.fname+" "+user.lname,profilePhoto:user.profilePhoto}
                if(instructor){
                    const newCourse = await COURSE.create({
                        instructor:instObj,
                        courseName:courseName,
                        courseDesc:courseDesc,
                        coursePrice:coursePrice,
                        courseCategory:courseCategory,
                        tags:tags_parsed,
                        thumbnail:secure_url,
                        benifits:benifits,
                        enrolled:0,
                        requirements:requirements_parsed,
                        sections:[],
                        isPublic:false,
                        createdAt:Date.now(),
                        rating:0.0,
                        reviewCount:0
                    });
                    const instructorUpdated = await INSTRUCTOR.updateOne({email:email},{$push: {myCources:newCourse._id}});
                    if(newCourse&&instructorUpdated){
                        return res.status(200).json({
                            // courseName:courseName,courseDesc:courseDesc,coursePrice:coursePrice,courseCategory:courseCategory,tags_parsed:tags_parsed,thumbnail:thumbnail,benifits:benifits,requirements_parsed:requirements_parsed
                            message:"New course created succesfully",
                            _id:newCourse._id
                        });
                    }
                    else
                        throw("There has been some error in creating the course");
                }
                else
                    throw("There has been some error please log in again");
            }
            else{
                return res.status(400).json({
                    message:"There has been some error please log in again"
                })
            }
        }
        else{
            return res.status(400).json({
                message:"All sectionss mandatory"
            })
        }
    } catch (error) {
        return res.status(500).json({
               error:error
            })
    }
}
exports.updateCourse = async (req,res)=>{
    try {
        const {course,courseName,courseDesc,coursePrice,courseCategory,tags,benifits,requirements} = req.body;
        console.log(course,courseName,courseDesc,typeof coursePrice,courseCategory,tags,benifits,requirements);
        const tags_parsed = JSON.parse(tags);
        const requirements_parsed = JSON.parse(requirements);
        console.log(tags_parsed,requirements_parsed);
        let thumbnail=null;
        let newUrl = null;
        const oldCourse = await COURSE.findById(course,"thumbnail");
        if(req.files){
            thumbnail = req.files.thumbnail;
            const arr = oldCourse.thumbnail.split("/");
            const publicId = "studynotion/"+arr[arr.length-1].split(".")[0];
            const deleted = await deleteFile(publicId);
            if(deleted.result!=="ok"){
                throw new Error("Could not delete old image")
            }
            else
            {
                const {secure_url} = await fileUpload(thumbnail);
                newUrl = secure_url;
            }
        }
        const update = await COURSE.findOneAndUpdate({_id:course},{
            courseName:courseName,
            courseDesc:courseDesc,
            coursePrice:coursePrice,
            courseCategory:courseCategory,
            tags:tags_parsed,
            benifits:benifits,
            requirements:requirements_parsed,
            thumbnail:newUrl?newUrl:oldCourse.thumbnail
        })
        console.log(update);
        return res.status(200).json({
            message:"Course updated "
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:error
        })
    }
}
exports.deleteCourse = async (req,res)=>{
    try {
        // ye rhta hai abhi 
        return res.status(200).json({
            message:"This functionality is not working right now"
        })
    } catch (error) {
        return res.status(500).json({
            message:"This functionality is not working right now"
        })
    }
}
exports.addSection = async (req,res)=>{
    try {
        const {email,userType} = req.locals;
        const {sectionName,courseId} = req.body;
        if(email&&userType==="instructor"&&userType&&sectionName&&courseId){
            const instructor = await INSTRUCTOR.findOne({email:email},"myCources");
            if(instructor.myCources.includes(courseId)){
                const updatedCourse = await COURSE.updateOne({_id:courseId},{$push: {sections:{sectionName:sectionName,lectures:[]}}});
                if(updatedCourse){
                    return res.status(200).json({
                        message:"section created succesfully"
                    })
                }
                else{
                    throw("there was an error in creating section ");
                }
            }
            else{
                return res.status(400).json({
                    error:"Action not allowed as you are not the instructor for this course"
                })
            }
        }
        else{
            return res.status(400).json({
                error:"All sectionss required"
            })
        }
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            error:error
        })
    }
}
exports.removeSection = async (req,res)=>{
    try {
        const {email,userType} = req.locals;
        const {sectionIdx,courseId} = req.body;
        const sectionIdx_parsed = Number(sectionIdx);
        if(email&&userType&&userType==="instructor"&&sectionIdx_parsed!==undefined&&courseId){
            const instructor = await INSTRUCTOR.findOne({email:email},"myCources");
            if(instructor.myCources.includes(courseId)){
                const course = await COURSE.findById(courseId,"sections");
                // deleting form cloudinary
                const publicIds = course.sections[sectionIdx_parsed].lectures.map((lecture)=>{
                    const array = lecture.link.split("/");
                    return("studyNotion/"+array[array.length-1].split(".")[0])
                })
                const response = await deleteFilesMultiple(publicIds,"video");
                // deleting from db after deleting form CN;
                if(Object.keys(response.deleted_counts).length===course.sections[sectionIdx_parsed].lectures.length){
                    course.sections.splice(sectionIdx,1);
                    const updatedCourse = await COURSE.updateOne({_id:courseId},{sections:course.sections});
                    if(updatedCourse&&course){
                        return res.status(200).json({
                            message:"section deleted succesfully"
                        })
                    }
                    else {
                        throw "There has been some error in deleting the section"
                    }
                }
                else
                    throw "There has been some error in deleting the section";
                // console.log(response);
                //  deleted: {
                //    The_First_Published_Map_of_Mount_Everest_1930_omubto: 'deleted',
                //    'Screenshot_20210526-021217020_2\n': 'not_found',
                //    'Screenshot_20210526-021217020_2_bsweuv': 'deleted'
                //  },
                //  deleted_counts: {
                //    The_First_Published_Map_of_Mount_Everest_1930_omubto: { original: 1, derived: 0 },
                //    'Screenshot_20210526-021217020_2\n': { original: 0, derived: 0 },
                //    'Screenshot_20210526-021217020_2_bsweuv': { original: 1, derived: 0 }
                //  },
                //  partial: false,
                //  rate_limit_allowed: 500,
                //  rate_limit_reset_at: 2023-12-30T16:00:00.000Z,
                //  rate_limit_remaining: 499
            }
        }
        else{
            return res.status(400).json({
                error:"All sections required"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error:error
        })
    }
}
exports.addLecture = async (req,res)=>{
    try {
        const {email,userType}=req.locals;
        const {courseId,sectionIdx,lectureTitle,lectureDesc} = req.body;
        const {lectureFile} = req.files;
        const sectionIdx_parsed = Number(sectionIdx);
        if(userType==="instructor"&&userType&&email&&courseId&&sectionIdx.length&&lectureTitle&&lectureDesc&&lectureFile){
            const {myCources} = await INSTRUCTOR.findOne({email:email},"myCources");
            if(myCources.includes(courseId)){
                const response = await fileUpload(lectureFile);
                if(response){
                    const {sections} = await COURSE.findById(courseId,"sections");
                    sections[sectionIdx_parsed].lectures.push({
                        lectureTitle:lectureTitle,
                        lectureDesc:lectureDesc,
                        link:response.secure_url,
                        length:Math.ceil(response.duration)
                    })
                    const output = await COURSE.updateOne({_id:courseId},{sections:sections});
                    if(sections&&output){
                        return res.status(200).json({
                            message:"Lecture added succesfully"
                        })
                    }
                    else
                        throw("Could not update course ");
                }
                else
                    throw("Could not upload lecture file");
                
            }
            else{
                return res.status(401).json({
                    message:"You don't have access to edit this course"
                })
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
exports.removeLecture = async (req,res)=>{
    try {
        const {email,userType}=req.locals;
        const {courseId,sectionIdx,lectureIdx} = req.body;
        if(userType==="instructor"&&userType&&email&&courseId&&sectionIdx!==undefined&&lectureIdx!==undefined){
            const {myCources} = await INSTRUCTOR.findOne({email:email},"myCources");
            if(myCources.includes(courseId)){
                const {sections} = await COURSE.findById(courseId,"sections");
                const array = sections[sectionIdx].lectures[lectureIdx].link.split("/");
                const publicId = "studyNotion/"+array[array.length-1].split(".")[0];
                const response = await deleteFile(publicId,"video");
                if(response&&sections){
                    sections[sectionIdx].lectures.splice(lectureIdx,1);
                    const update = await COURSE.updateOne({_id:courseId},{sections:sections});
                    if(update){
                        return res.status(200).json({
                            message:"Lecture deleted succesfully"
                        })
                    }
                    else
                        throw("There has been some error in deleting the lecture");
                }
                else
                    throw("There has been some error in deleting the lecture file");
            }
            else{
                throw("You don't have access to edit this course ");
            }
        }
        else{
            return res.status(400).json({
                message:"All fields required"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error:error
        })
    }
}
// {
//   asset_id: '3128499d3c8de4cdf330aebecfafcc47',
//   public_id: 'ytuzxln4hlatqfhjtwck',
//   version: 1703973988,
//   version_id: '15847f169342a2d78d1686f9d37e5cc6',
//   signature: 'd3325a0f022530b6cfabb8a640bea9f3c134affb',
//   width: 360,
//   height: 640,
//   format: 'mov',
//   resource_type: 'video',
//   created_at: '2023-12-30T22:06:28Z',
//   tags: [],
//   pages: 0,
//   bytes: 7715686,
//   type: 'upload',
//   etag: '09c883a7125aa8544785cab246d2a294',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/studynotion/video/upload/v1703973988/ytuzxln4hlatqfhjtwck.mov',
//   secure_url: 'https://res.cloudinary.com/studynotion/video/upload/v1703973988/ytuzxln4hlatqfhjtwck.mov',
//   playback_url: 'https://res.cloudinary.com/studynotion/video/upload/sp_auto/v1703973988/ytuzxln4hlatqfhjtwck.m3u8',
//   folder: '',
//   audio: {},
//   video: {
//     pix_format: 'yuv420p',
//     codec: 'h264',
//     level: 30,
//     profile: 'Main',
//     bit_rate: '2198416',
//     time_base: '1/25'
//   },
exports.saveCourse = async (req,res)=>{
    try {
        const {email,userType} = req.locals;
        const {courseName,courseDesc,coursePrice,courseCategory,tags,benifits,requirements,courseId} = req.body;
        const {thumbnail} = req.files;
        const tags_parsed = JSON.parse(tags?tags:null);
        const requirements_parsed = JSON.parse(requirements?requirements:null);
        if(email&&userType&&userType==="instructor"){
            let url;
            if(thumbnail){
                const {secure_url} = await fileUpload(thumbnail);
                url = secure_url;
            }
            console.log(url);
        const {myCources} = await INSTRUCTOR.findOne({email:email},"myCources");
        if(myCources&&myCources.includes(courseId)){
                const oldCOurse = await COURSE.findById(courseId,"courseName courseDesc coursePrice courseCategory tags thumbnail benifits requirements");
                const updateObj = {
                    courseName:courseName?courseName:oldCOurse.courseName,
                    courseDesc:courseDesc?courseDesc:oldCOurse.courseDesc,
                    coursePrice:coursePrice?coursePrice:oldCOurse.coursePrice,
                    courseCategory:courseCategory?courseCategory:oldCOurse.courseCategory,
                    tags:tags_parsed?tags_parsed:oldCOurse.tags,
                    thumbnail:url?url:oldCOurse.thumbnail,
                    benifits:benifits?benifits:oldCOurse.benifits,
                    requirements:requirements_parsed?requirements_parsed:oldCOurse.requirements,
                }
                const updateCourse = await COURSE.updateOne({_id:courseId},updateObj);
                if(updateCourse){
                    return res.status(200).json({
                        message:"Course updated succesfully"
                    });
                }
                else
                    throw("There has been some error in updating the course");
            }
            else
                throw("There has been some error please log in again");
        }
        else{
            return res.status(400).json({
                message:"There has been some error please log in again"
            })
        }
    }
    catch (error) {
        return res.status(500).json({
               error:error
            })
    }
}
exports.setPublic = async (req,res)=>{
    try {
        const {email,userType} = req.locals;
        const {courseId,makePublic} = req.body;
        if(email&&userType&&userType==="instructor"&&courseId&&makePublic!==undefined){
            const {myCources} = await INSTRUCTOR.findOne({email:email},"myCources");
            if(myCources.includes(courseId)){
                if(makePublic){
                    await COURSE.updateOne({_id:courseId},{isPublic:true});
                    return res.status(200).json({
                        message:"Course made public successfully"
                    })
                }
                else{
                    await COURSE.updateOne({_id:courseId},{isPublic:false});
                    return res.status(200).json({
                        message:"Course made private successfully"
                    })
                }
            }   
            else{
                return res.status(401).json({
                    message:"You don't have access to update this course"
                })
            }
        }
        else{
            return res.status(400).json({
                message:"All fields are required"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error:error
        })
    }
}
exports.myCources = async (req,res)=>{
    try {
        const {email,userType} = req.locals;
        if(email&&userType&&userType==="instructor"){
            const {myCources} = await INSTRUCTOR.findOne({email:email},"myCources");
            const cources_Info = [];
            for (const courseId of myCources){
                const {createdAt,courseName,courseDesc,coursePrice,thumbnail,isPublic,sections} = await COURSE.findById(courseId,"createdAt courseName courseDesc coursePrice thumbnail isPublic sections");
                const duration = sections.reduce((acc,section)=>{
                    return acc+section.lectures.reduce((accLec,lecture)=>{
                        return accLec+lecture.length;
                    },0);
                },0);
                cources_Info.push({
                    createdAt:Number(createdAt),
                    courseName:courseName,
                    courseDesc:courseDesc,
                    coursePrice:coursePrice,
                    thumbnail:thumbnail,
                    isPublic:isPublic,
                    duration:duration}
                );
            }
            console.log(cources_Info);
            return res.status(200).json({
                myCources:cources_Info
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