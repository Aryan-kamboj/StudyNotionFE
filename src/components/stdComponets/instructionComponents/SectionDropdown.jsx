import React, { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import { HiMiniPencil } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { LectureModal } from './LectureModal';
export const SectionDropdown = ({section}) => {
    const [showLec,setshowLec] = useState(true);
    const [addLectureModal,setAddLectureModal] = useState(false);
    const [editLectureModal,setEditLectureModal] = useState(false);
    const expandSection = (e) =>{
        console.log(e.currentTarget.innerText);
        setshowLec(!showLec);
    }
    const editSection = (e) => {
        console.log(e.currentTarget.parentNode.attributes.section.value);
    }
    const deleteSection = (e) => {
        console.log(e.currentTarget.parentNode.attributes.section.value);
    }
    const editLecture = ()=>{
        console.log("edit lecture");
        setEditLectureModal(true)
    }
    const addLecture = ()=>{
        console.log("add lecture")
        setAddLectureModal(true);
        console.log(addLectureModal);
    }
  return (
        <div className=' mx-4 '>
            {addLectureModal?<LectureModal setLectureModal={setAddLectureModal} modalType={"Add Lecture"}/>:""}
            {editLectureModal?<LectureModal setLectureModal={setEditLectureModal} modalType={"Edit Lecture"}/>:""}
            <div className='flex border-b-[1px] py-3  border-richblack-400 items-center justify-between'>
                <div onClick={expandSection} className='flex items-center space-x-2 w-[100%]'>
                    <IoMdArrowDropdown />
                    <span className='text-richblack-50 text-lg'>{section.name}</span>
                </div>
                <div section={section} className='flex items-center w-[7%] justify-between'> 
                    <HiMiniPencil onClick={editSection}/>
                    <FaRegTrashAlt onClick={deleteSection}/>
                </div>
            </div>
            {showLec?
            <div>
                {section.lectures.map((lecture)=>{
                    return (
                    <div className='flex py-3 justify-between w-[85%] mx-auto border-b-[1px] border-richblack-400 '>
                        <div>
                            {lecture.name}
                        </div>
                        <div section={section} className='flex items-center w-[7%] justify-between'> 
                            <HiMiniPencil onClick={editLecture}/>
                            <FaRegTrashAlt onClick={deleteSection}/>
                        </div>
                    </div>
                    )
                })}
                <div onClick={addLecture} className='flex py-3 items-center text-xl font-[500] w-[85%] mx-auto text-yellow-50 '>
                    <TiPlus/>Add Lecture
                </div>
            </div>:""}
        </div>
        
    )
}
