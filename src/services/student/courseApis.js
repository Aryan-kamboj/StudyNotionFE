import toast from "react-hot-toast"
import { apiConnector } from "../apiConnection";
// import { taskCancelled } from "@reduxjs/toolkit/dist/listenerMiddleware/exceptions";
const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL;
//const login = document.cookie.split("=")[1];
const login = localStorage.getItem("login")
export const newContentWatched =  async (courseId,contentId)=>{
    try {
        const bodyData = {
            courseId,contentId
        }
        const request = {
            method:"POST",
            url:`${baseUrl}api/student/contentWatched`,
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
export const createOrderIdApi = async (courseId)=>{
    try {
       const bodyData = {
            courseId
       } 
       const request = {
        bodyData,
        method:"POST",
        url:`${baseUrl}api/student/createOrderId`,
        creds:true,
        headers:{
            'Authorization':`Bearer ${login}`}
        }
        toast.loading("Creating Order");
        const {data} = await apiConnector(request);
        toast.dismiss();
        toast.success("Order created proceding to pyament");
        return data;
    } catch (error) {
        toast.dismiss();
        toast.error("Could not create order id");
        console.log(error)
    }
}
export const saveReviewApi = async (courseId,rating,review)=>{
    try {
        const bodyData = {
            courseId,rating,review
        }
        const request = {
            method:"POST",
            url:`${baseUrl}api/student/createReview`,
            bodyData,
            creds:true,
            headers:{
            'Authorization':`Bearer ${login}`}
        }          
        toast.loading("Saving review");
        await apiConnector(request);
        toast.dismiss();
        toast.success("Review saved");
    } catch (error) {
        toast.dismiss();
        toast.error("Could not save review");
    }
}
export const paymentValidationApi = async (paymentObject)=>{
    try {
        const bodyData={
            ...paymentObject
        }
        const request = {
            bodyData,
            url:`${baseUrl}api/student/validatePayment`,
            method:"POST",
            creds:true,
            headers:{
               'Authorization':`Bearer ${login}`
            }
        }
        toast.loading("Validating your payment")
        const {data} = await apiConnector(request)
        toast.dismiss();
        toast.success("Payment validated")
        return data;
    } catch (error) {
        toast.dismiss()
        toast.error("Could not validate your payment please take note of transation id and contact our support team at support@studynotion.com")
        console.log(error);
    }
}
export const createOrderIdForMultipleApi = async (courseIds)=>{
    try {
        const bodyData = {
            courseIds
        } 
        const request = {
            method:"POST",
            url:`${baseUrl}api/student/orderIdForMultiple`,
            bodyData,
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`
            }
        }
        toast.loading("Creating order id for cart");
        const {data} = await apiConnector(request);
        toast.dismiss();
        toast.success("Orde id created");
        return data;
    } catch (error) {
        toast.dismiss();
        toast.error("Could not create order id for cart");
        console.log(error)
    }
}
