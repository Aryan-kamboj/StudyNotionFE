import {useEffect,useState} from 'react'
import { getMyCoursesApi } from '../../../services/instructor/Course'
import { Chart, registerables } from "chart.js";
import { Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
Chart.register(...registerables);
export const MyDashboard = ({setTab}) => {
  const navigator = useNavigate();
  const [enrolledData,enrolledDataSetter] = useState(null);
  const [revenueData,revenueDataSetter] = useState(null);
  const [chartType,setChartType] = useState("students");
  const [totalStudents,setStudents] = useState(0);
  const [totalRevenue,setRevenue] = useState(0);
  const [totalCourses,setCourses] = useState(null);
  const [myCources,setMyCources] = useState(null);
  const viewAllHandler = ()=>{
    navigator("my-courses");
    setTab("my-courses");
  }
  useEffect(()=>{
    (async ()=>{
      console.log("hii from get my cources");
      const data = await getMyCoursesApi();
      console.log(data);
      if(data.length>3)
        setMyCources(data.splice(0,3))
      else 
        setMyCources(data);
      const courseNames = [];
      const revenueData = data.map((course)=>{
        courseNames.push(course.courseName);
        const revenue = course.coursePrice*course.enrolled;
        setRevenue(totalRevenue+revenue);
        return (revenue);
       });
      setCourses(courseNames.length);
      const enrolledData = data.map((course)=>{
        setStudents(totalStudents+course.enrolled);
        return (course.enrolled);
      });
      console.log(revenueData,enrolledData)
      enrolledDataSetter({
        datasets:[
        {
          data:enrolledData,
          label:"Enrolled data"
        }
        ],
        labels:courseNames
      })
      revenueDataSetter({
        datasets:[
          {
            data:revenueData,
            label:"Revenue data"
          }
        ],
        labels:courseNames
      })
    })()
  },[]);
    
  // const dataSets 
//   data = {
//     datasets: [{
//         data: [10, 20, 30]
//     }],

//     // These labels appear in the legend and in the tooltips when hovering different arcs
//     labels: [
//         'Red',
//         'Yellow',
//         'Blue'
//     ]
// };
  return (
    <div className='p-16 '>
      {totalCourses<1?<div className='flex h-[70vh] items-center justify-center flex-col space-y-4'>
        <div className='text-2xl font-[500]'>You have not created any courses yet</div>
        <div className='text-sm text-richblack-300'>Please create a course to visualize the data</div>
        <div className='cursor-pointer border-[1px] border-richblack-600 px-4 py-2 rounded-lg text-lg font-[500] text-yellow-50 ' onClick={()=>{navigator("add-course");setTab("add-course")}}>Create a course</div>
      </div>
      :<div className='space-y-4'>
        <h1 className='text-2xl font-[700]'>Hi instructor &#128075; </h1>
        <span className='text-richblack-200 font-[500]'>Here you can visualize your revenue and impact </span>
        <div className='flex space-x-4'>
          <div className='bg-richblack-800 space-y-6 rounded-2xl w-[70%] p-6'>
            <span className='text-xl font-[500]'>Visualize</span>
            <div>
              <span onClick={()=>{setChartType("students")}} className={`text-lg font-[500] p-2 transition-all duration-500 ${chartType==="students"?"bg-richblack-700 text-yellow-50":"text-yellow-400"}`}>Students</span>
              <span onClick={()=>{setChartType("revenue")}} className={`text-lg font-[500] p-2 transition-all duration-500 ${chartType==="revenue"?"bg-richblack-700 text-yellow-50":"text-yellow-400"}`}>Revenue</span>
            </div>
            <div className='flex items-center justify-center'>
              <div className='w-[45%]'>
                {chartType==="students"?enrolledData?<Pie data = {enrolledData}/>:"":""}
                {chartType==="revenue"?revenueData?<Pie data = {revenueData}/>:"":""}
              </div>
            </div>
          </div>
          <div className='space-y-4 bg-richblack-800 w-[30%] rounded-2xl p-6'>
            <span className='text-xl font-[500]'>Statistics</span> 
            <div>
              <span className='text-lg text-richblack-300'>Total Courses</span>
              <span className='text-3xl block text-richblack-25'>{totalCourses}</span>
            </div>
            <div>
              <span className='text-lg text-richblack-300'>Total Students</span>
              <span className='text-3xl block text-richblack-25'>{totalStudents}</span>
            </div>
            <div>
              <span className='text-lg text-richblack-300'>Total Revenue</span>
              <span className='text-3xl block text-richblack-25'>Rs.{totalRevenue}</span>
            </div>
          </div>
        </div>
        <div className='bg-richblack-800 p-6 rounded-2xl'>
          <div className='flex justify-between items-center '><h1 className="font-[500] text-lg">Your courses</h1><span onClick={viewAllHandler} className='text-sm text-yellow-50 font-[500]'>View All</span></div>
          <div className='flex mt-3 space-x-4'>
            {myCources?myCources.map((course,i)=>{
              return (<div className='w-[33%] space-y-4 h-[33vh]' key={i}>
                <img className='object-cover rounded-lg h-[75%] w-[100%]' src = {course.thumbnail}/>
                <div>{course.courseName}</div>
                <div className='text-richblack-200 text-sm'><span>{course.enrolled} students</span> | <span>Rs.{course.coursePrice}</span></div>
              </div>)
            }):""}
          </div>
        </div>
      </div>}
    </div>
  )
}
