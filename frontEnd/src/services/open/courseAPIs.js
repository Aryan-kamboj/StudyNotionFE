import { apiConnector } from "../apiConnection"
import toast from "react-hot-toast"

const login = document.cookie.split("=")[1];
export const addToCart = async (course)=>{
    try {
        const bodyData = {
            course:course
        }
        const request = {
            method:"POST",
            url:"http://localhost:4002/api/student/addToCart",
            bodyData:bodyData,
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`}
        }
        toast.loading("Adding to cart");
        const {data} = await apiConnector(request);
        toast.dismiss();
        toast.success("Added to cart");
        return data.cart;
    } catch (error) {
        console.log(error.response.data.message);
        toast.dismiss();
        toast.error(error.response.data.message);
        return false;
    }
}
export const removeFromeCart = async (course)=>{
    try {
        const bodyData = {
            course:course
        }
        const request = {
            method:"POST",
            url:"http://localhost:4002/api/student/removeFromCart",
            bodyData:bodyData,
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`
            }
        }
        toast.loading("Removing course from cart");
        const {data} = await apiConnector(request);
        toast.dismiss();
        toast.success("Course removed form cart");
        console.log(data);
        return data;
    } catch (error) {
        toast.dismiss();
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
        return false;
    }
}
export const getCart = async ()=>{
    try {
        const request = {
            method:"GET",
            url:"http://localhost:4002/api/student/getCart",
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`}
        }
        toast.loading("Fetching cart");
        const {data} = await apiConnector(request);
        toast.dismiss();
        toast.success("Cart fetched successfully ");
        // console.log(data.cart);
        return data?.cart;
    } catch (error) {
        console.error(error.response.data.message);
        toast.dismiss();
        toast.error(error.response.data.message?error.response.data.message:"There has been some error in fetching cart")
    }
}
export const getCourse = async (course)=>{
    try {
        // console.log(course);
        const bodyData = {
            course:course,
        }
        const request = {
            method:"GET",
            url:"http://localhost:4002/api/open/getCourse",
            params:bodyData
        }
        const data = await apiConnector(request);
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error)
    }
}