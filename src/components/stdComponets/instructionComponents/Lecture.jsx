import React from 'react'
import {deleteLectureApi} from "../../../services/instructor/Course"
import { FaRegTrashAlt } from "react-icons/fa";
import { HiMiniPencil } from "react-icons/hi2";
import { LectureModal } from './LectureModal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCourseInfo } from '../../../redux/slices/instructorSlice';
export const Lecture = ({lecture,index,courseId,editHandler,sectionIdx}) => {
    const dispatcher = useDispatch();
    const [editLectureModal,showEditModal] = useState(false);
    const saveHandler = async (lectureFile,lectureTitle, lectureDesc)=>{
       editHandler(lectureFile,lectureTitle, lectureDesc,index);
    }
    const deleteLecture = async ()=>{
        const data = await deleteLectureApi(index,sectionIdx,courseId);
        dispatcher(setCourseInfo(data.data));
    }
  return (  
        <div className='flex py-3 justify-between w-[85%] mx-auto border-b-[1px] border-richblack-400 '>
            <div>
                {lecture.lectureTitle}
            </div>
            <div className='flex items-center w-[7%] justify-between'> 
            <HiMiniPencil onClick={()=>showEditModal(true)}/>
            <FaRegTrashAlt onClick={deleteLecture}/>
            {editLectureModal?<LectureModal closeModal={()=>showEditModal(false)} saveHandlerFn={saveHandler} data={lecture} modalType={"Edit Lecture"}/>:""}
            </div>
        </div>
  )
}
