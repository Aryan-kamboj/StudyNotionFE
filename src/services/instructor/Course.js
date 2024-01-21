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
        const {data} = await apiConnector(request);
        return data;
    } catch (error) {
        console.log(error);
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
