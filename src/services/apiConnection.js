import axios from "axios"; 
// const {API_TIMEOUT} = process.env;
const axiosInstance = axios.create({});
export const apiConnector = ({method,url,bodyData,params,headers,creds})=>{
    return axiosInstance({
        method:method?`${method}`:null,
        url:url?`${url}`:null,
        data:bodyData?bodyData:null,
        headers:headers?headers:null,
        withCredentials:creds?true:false,
        params:params?params:null,
    })
}
