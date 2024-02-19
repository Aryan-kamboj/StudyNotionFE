import toast from "react-hot-toast"
import {apiConnector} from "../apiConnection";
const baseUrl = import.meta.env.BACKEND_BASE_URL;
export const contactUsApi = async (fname,lname,email,phoneNo,countryCode,message)=>{
    try {
        const bodyData = {
            fname,lname,email,phoneNo,countryCode,message
        }
        const request = {
            url:`${baseUrl}api/open/contactUs`,
            method:"POST",
            bodyData
        }
        toast.loading("Sending message")
        await apiConnector(request)
        toast.dismiss();
        toast.success("Message sent")
    } catch (error) {
       toast.dismiss();
       toast.error("Could not send request");
    }
}