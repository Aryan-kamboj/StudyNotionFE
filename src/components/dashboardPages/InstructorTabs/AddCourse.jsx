import React, { useState } from 'react';
import {IoIosArrowBack} from "react-icons/io";
import { useNavigate } from 'react-router';
import { AddCourseBasicInfo } from '../../stdComponets/instructionComponents/AddCourseBasicInfo';

export const AddCourse = ({setTab}) => {
    const navigator = useNavigate();
    const [stage,setStage]=useState(1);
    const submitHandler = (e)=>{
        setStage(2);
    }
  return (
    <div className='p-8 flex max-tablet:flex-col'>
        <div className='basis-[70%]'>
            <div className='flex space-x-4 items-center text-richblack-300' onClick={()=>{navigator("my-courses");setTab("my-courses");}}> 
                <IoIosArrowBack/> Back to Dashboard
            </div>
            <div className='flex flex-col mt-4 justify-between '>
                <div className='flex items-center mx-[10%]'>
                    <div className='flex w-fit flex-col items-center justify-center'>
                        <span className={`px-4 font-[500] text-lg py-[0.40rem] rounded-full border-[1px] ${stage===1?" text-yellow-50 bg-yellow-900 border-yellow-50 ":" bg-richblack-800 border-richblack-700 text-richblack-500 "}`}>1</span>
                    </div>
                        <div className='border-dashed border-[1px] justify-center w-[42%] border-richblack-700 h-0'></div>
                    <div className='flex  flex-col items-center'>
                        <span className={`px-4 font-[500] text-lg py-2 rounded-full border-[1px] ${stage===2?" text-yellow-50 bg-yellow-900 border-yellow-50 ":"  bg-richblack-800 border-richblack-700 text-richblack-500 "}`}>2</span>
                    </div>
                        <div className='border-dashed border-[1px] w-[42%] border-richblack-700 h-0'></div>
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
            <AddCourseBasicInfo submitHandler={submitHandler}/>
        </div>
        <div className='basis-[30%] text-richblack-5 bg-richblack-800 border-[1px] border-richblack-700 rounded-lg p-4'>
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
