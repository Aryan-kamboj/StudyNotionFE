import toast from "react-hot-toast";
import { apiConnector } from "../apiConnection";
import { updateUserType } from "../../redux/slices/UserDataSlice";
import {store} from "../../main";
//const login = document.cookie.split("=")[1];
const login = localStorage.getItem("login")
const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL;
export const generateOTP = async (email)=>{
    try {
        const bodyData = {email};
        const request = {
            method:"POST",
            url:`${baseUrl}api/auth/generateOTP`,
            bodyData
        }
        toast.loading("Sending a OTP to your email");
        await apiConnector(request);
        toast.dismiss();
        toast.success("OTP sent to your email");
    } catch (error) {
        toast.dismiss();
        toast.error("Could not generate OTP");
        console.log(error)
    }
}
export const signUpApi = async (userData)=>{
    try {
        const bodyData={
            ...userData
        }
        const request = {
            bodyData,
            url:`${baseUrl}api/auth/signup`,
            method:"POST",
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`}
        }
        toast.loading("Signing you up");
        const {data} = await apiConnector(request);
        toast.dismiss();
        toast.success("Signed up successfully")
        return data;
    } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.data?.message);
        console.log(error)
    }
}
export const loginAPI = async ({email,password})=>{
    try {
        const bodyData={
            email:email,
            password:password,
        }
        const request = {
            method:"post",
            url:`${baseUrl}api/auth/login`,
            bodyData:bodyData,
            creds:true,
        }
        toast.loading("Logining you in");
        const {data} = await apiConnector(request);
        toast.dismiss();
        localStorage.removeItem("userType");
        localStorage.removeItem("token");
        console.log(localStorage);
        localStorage.setItem("userType",`${data.user}`);
        localStorage.setItem("token",`${data.token}`)
        store.dispatch(updateUserType(data.user))
        toast.success("User logged in");
        window.location.href="/";
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
            url:`${baseUrl}api/auth/changePass`,
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
