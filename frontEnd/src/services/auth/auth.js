import toast from "react-hot-toast";
import { apiConnector } from "../apiConnection";
import { updateUserType } from "../../redux/slices/UserDataSlice";
import {store} from "../../main";
const login = document.cookie.split("=")[1];
export const loginAPI = async ({email,password})=>{
    try {
        const bodyData={
            email:email,
            password:password,
        }
        const request = {
            method:"post",
            url:"http://localhost:4002/api/auth/login",
            bodyData:bodyData,
            creds:true,
        }
        toast.loading("Logining you in");
        const {data} = await apiConnector(request);
        toast.dismiss();
        localStorage.removeItem("userType");
        localStorage.setItem("userType",`${data.user}`);
        store.dispatch(updateUserType(data.user))
        toast.success("User logged in");
        return data;
    } catch (error) {
        console.log(error);
        toast.dismiss();
        toast.error(error.response.data.message);
        updateUserType(null);
    }
}
export const changePasswordApi = async (oldPass,newPass,cnfPass)=>{
    try {
        const bodyData = {
            oldPassword:oldPass,
            password:newPass,
            cnfPassword:cnfPass
        }
        const request = {
            method:"POST",
            bodyData:bodyData,
            url:"http://localhost:4002/api/auth/changePass",
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`,
            }
        }
        toast.loading("Changing user password");
        await apiConnector(request);
        console.log("change password running")
        toast.dismiss();
        toast.success("Password changed ");
    } catch (error) {
        toast.dismiss();
        toast.error("Could not update password");
        console.log(error);
    }
}