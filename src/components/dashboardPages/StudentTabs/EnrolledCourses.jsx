import React from 'react'
import { EnrolledCoursesData } from '../../../data/tempData'
import { Link, useNavigate } from 'react-router-dom'
import {BsThreeDotsVertical} from "react-icons/bs"
export const EnrolledCourses = () => {
  const navigator = useNavigate();
  navigator("dashboard/Enrolled Courses");
  return (
      <div className='basis-[100%] h-[93vh] overflow-auto'>
          <div className='w-[70%] mx-auto pb-14'>
            <div className='text-sm m-8 space-y-4'>
              <span className='text-richblack-300'>Home / Dashboard /</span>
              <span className='text-yellow-50'> Enrolled Courses</span>
              <h1 className='text-3xl '>Enrolled Courses</h1>
            </div>
            <div>
            <div className="flex text-richblack-50 rounded-t-md bg-richblack-700 p-4">
              <p className='basis-[50%]'>Course Name</p>
              <p className='basis-[20%]'>Time </p>
              <p className='basis-[30%]'>Progress</p>
            </div>
            <div className='border-x-2 border-richblack-700 border-b-2 rounded-b-lg'>
            {/* would like to add a filter bar to seperate completed and pending cources */}
              {EnrolledCoursesData.map(({courseName,courseThumbnail,courseDesc,courseId,timeSpent,progress})=>{
                  const sec = timeSpent%60;
                  timeSpent-=sec;
                  const totalMins = ((timeSpent)/60);
                  const mins = (totalMins%60);
                  const hours = ((totalMins-mins)/60);
                  const timeString = `${hours} h : ${mins} m : ${sec} s`;
              return (
              <Link to={`${courseId}`}>
              <div className={`p-4  border-richblack-700 border-t-2`}>
              {/* link these to that particular course  */}
                  <div className='h-[4rem] flex items-center '>
                    <div className='flex basis-[50%] items-center'>
                      <img className=" object-cover w-[4rem] h-[4rem] rounded-2xl " src={courseThumbnail} alt={courseName}/>
                      <div className='px-5'>
                        <h2>{courseName}</h2>
                        <p className='text-richblack-300'>{courseDesc}</p>
                      </div>
                    </div>
                    <div className='basis-[20%] text-richblack-50'>
                      {/* duration */}
                      {timeString}
                    </div>
                    <div className='basis-[30%] flex items-center justify-between'>
                      {/* progress bar */}
                      <div className='space-y-2 basis-[80%]'>
                        <div className='text-richblack-50 text-xs'>Progress : {progress}%</div>
                        <div className='bg-richblack-700 relative rounded-full'>
                          <div style={{width:`${progress}%`}} className={`h-2 rounded-full ${progress<25? " bg-pink-300 ":(progress>=25&&progress<=75)?"bg-blue-100":"bg-caribbeangreen-100"}`}/>
                        </div>
                      </div>
                      {/* 3 dots */}
                      <div className='text-3xl text-richblack-50'>
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
