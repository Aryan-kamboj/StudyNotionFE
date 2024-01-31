import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { HiMiniPencil } from "react-icons/hi2";
import { LectureModal } from './LectureModal';
import { useState } from 'react';
export const Lecture = ({lecture,index,editLecture}) => {
    console.log(lecture);
    const [editLectureModal,showEditModal] = useState(false);
    const [lectureData,setData] = useState(lecture);
    const saveLecture = (lectureData)=>{
        setData(lectureData);
        console.log("save edit lecture");
        // this funciton will call the backend api to save the lecture
        editLecture(index,lectureData);
    }
    const closeModal = ()=>{
        showEditModal(false);
    }
    const saveHandler = async (lectureFile,lectureTitle, lectureDesc)=>{
        // const response = await addLecture({lectureFile ,courseId, sectionIdx, lectureTitle, lectureDesc});
        // dispatch an action to update the course
        // console.log(response);
        console.log("hiii form lecture component and edit lecture modal")
    }
    const deleteLecture = (e)=>{
        console.log("delete lecture");
    }
  return (  
        <div className='flex py-3 justify-between w-[85%] mx-auto border-b-[1px] border-richblack-400 '>
            <div>
                {lectureData.lectureTitle}
            </div>
            <div className='flex items-center w-[7%] justify-between'> 
            <HiMiniPencil onClick={()=>showEditModal(true)}/>
            <FaRegTrashAlt onClick={deleteLecture}/>
            {editLectureModal?<LectureModal closeModal={closeModal} saveHandlerFn={saveHandler} data={lectureData} modalType={"Edit Lecture"}/>:""}
            </div>
        </div>
  )
}
