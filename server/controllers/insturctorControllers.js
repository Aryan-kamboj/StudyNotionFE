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
                            data:newCourse
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
        const {email,userType} = req.locals;
        const {courseId} = req.body;
        if(email&&userType==="instructor"&&courseId){
            const instructor = await INSTRUCTOR.findOne({email:email});
            if(instructor.myCources.includes(courseId)){
                const myCourcesFiltered = instructor.myCources.filter((course)=>{
                    console.log(course.toString(),courseId);
                    return !(course.toString()===courseId)});
                const course = await COURSE.findByIdAndUpdate(courseId,{isPublic:false},{new:true});
                if(course.enrolled===0){
                    const public_ids_to_be_deleted =[]
                    course.sections.map((section)=>{
                        section.lectures.map((lecture)=>{
                            const array = lecture.link.split("/");
                            const public_id = "studyNotion/"+array[array.length-1].split(".")[0];
                            public_ids_to_be_deleted.push(public_id);
                        })
                    })
                    if(public_ids_to_be_deleted.length>0){
                        const delete_lec_res = await deleteFilesMultiple(public_ids_to_be_deleted,"video");
                        console.log("Lectures deleted ",delete_lec_res);
                    }
                    if(course.thumbnail.length>0){
                        const array = course.thumbnail.split("/");
                        const public_id = "studyNotion/"+array[array.length-1].split(".")[0];
                        const delete_thumb_res = await deleteFile(public_id);
                        console.log("Thumbnail delted",delete_thumb_res);
                    }
                    await COURSE.deleteOne({_id:courseId});
                }
                const response = await INSTRUCTOR.findOneAndUpdate({email:email},{myCources:myCourcesFiltered},{new:true});
                return res.status(200).json({
                    message:"Course deleted",
                    data:response.myCources
                })
            }
            else{
                return res.status(400).json({
                    message:"You don't have access to delete this course"
                })
            }
        }
        else{
            return res.status(400).json({
                message:"All fields required"
            })
        }
        // ye phle course ko private krega taki vo logo ko na dikhe aur fir ye course ko instructor ke object se delete krega taki vo isko edit na kr ske
        // aur jin logo ne enrolle kiya hua hai usme vo log deakh hi skte hai if enrolled students === 0 course permanently delete ho jaega 
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
                const updatedCourse = await COURSE.findByIdAndUpdate({_id:courseId},{$push: {sections:{sectionName:sectionName,lectures:[]}}},{new:true});
                if(updatedCourse){
                    return res.status(200).json({
                        updatedCourse:updatedCourse
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
exports.editSectionName = async (req,res)=>{
    try {
        const {email,userType} = req.locals;
        const {courseId,editedSectionName,sectionIdx} = req.body; 
        if(email&&userType==="instructor"&&userType&&editedSectionName&&sectionIdx&&courseId){
            const instructor = await INSTRUCTOR.findOne({email:email},"myCources");
            if(instructor.myCources.includes(courseId)){
                const {sections}= await COURSE.findById(courseId,"sections");
                sections[sectionIdx].sectionName = editedSectionName;
                const updatedCourse = await COURSE.findByIdAndUpdate(courseId,{sections},{new:true});
                if(updatedCourse){
                    return res.status(200).json({
                        data:updatedCourse
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
    }
    catch (error) {
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
                let response ;
                if(course.sections[sectionIdx_parsed].lectures.length>0){
                    const publicIds = course.sections[sectionIdx_parsed].lectures.map((lecture)=>{
                        const array = lecture.link.split("/");
                        return("studyNotion/"+array[array.length-1].split(".")[0])
                    })
                    response = await deleteFilesMultiple(publicIds,"video");
                }
                // deleting from db after deleting form CN;
                if((course.sections[sectionIdx_parsed].lectures.length===0)||(Object.keys(response.deleted_counts).length===course.sections[sectionIdx_parsed].lectures.length)){
                    course.sections.splice(sectionIdx,1);
                    const updatedCourse = await COURSE.findOneAndUpdate({_id:courseId},{sections:course.sections},{new:true});
                    if(updatedCourse&&course){
                        return res.status(200).json({
                            updatedCourse:updatedCourse
                        })
                    }
                    else {
                        throw "There has been some error in deleting the section"
                    }
                }
                else
                    throw "There has been some error in deleting the section";
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
        console.log(req.body,req.files);
        const {courseId,sectionIdx,lectureTitle,lectureDesc} = req.body;
        const {lectureFile} = req.files;
        const sectionIdx_parsed = Number(sectionIdx);
        console.log(userType==="instructor"&&userType&&email&&courseId&&sectionIdx.length&&lectureTitle&&lectureDesc&&lectureFile);
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
                    const output = await COURSE.findByIdAndUpdate(courseId,{sections:sections},{new:true});
                    if(sections&&output){
                        return res.status(200).json({
                            data:output,
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
exports.editLecture = async (req,res)=>{
    try {
        const {email,userType} = req.locals;
        const {lectureIdx,sectionIdx,courseId,lectureDesc,lectureTitle} = req.body; 
        let lectureFile = null;
        if(req?.files?.lectureFile!==undefined){
            lectureFile = req.files.lectureFile;
        }
        if(lectureIdx&&sectionIdx&&lectureDesc&&lectureTitle&&email&&userType==="instructor"){
            const {myCources} = await INSTRUCTOR.findOne({email:email},"myCources");
            if(myCources.includes(courseId)){
                const {sections} =await COURSE.findById(courseId,"sections");
                if(lectureFile){
                    const {link} = sections[sectionIdx].lectures[lectureIdx];
                    const array = link.split("/");
                    const public_id = "studyNotion/"+array[array.length-1].split(".")[0];
                    const del_res = await deleteFile(public_id,"video");
                    console.log("hiiii");
                    console.log(del_res);
                    const response = await fileUpload(lectureFile);
                    console.log(response);
                        sections[sectionIdx].lectures[lectureIdx].link = response.secure_url;
                        sections[sectionIdx].lectures[lectureIdx].length=Math.ceil(response.duration);
                    }
                sections[sectionIdx].lectures[lectureIdx].lectureTitle = lectureTitle;
                sections[sectionIdx].lectures[lectureIdx].lectureDesc = lectureDesc;
                const dbUpdate = await COURSE.findByIdAndUpdate(courseId,{sections:sections},{new:true});
                if(dbUpdate)
                    return res.status(200).json({
                        data:dbUpdate,
                        message:"Lecture edited"
                    })
                else throw new Error("Could not edit lecture in DB");
            }
            else{
                return res.status(400).json({
                    message:"You don't have access to edit this course"
                })
            }
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
            console.log(myCources,courseId)
            if(myCources.includes(courseId)){
                const {sections} = await COURSE.findById(courseId,"sections");
                const array = sections[sectionIdx].lectures[lectureIdx].link.split("/");
                const publicId = "studyNotion/"+array[array.length-1].split(".")[0];
                const response = await deleteFile(publicId,"video");
                if(response&&sections){
                    sections[sectionIdx].lectures.splice(lectureIdx,1);
                    const update = await COURSE.findByIdAndUpdate(courseId,{sections:sections},{new:true});
                    if(update){
                        return res.status(200).json({
                            data:update,
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
                const info = await COURSE.findOneAndUpdate({_id:courseId},{isPublic:makePublic},{new:true});
                return res.status(200).json({
                    data:info,
                    message:"Course publish settings changed"
                })
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
exports.myCourses = async (req,res)=>{
    try {
        const {email,userType} = req.locals;
        if(email&&userType&&userType==="instructor"){
            const {myCourses} = await INSTRUCTOR.findOne({email:email},"myCourses");
            const courses_Info = [];
            for (const courseId of myCourses){
                const {createdAt,courseName,enrolled,courseDesc,coursePrice,thumbnail,isPublic,sections} = await COURSE.findById(courseId,"enrolled createdAt courseName courseDesc coursePrice thumbnail isPublic sections");
                const duration = sections.reduce((acc,section)=>{
                    return acc+section.lectures.reduce((accLec,lecture)=>{
                        return accLec+lecture.length;
                    },0);
                },0);
                courses_Info.push({
                    createdAt:Number(createdAt),
                    courseName:courseName,
                    courseDesc:courseDesc,
                    coursePrice:coursePrice,
                    thumbnail:thumbnail,
                    enrolled:enrolled,
                    isPublic:isPublic,
                    duration:duration,
                    courseId:courseId}
                    );
                // console.log(courses_Info);
            }
                console.log("hiii",courses_Info);
            return res.status(200).json({
                myCourses:courses_Info
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