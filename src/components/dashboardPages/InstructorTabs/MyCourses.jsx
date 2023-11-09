import React from 'react'
import {AiOutlinePlusCircle,AiFillCheckCircle,AiFillClockCircle} from 'react-icons/ai'
import {BsCurrencyRupee} from "react-icons/bs"
import {MdModeEditOutline,MdOutlineDeleteForever} from "react-icons/md"
import { myCoursesData } from '../../../data/tempData'
import { StdButton } from '../../stdComponets/StdButton'
import { useNavigate } from 'react-router'
export const MyCourses = ({setTab}) => {
  const navigator = useNavigate(); 
  const editHandler = (e)=>{
    console.log("edit");
  }  
  const deleteHandler = (e)=>{
    console.log("delete");
  }
  const newCourseHandler = (e)=>{
    navigator("add-course");
    setTab("add-course");
    console.log("new");
  }
  return (
    <div className=' m-8 pt-14 max-tablet:pt-0 overflow-auto hideScrollBars h-fit'>
        <div className=' mx-auto pb-14 flex justify-between items-center'>
          <div className='text-sm space-y-4 max-tablet:space-y-2'>
            <span className='text-richblack-300'>Home / Dashboard /</span>
            <span className='text-yellow-50'>My Courses</span>
            <h1 className='text-3xl '>My Courses</h1>
          </div>
          <div><StdButton color="yellow" handler={newCourseHandler}><AiOutlinePlusCircle/><span>New</span></StdButton></div>
        </div>
        <div className='border-[1px] border-richblack-800 rounded-lg'>
          <div className='text-richblack-100 p-4 flex justify-between max-tablet:hidden'>
            <span className='basis-[65%] '>COURSES</span>
            <span className='basis-[15%] px-6'>DURATION</span>
            <span className='basis-[10%]'>PRICE</span>
            <span className='basis-[10%]'>ACTIONS</span>
          </div>
          <div className=''>
            {myCoursesData.map(({title,thumbnail,duration,createdAt,published,description,price},id)=>{
              const sec = duration%60;
              duration-=sec;
              const totalMins = ((duration)/60);
              const minutes = (totalMins%60);
              const hour = ((totalMins-minutes)/60);
              const timeString = `${hour} h : ${minutes} m `;
      
              const months= ["January","February","March","April","May","June","July",
                          "August","September","October","November","December"];
              const dateCreated = new Date(createdAt);
              const date = dateCreated.getDate();
              const month = months[dateCreated.getMonth()];
              const year = dateCreated.getFullYear();
              const hours = dateCreated.getHours()%12;
              const mins = (dateCreated.getMinutes()<10?`0${dateCreated.getMinutes()}`:dateCreated.getMinutes());
              const am_pm = dateCreated.getHours()/12?"PM":"AM";
              return (
                <div key={id} className='flex p-4 text-richblack-100'>
                  <div className='basis-[65%] flex space-x-4  '>
                    <img src={thumbnail} alt={title} className='min-w-[14rem] max-w-[14rem] max-tablet:w-[5rem] min-h-[9rem] max-h-[10rem] object-cover rounded-xl'/>
                    <div className='flex justify-between w-[65%] flex-col'>
                      <h1 className='text-2xl font-[500]'>{title}</h1>
                      <p className='text-richblack-100 text-sm'>{description}</p>
                      <p className='flex items-center space-x-2 text-white'><span>Created at {month} {date}, {year} | {hours}:{mins} {am_pm}</span></p>
                      {published?<span className='text-yellow-100 text-sm bg-richblack-700 rounded-full flex w-fit px-2 py-1 items-center space-x-2'><AiFillCheckCircle/><span>Published</span></span>:<span className='text-pink-100 text-sm bg-richblack-700 rounded-full flex w-fit px-2 py-1 items-center space-x-2'><AiFillClockCircle/><span>Drafted</span></span>}
                    </div>
                  </div>
                  <div className='basis-[15%] items-center px-6 flex text-sm'>{timeString}</div>
                  <div className='basis-[10%] flex items-center '><BsCurrencyRupee/>{price}</div>
                  <div className='basis-[10%] flex items-center text-2xl space-x-4'><MdModeEditOutline onClick={editHandler}/><MdOutlineDeleteForever onClick={deleteHandler}/></div>
              </div>
              )
            })
            
            }
          </div>
        </div>
    </div>
  )
}
