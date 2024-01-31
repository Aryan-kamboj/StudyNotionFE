import React, { useEffect, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { HiMiniPencil } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { LectureModal } from './LectureModal';
import { Lecture } from './Lecture';
import { addLecture } from '../../../services/instructor/Course';
import { setCourseInfo } from '../../../redux/slices/instructorSlice';
import { useDispatch, useSelector,shallowEqual } from 'react-redux';
export const SectionDropdown = ({deleteSectionHandler,courseId,setSections,sectionIdx}) => {
    const [showLec,setshowLec] = useState(true);
    const [addLectureModal,setAddLectureModal] = useState(false);
    const sectionData = useSelector(({rootReducer})=>rootReducer.instructorSlice.courseInfo.sections[sectionIdx],shallowEqual);
    console.log(sectionData);
    const [section,setSection]=useState(sectionData);
    const lectures = sectionData.lectures
    useEffect(()=>{
        setSection(sectionData);
        console.log(sectionData)
    },[sectionData])
    const dispatcher = useDispatch();
    const expandSection = (e) =>{
        setshowLec(!showLec);
    }
    const editSection = (e) => {
        // console.log(e.currentTarget.parentNode.attributes.section.value);
        // setSection(section);
    }
    const deleteSection = (e) => {
        // console.log(e.currentTarget.parentNode.attributes.section.value);
    }
    const closeModal = ()=>{
        setAddLectureModal(false)
    }
    const showModal = ()=>{
        setAddLectureModal(true);
    }
    const saveHandler = async (lectureFile,lectureTitle, lectureDesc)=>{
        const response = await addLecture({lectureFile ,courseId, sectionIdx, lectureTitle, lectureDesc});
        console.log(response);
        dispatcher(setCourseInfo(response))
        console.log(response);
    }

    const editLecture = (index,lecture)=>{
        let newSection = section;
        newSection.lectures[index] = lecture;
        setSections(sectionIdx,newSection);
    }

  return (
        <div className=' mx-4 '>
        {addLectureModal?<LectureModal closeModal={closeModal} saveHandlerFn={saveHandler} modalType={"Add Lecture"}/>:""}
            <div className='flex border-b-[1px] py-3  border-richblack-400 items-center justify-between'>
                <div onClick={expandSection} className='flex items-center space-x-2 w-[100%]'>
                    {showLec?<IoMdArrowDropup/>:<IoMdArrowDropdown/>}
                    <span className='text-richblack-50 text-lg'>{section.sectionName}</span>
                </div>
                <div section={section} className='flex items-center w-[7%] justify-between'> 
                    <HiMiniPencil onClick={editSection}/>
                    <FaRegTrashAlt onClick={()=>{deleteSectionHandler(sectionIdx)}}/>
                </div>
            </div>
            {showLec?
            <div>
                {lectures.map((lecture,i)=>{
                    return (
                    <Lecture lecture={lecture} key = {i} index={i} editLecture = {editLecture}  />
                    )
                })}
                <div onClick={showModal} className='flex py-3 items-center text-xl font-[500] w-[85%] mx-auto text-yellow-50 '>
                    <TiPlus/>Add Lecture
                </div>
            </div>:""}
        </div>
        
    )
}
