import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { HiMiniPencil } from "react-icons/hi2";
import { LectureModal } from './LectureModal';
import { useState } from 'react';
export const Lecture = ({lecture,index,editLecture}) => {
    const [editLectureModal,showEditModal] = useState(false);
    const [lectureData,setData] = useState(lecture);
    const saveLecture = (lectureData)=>{
        console.log("save edit lecture");
        // this funciton will call the backend api to save the lecture
        editLecture(index,lectureData);
    }
    const deleteLecture = (e)=>{
        console.log("delete lecture");
    }
  return (  
        <div className='flex py-3 justify-between w-[85%] mx-auto border-b-[1px] border-richblack-400 '>
            <div>
                {lectureData.name}
            </div>
            <div className='flex items-center w-[7%] justify-between'> 
            <HiMiniPencil onClick={()=>showEditModal(true)}/>
            <FaRegTrashAlt onClick={deleteLecture}/>
            {editLectureModal?<LectureModal showModal={showEditModal} backendSaveHandlerFn={saveLecture} data={lectureData} modalType={"Edit Lecture"}/>:""}
            </div>
        </div>
  )
}
