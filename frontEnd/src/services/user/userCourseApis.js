import {apiConnector} from "../apiConnection"
import toast from "react-hot-toast";
const login = document.cookie.split("=")[1];
export const getCourseInfo = async (course)=>{
    try {
        const request = {
            method:"POST",
            url:"http://localhost:4002/api/user/getCourseInfo",
            bodyData:{
                course:course
            },
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`,
                'Content-Type': 'multipart/form-data'}
        }
        const {data} = await apiConnector(request);
        return data;
    } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.message);
        console.error(error);
    }
}