import React, { useEffect, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { HiMiniPencil } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { LectureModal } from './LectureModal';
import { Lecture } from './Lecture';
import { setCourseInfo } from '../../../redux/slices/instructorSlice';
import { useDispatch, useSelector } from 'react-redux';
import {  addLecture, editSectionNameApi,editLectureApi } from '../../../services/instructor/Course';
import { InputField } from '../InputField';
import { StdButton } from '../StdButton';
import { FieldRequiredText } from './FieldRequiredText';
export const SectionDropdown = ({deleteSectionHandler,courseId,setSections,sectionIdx}) => {
    const [showLec,setshowLec] = useState(true);
    const [addLectureModal,setAddLectureModal] = useState(false);
    let sectionData = useSelector(({rootReducer})=>rootReducer.instructorSlice.courseInfo.sections[sectionIdx]);
    const [editNameActive,setEditName]=useState(false);
    const [editedSectionName,setSecName] = useState(sectionData.sectionName);
    const dispatcher = useDispatch();
    const sectionNameEditSaveHandler = async ()=>{
        const response = await editSectionNameApi(courseId,editedSectionName,sectionIdx);
        dispatcher(setCourseInfo(response)); 
        setEditName(false);
    }
    const editHandler = async (lectureFile,lectureTitle, lectureDesc,lectureIdx)=>{
        const response = await editLectureApi({lectureFile ,courseId, sectionIdx,lectureIdx, lectureTitle, lectureDesc});
        dispatcher(setCourseInfo(response));
    }
    const saveHandler = async (lectureFile,lectureTitle, lectureDesc)=>{
        const response = await addLecture({lectureFile ,courseId, sectionIdx, lectureTitle, lectureDesc});
        console.log(response);
        dispatcher(setCourseInfo(response))
        console.log(response);
    }
  return (
        <div className=' mx-4 '>
        {addLectureModal?<LectureModal closeModal={()=>setAddLectureModal(false)} saveHandlerFn={saveHandler} modalType={"Add Lecture"}/>:""}
            <div className='flex border-b-[1px] py-3  border-richblack-400 items-center justify-between'>
                {editNameActive?<div className='flex w-full'>
                    <InputField type="text" value={editedSectionName} setterFn={setSecName}/>
                    <FieldRequiredText data={editedSectionName} active={true} fieldName={"Section name"}/>  
                    <StdButton color="yellow" handler={sectionNameEditSaveHandler}>Save</StdButton>
                </div>
                :<div onClick={()=>setshowLec(!showLec)} className='flex items-center space-x-2 w-[100%]'>
                    {showLec?<IoMdArrowDropup/>:<IoMdArrowDropdown/>}
                    <span className='text-richblack-50 text-lg'>{sectionData.sectionName}</span>
                </div>}
                {editNameActive?"":<div className='flex items-center w-[7%] justify-between'> 
                    <HiMiniPencil onClick={()=>{setEditName(true)}}/>
                    <FaRegTrashAlt onClick={()=>{deleteSectionHandler(sectionIdx)}}/>
                </div>}
            </div>
            {showLec?
            <div>
                {sectionData.lectures.map((lecture,i)=>{
                    return (
                    <Lecture lecture={lecture} editHandler={editHandler} courseId={courseId} sectionIdx={sectionIdx} key = {i} index={i} />
                    )
                })}
                <div onClick={()=>setAddLectureModal(true)} className='flex py-3 items-center text-xl font-[500] w-[85%] mx-auto text-yellow-50 '>
                    <TiPlus/>Add Lecture
                </div>
            </div>:""}
        </div>
        
    )
}
