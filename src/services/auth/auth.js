import toast from "react-hot-toast";
import { apiConnector } from "../apiConnection";
import { setUserType } from "../../redux/slices/UserDataSlice";
import { useDispatch } from "react-redux";
import {store} from "../../index";
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
        store.dispatch(setUserType(data.user))
        toast.success("User logged in");
        return data;
    } catch (error) {
        console.log(error);
        toast.dismiss();
        toast.error(error.response.data.message);
        setUserType(null);
    }
}