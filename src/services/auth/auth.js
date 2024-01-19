import Cookies from "js-cookie"
import axios from "axios";
import { apiConnector } from "../apiConnection";
export const loginAPI = async ({email,password})=>{
    try {
        const bodyData={
            email:email,
            password:password,
        }
        // const response = await axios.post(`http://localhost:4002/api/auth/login`, bodyData, { withCredentials: true })
        // console.log(response);
        const request = {
            method:"post",
            url:"http://localhost:4002/api/auth/login",
            bodyData:bodyData,
            creds:true,
        }
        const data = await apiConnector(request);
        return data;
    } catch (error) {
        console.log(error)
    }
}