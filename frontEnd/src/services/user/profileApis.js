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
                'Content-Type': 'multipart/form-data'}
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