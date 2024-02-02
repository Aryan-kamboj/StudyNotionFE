import { apiConnector } from '../../services/apiConnection'
export const getEnorlledCources = async ()=>{
    try {
        const EnrolledCoursesData = await apiConnector("GET","http://localhost:4002/api/student/enrolledCources")
        console.log("data", EnrolledCoursesData);
        return EnrolledCoursesData;
    } catch (error) {
        console.log(error);
    }
  }
