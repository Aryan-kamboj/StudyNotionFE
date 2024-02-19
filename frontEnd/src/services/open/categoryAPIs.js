import { apiConnector } from "../apiConnection";
const baseUrl = import.meta.env.BACKEND_BASE_URL;
export const getCategories = async ()=>{
    try {
        const request = {
            method:"GET",
            url:`${baseUrl}api/open/getCategories`,
        }
        const {data} = await apiConnector(request);
        return data.categories;
    } catch (error) {
        console.log(error)
    }
}
export const getCategoryData = async (category)=>{
    const parameter = {
        category:category
    }
    try {
        const request = {
            method:"GET",
            url:`${baseUrl}api/open/getCategoryData`,
            params:parameter
        }
        const data = await apiConnector(request);
        return data;
    } catch (error) {
        console.log(error);
    }
}