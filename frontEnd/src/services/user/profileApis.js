import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnection";
const login = document.cookie.split("=")[1];
export const getProfileApi = async ()=>{
    try {
        const request = {
            method:"GET",
            url:"http://localhost:4002/api/user/myProfile",
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`,
            }
        }
        toast.loading("Getting profile details");
        const {data} = await apiConnector(request);
        toast.dismiss();
        toast.success("User profile fetched");
        return data;
    } catch (error) {
        toast.dismiss();
        toast.error("Could not get profile details");
    }
}
export const updateProfileApi = async (phoneNo,fname,lname,bio,DOB,gender,countryCode)=>{
    try {
        const bodyData = {
            phoneNo,fname,lname,bio,DOB,gender,countryCode
        }
        const request = {
            method:"POST",
            url:"http://localhost:4002/api/user/updateProfile",
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`
            },
            bodyData:bodyData
        }
        toast.loading("Updating user profile");
        const {data} = await apiConnector(request);
        toast.dismiss();
        toast.success("Profile data updated ");
        return data;
    } catch (error) {
        toast.dismiss();
        toast.error("Could not update profile");
        console.log(error);
    }
}