import toast from "react-hot-toast"
import { apiConnector } from "../apiConnection";
const login = document.cookie.split("=")[1];
export const newContentWatched =  async (courseId,contentId)=>{
    try {
        const bodyData = {
            courseId,contentId
        }
        const request = {
            method:"POST",
            url:"http://localhost:4002/api/student/contentWatched",
            bodyData:bodyData,
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`}
        }
        toast.loading("Updating watched content");
        const {data} = await apiConnector(request);
        toast.dismiss();
        toast.success("Content watched updated");
        return data;
    } catch (error) {
        toast.dismiss();
        toast.error("Could not update watched content");
        console.log(error);
    }
}