import toast from 'react-hot-toast';
import { apiConnector } from '../../services/apiConnection'
const login = document.cookie.split("=")[1];
export const getEnorlledCourses = async ()=>{
    try {
        console.log("enrolled courses chla")
        const request = {
            method:"GET",
            url:"http://localhost:4002/api/student/enrolledCources",
            creds:true,
            headers:{
                'Authorization':`Bearer ${login}`}
        }
        toast.loading("Fetching enrolled courses");
        const {data} = await apiConnector(request);
        // console.log(data.enrolledCourses)
        toast.dismiss();
        toast.success("Enrolled courses fetched")
        return data.enrolledCourses;
    } catch (error) {
        toast.dismiss();
        toast.error("Could not fetch enrolled courses")
        console.log(error);
    }
  }
