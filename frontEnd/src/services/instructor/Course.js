import toast from "react-hot-toast";
import { apiConnector } from "../apiConnection";
const login = document.cookie.split("=")[1];
export const createCourse = async (courseDetails)=>{
    try {
        const formData = new FormData();
        Object.entries(courseDetails).forEach(([key, value]) => {
            console.log(key,value);
            formData.append(key, value);
          });
        console.log("form data",formData);
        const request = {
            method:"POST",
            url:"http://localhost:4002/api/instructor/createCourse",
            bodyData:formData,
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`,
                'Content-Type': 'multipart/form-data'}
        }
        toast.loading("Creating course");
        const {data} = await apiConnector(request);
        toast.dismiss();
        toast.success("Course created");
        return data.data;
    } catch (error) {
        console.log(error);
    }
}
export const deleteCourseApi = async (courseId)=>{
    try {
        const bodyData={
            courseId
        }
        const request = {
            method:"POST",
            url:"http://localhost:4002/api/instructor/deleteCourse",
            bodyData:bodyData,
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`,
                'Content-Type': 'multipart/form-data'} 
        }
        toast.loading("Deleting course");
        const {data} = await apiConnector(request);
        toast.dismiss();
        toast.success("Course deleted");
        return data.data;
    } catch (error) {
        toast.dismiss();
        toast.error("Could not delete course");
    }
}
export const editCourse = async (courseDetails,id) =>{
    try {
        const formData = new FormData();
        formData.append("course",id);
        Object.entries(courseDetails).forEach(([key, value]) => {
            formData.append(key, value);
          });
        const request = {
            method:"POST",
            bodyData:formData,
            url:"http://localhost:4002/api/instructor/updateCourse",
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`,
                'Content-Type': 'multipart/form-data'},
        }
        toast.loading("Updating course");
        await apiConnector(request)
        toast.dismiss();
        toast.success("Course Updated");
    } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.message);
        console.log(error);
    }
}
export const addSectionApi = async (section,id)=>{
    try {
        const bodyData = {sectionName:section,courseId:id};
        const request = {
            method:"POST",
            bodyData:bodyData,
            url:"http://localhost:4002/api/instructor/addSection",
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`,
                'Content-Type': 'multipart/form-data'},
        }
        toast.loading("Creating section");
        const {data} = await apiConnector(request);
        toast.dismiss();
        toast.success("Section created")
        return data;    
    } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.message)
        console.log(error);
    }
}
export const editSectionNameApi = async (courseId,editedSectionName,sectionIdx)=>{
    try {
        const bodyData = {
            courseId,editedSectionName,sectionIdx
        }
        const request = {
            method:"POST",
            url:"http://localhost:4002/api/instructor/editSectionName",
            bodyData:bodyData,
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`,
                'Content-Type': 'multipart/form-data'
            }
        }
        toast.loading("Editing section name");
        const {data} = await apiConnector(request);
        toast.dismiss();
        toast.success("Section name edited");
        return data.data; 
    } catch (error) {
       toast.dismiss() ;
       toast.error("Could not edit section name");
       console.log(error)
    }
}
export const deleteSectionApi = async (index,id)=>{
    try {
        const bodyData = {
            sectionIdx:index,
            courseId:id
        }
        const request = {
            method:"POST",
            url:"http://localhost:4002/api/instructor/removeSection",
            bodyData,
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`,
                'Content-Type': 'multipart/form-data' 
            }
        }
        toast.loading("Deleting section");
        const {data}=await apiConnector(request);
        toast.dismiss();
        toast.success("Section deleted");
        return data;
    } catch (error) {
        console.log(error);
        toast.dismiss();
        toast.error("Could not delete")
    }
}
export const addLecture = async (lectureDetails)=>{
    try {
        const formData = new FormData ();
        Object.entries(lectureDetails).forEach(([key,value])=>{
            console.log(key,value);
            formData.append(key,value);
        })
        console.log(formData);
        const request = {
            method:"POST",
            url:"http://localhost:4002/api/instructor/addLecture",
            bodyData:formData,
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`,
                'Content-Type': 'multipart/form-data'
            }
        }
        toast.loading("Creating lecture");
        const {data} = await apiConnector(request);
        console.log(data);
        toast.dismiss();
        toast.success("Lecture added");
        return data.data;
    } catch (error) {
        toast.dismiss();
        toast.error("Could not create course");
        console.log(error);
    }
}
export const editLectureApi = async (lectureDetails)=>{
    try {
        const formData = new FormData();
        Object.entries(lectureDetails).forEach(([key,value])=>{
            formData.append(key,value);
        })
        const request = {
            url:"http://localhost:4002/api/instructor/editLecture",
            bodyData:formData,
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`,
                'Content-Type': 'multipart/form-data'
            },
            method:"POST"
        }
        toast.loading("Editing lecture");
        const {data} = await apiConnector(request);
        toast.dismiss();
        toast.success("Lecture edited");
        return data.data;
    } catch (error) {
        toast.dismiss();
        toast.error();
        console.log(error);
    }
}
export const deleteLectureApi = async (lectureIdx,sectionIdx,courseId)=>{
    try {
        const bodyData={courseId,sectionIdx,lectureIdx};
        console.log(bodyData);
        const request = {
            bodyData,
            method:"POST",
            url:"http://localhost:4002/api/instructor/removeLecture",
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`,
                'Content-Type': 'multipart/form-data'
            }
        }
        toast.loading("Deleting lecture");
        const {data} = await apiConnector(request);
        toast.dismiss();
        toast.success("Lecture deleted");
        return data;
    } catch (error) {
        toast.dismiss();
        toast.error("Could not delete the lecture");
        console.log(error);
    }
}
export const makeCoursePublicApi = async (courseId,makePublic)=>{
    try {
        const bodyData = {
            courseId,
            makePublic
        }
        const request = {
            method:"POST",
            url:"http://localhost:4002/api/instructor/setPublic",
            bodyData:bodyData,
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`,
                'Content-Type': 'multipart/form-data'
            }
        }
        toast.loading("Editing publish settings");
        const {data}=await apiConnector(request);
        toast.dismiss();
        toast.success("Course publish settings updated");
        return data.data;
    } catch (error) {
        toast.dismiss();
        toast.error("Could not change publish setting");
        console.log(error);
    }
}
export const getMyCoursesApi = async ()=>{
    try {
        const request = {
            method:"GET",
            url:"http://localhost:4002/api/instructor/myCourses",
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`,
                'Content-Type': 'multipart/form-data'
            }
        }
        toast.loading("Fetching your courses");
        const {data} = await apiConnector(request);
        toast.dismiss();
        toast.success("Your courses sucsessfully fetched");
        return data.myCourses;
    } catch (error) {
        toast.dismiss();
        toast.error("Could not fetch your cources")
        console.log(error);
    }
} 