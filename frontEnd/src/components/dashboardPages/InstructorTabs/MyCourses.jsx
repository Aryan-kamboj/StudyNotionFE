/* eslint-disable react/no-unknown-property */
import {AiOutlinePlusCircle,AiFillCheckCircle,AiFillClockCircle} from 'react-icons/ai'
import {BsCurrencyRupee} from "react-icons/bs"
import {MdModeEditOutline,MdOutlineDeleteForever} from "react-icons/md"
import { StdButton } from '../../stdComponets/StdButton'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCourseApi, getMyCoursesApi } from '../../../services/instructor/Course'
import { updateMyCources } from '../../../redux/slices/UserDataSlice'
import { useEffect, useState } from 'react'
import { setCurrentlyEditing } from '../../../redux/slices/instructorSlice'
import { DeleteCourseConfirmationModal } from '../../stdComponets/instructorComponents/deleteCourseConfirmationModal'
export const MyCourses = ({setTab}) => {
  const dispatcher = useDispatch();
  const myCoursesData = useSelector(({rootReducer})=>rootReducer.UserDataSlice.myCourses);
  const [deleteModal,setDeleteModal] = useState(false);
  const [courseDelete,setToDelete] = useState("");
  const [courseNameDel,setCourseNameDelete] = useState("");
  useEffect(()=>{
    (async ()=>{
      console.log("hii from get my cources");
      const data = await getMyCoursesApi();
      console.log(data);
      dispatcher(updateMyCources(data));
    })()
  },[]);
  const navigator = useNavigate(); 
  const editHandler = (e)=>{
    e.stopPropagation();
    const courseId = e.currentTarget.attributes.courseid.value;
    dispatcher(setCurrentlyEditing(courseId));
    navigator("add-course")
    setTab("add-course");
      console.log("edit",courseId);
  }  
  const deleteHandler = (e)=>{
    e.stopPropagation();
    setToDelete(e.currentTarget.attributes.courseid.value);
    setCourseNameDelete(e.currentTarget.attributes.coursename.value)
    setDeleteModal(true); 
  }
  const deletingFn = async ()=>{
    const data = await deleteCourseApi(courseDelete);
    console.log(data);
    dispatcher(updateMyCources(data));
    console.log("delete");
  }
  const newCourseHandler = ()=>{
    dispatcher(setCurrentlyEditing(""));
    navigator("add-course");
    setTab("add-course");
    console.log("new");
  }
  return (
    <div className=' m-8 pt-14 max-tablet:pt-0 overflow-auto hideScrollBars h-fit'>
      {deleteModal?<DeleteCourseConfirmationModal courseName={courseNameDel} deletingFn={deletingFn} setModal={setDeleteModal}  />:""}
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
            {myCoursesData?.map(({courseName,thumbnail,duration,createdAt,isPublic,courseDesc,coursePrice,courseId},id)=>{
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
                    <img src={thumbnail} alt={courseName} className='min-w-[14rem] max-w-[14rem] max-tablet:w-[5rem] min-h-[9rem] max-h-[10rem] object-cover rounded-xl'/>
                    <div className='flex justify-between w-[65%] flex-col'>
                      <h1 className='text-2xl font-[500]'>{courseName}</h1>
                      <p className='text-richblack-100 text-sm'>{courseDesc}</p>
                      <p className='flex items-center space-x-2 text-white'><span>Created at {month} {date}, {year} | {hours}:{mins} {am_pm}</span></p>
                      {isPublic?<span className='text-yellow-100 text-sm bg-richblack-700 rounded-full flex w-fit px-2 py-1 items-center space-x-2'><AiFillCheckCircle/><span>Published</span></span>:<span className='text-pink-100 text-sm bg-richblack-700 rounded-full flex w-fit px-2 py-1 items-center space-x-2'><AiFillClockCircle/><span>Drafted</span></span>}
                    </div>
                  </div>
                  <div className='basis-[15%] items-center px-6 flex text-sm'>{timeString}</div>
                  <div className='basis-[10%] flex items-center '><BsCurrencyRupee/>{coursePrice}</div>
                  <div className='basis-[10%] flex items-center text-2xl space-x-4'><MdModeEditOutline courseid = {courseId} onClick={editHandler}/><MdOutlineDeleteForever coursename = {courseName} courseid = {courseId} onClick={deleteHandler}/></div>
              </div>
              )
            })
            
            }
          </div>
        </div>
    </div>
  )
}
