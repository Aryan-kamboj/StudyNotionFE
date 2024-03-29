import { useEffect} from 'react'
// import { EnrolledCoursesData } from '../../../data/tempData'
import { Link } from 'react-router-dom'
import { BsThreeDotsVertical } from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../../redux/slices/UI_slice'
import { getEnorlledCourses } from '../../../services/student/dashboardAPIS'
import { setEnrolledCourses } from '../../../redux/slices/UserDataSlice'

export const EnrolledCourses = () => {
  // let [EnrolledCoursesData,setData] = useState(getEnorlledCources());
  const EnrolledCoursesData = useSelector(({rootReducer})=>rootReducer.UserDataSlice.enrolledCourses);
  console.log(EnrolledCoursesData);
  const dispatcher = useDispatch();
  useEffect(()=>{
    // iifc-> Immediately Invoked Function Expression invokes itself as soon as it lodes 
    (async ()=>{
      try {
        if(EnrolledCoursesData.length<1)
          {     
            dispatcher(setLoading(true));
            const data = await getEnorlledCourses();
            console.log(data);
            dispatcher(setEnrolledCourses(data));
            dispatcher(setLoading(false));
          }
      } catch (error) {
        console.log(error);
      }
    })()
  },[])
  
  return (
      <div className='min-h-[100%] pt-14 overflow-auto'>
          <div className='w-[70%] max-tablet:w-[95%] mx-auto pb-14'>
            <div className='text-sm m-8 space-y-4'>
              <span className='text-richblack-300'>Home / Dashboard /</span>
              <span className='text-yellow-50'> Enrolled Courses</span>
              <h1 className='text-3xl '>Enrolled Courses</h1>
            </div>
            <div>
            <div className="max-tablet:hidden flex text-richblack-50 rounded-t-md bg-richblack-700 p-4">
              <p className='basis-[50%]'>Course Name</p>
              <p className='basis-[20%]'>Time </p>
              <p className='basis-[30%]'>Progress</p>
            </div>
            <div className='border-x-2 border-richblack-700 border-b-2 h-[75%] rounded-b-lg'>
            {/* would like to add a filter bar to seperate completed and pending cources */}
              {EnrolledCoursesData?.map(({courseName,thumbnail,desc,courseId,duration,progress},i)=>{
                {/* console.log("mai chala") */}
                  const sec = duration%60;
                  duration-=sec;
                  const totalMins = ((duration)/60);
                  const mins = (totalMins%60);
                  const hours = ((totalMins-mins)/60);
                  const timeString = `${hours} h : ${mins} m : ${sec} s`;
              return (
              <Link key={i} to={`/view-course/${courseId}`}>
              <div className={`p-4 border-richblack-700 border-t-2`}>
              {/* link these to that particular course  */}
                  <div className='h-[4rem] max-tablet:h-[9rem] max-tablet:flex-col flex items-start space-y-3 '>
                    <div className='flex basis-[50%] items-center'>
                      <img className=" object-cover w-[4rem] h-[4rem] rounded-2xl " src={thumbnail} alt={courseName}/>
                      <div className='px-5 '>
                        <h2>{courseName}</h2>
                        <p className='text-richblack-300'>{desc}</p>
                      </div>
                    </div>
                    <div className='basis-[20%] text-richblack-50'>
                      {/* duration */}
                      {timeString}
                    </div>
                    <div className='basis-[30%] flex w-[100%] items-center justify-between'>
                      {/* progress bar */}
                      <div className='space-y-2 basis-[80%] max-tablet:basis-[100%]'>
                        <div className='text-richblack-50 text-xs'>Progress : {progress}%</div>
                        <div className='bg-richblack-700 relative rounded-full'>
                          <div style={{width:`${progress}%`}} className={`h-2 rounded-full ${progress<25? " bg-pink-300 ":(progress>=25&&progress<=75)?"bg-blue-100":"bg-caribbeangreen-100"}`}/>
                        </div>
                      </div>
                      {/* 3 dots */}
                      <div className='text-3xl text-richblack-50 relative left-2'>
                        <BsThreeDotsVertical/>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              )
            })}
            </div>
            </div>
          </div>
        </div>
  )
}
