import { useState } from 'react';
import {IoIosArrowBack} from "react-icons/io";
import { FaCheck } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import { AddCourseBasicInfo } from '../../stdComponets/instructorComponents/AddCourseBasicInfo';
import { CourseBuilder } from '../../stdComponets/instructorComponents/CourseBuilder';
import { PublishCourse } from '../../stdComponets/instructorComponents/PublishCourse';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseInfo } from '../../../services/user/userCourseApis';
import {setCourseInfo} from "../../../redux/slices/instructorSlice";
// eslint-disable-next-line react/prop-types
export const AddCourse = ({setTab}) => {
    const [stage,setStage]=useState(1);

    const dispatcher = useDispatch();
    const navigator = useNavigate();
    const course = useSelector(({rootReducer})=>{
        return rootReducer.instructorSlice.currentlyEditing;
    })
    const fetchCourse = async()=>{
        const fetchedData = await getCourseInfo(course);
        console.log(fetchedData);
        if(fetchedData){
            dispatcher(setCourseInfo(fetchedData));
            return fetchedData;
        }
    }
    // const [courseDetails,setDetails] = useState(async()=>await fetchCourse());
    // const refetchCourse = async ()=>{
    //     const response = await fetchCourse();
    //     setDetails(response);
    // }
    // useEffect(()=>{
    //     ( async ()=>await refetchCourse())()
    // },[course]);
    // console.log(course);
    // // const data = useSelector(({rootReducer})=>{
    // //     if(rootReducer.instructorSlice.courseInfo){
    // //         return rootReducer.instructorSlice;
    // //     }
    // //     else
    // //     console.log("kuch nahi aaya bhai")
    // //         return {
    // //             message:"kuch nahi aaya bhai "
    // //         }
    // // })
    // // useEffect(()=>{
    // //     if(course){
    // //         (async ()=>{
    // //             dispatcher(setCourseInfo(await getCourseInfo(course)));
    // //             setDetails(data);
    // //         }
    // //         )()}
    // //     }
    // //     ,[course]);

        const courseBuilderSubmit = () =>{
        // console.log(e);
        setStage(3);
    }
    const backHandler = ()=>{
        setStage(stage-1);
    }
    const publishCourseHandler = ()=>{
        // console.log(e);
    }
  return (
    <div className='p-8 flex max-tablet:flex-col space-x-8'>
        <div className='basis-[70%] space-y-4'>
            <div className='flex space-x-4 items-center text-richblack-300' onClick={()=>{navigator("my-courses");setTab("my-courses");}}> 
                <IoIosArrowBack/> Back to Dashboard
            </div>
            <div className='flex flex-col mt-4 justify-between '>
                <div className='flex items-center mx-[10%]'>
                    <div className='flex w-fit flex-col items-center justify-center'>
                        {stage>1?<span className={`px-[0.9rem] font-[500] text-lg py-[0.9rem] rounded-full text-richblack-900 bg-yellow-50 "}`}><FaCheck/></span>:<span className={`px-4 font-[500] text-lg py-[0.40rem] rounded-full border-[1px] ${stage===1?" text-yellow-50 bg-yellow-900 border-yellow-50 ":" bg-richblack-800 border-richblack-700 text-richblack-500 "}`}>1</span>}
                    </div>
                        <div className={`border-dashed border-[1px] w-[42%] ${stage>1?"border-yellow-50":"border-richblack-700"} h-0`}></div>
                    <div className='flex  flex-col items-center'>
                        {stage>2?<span className={`px-[0.9rem] font-[500] text-lg py-[0.9rem] rounded-full text-richblack-900 bg-yellow-50 "}`}><FaCheck/></span>:<span className={`px-4 font-[500] text-lg py-2 rounded-full border-[1px] ${stage===2?" text-yellow-50 bg-yellow-900 border-yellow-50 ":"  bg-richblack-800 border-richblack-700 text-richblack-500 "}`}>2</span>}
                    </div>
                        <div className={`border-dashed border-[1px] w-[42%] ${stage>2?"border-yellow-50":"border-richblack-700"} h-0`}></div>
                    <div className='flex  flex-col items-center'>
                        <span className={`px-4 font-[500] text-lg py-2 rounded-full border-[1px] ${stage===3?" text-yellow-50 bg-yellow-900 border-yellow-50 ":"  bg-richblack-800 border-richblack-700 text-richblack-500 "}`}>3</span>
                    </div>
                </div>
                <div className=' flex justify-between text-richblack-500 pt-4'>
                    <span className={`basis-[25%] text-right  ${stage===1?" text-yellow-50 ":" text-richblack-500 "} pr-[3%]`}>Course Information</span>
                    <span className={`basis-[50%] text-center ${stage===2?" text-yellow-50 ":" text-richblack-500 "} `}>Course Builder</span>
                    <span className={`basis-[25%] text-center ${stage===3?" text-yellow-50 ":" text-richblack-500 "} `}>Publish</span>
                </div>
            </div>
            {stage===1?<AddCourseBasicInfo  fetchCourse={fetchCourse} setStage={setStage}/>
            :stage===2?<CourseBuilder  fetchCourse={fetchCourse} submitHandler={courseBuilderSubmit} backHandler={backHandler}/>
            :stage===3?<PublishCourse courseId={course} fetchCourse={fetchCourse} submitHandler={publishCourseHandler} backHandler={backHandler}/>
            :<div>There has been some error please reload again or log in again if the error presists </div>}
            
        </div>
        <div className='basis-[30%] h-fit text-richblack-5 bg-richblack-800 border-[1px] border-richblack-700 rounded-lg p-4'>
            <h1 className='text-xl'>&#9889; Course Upload Tips</h1>
            <ul className='list-disc pl-5 text-sm  w-[100%]'>
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>Make Announcements to notify any important</li>
                <li>Notes to all enrolled students at once.</li>
            </ul>
        </div>
    </div>
  )
}
