import React,{useState} from 'react'
import { BiSolidUpArrow,BiSolidDownArrow } from "react-icons/bi";
import { MdCheckBoxOutlineBlank,MdCheckBox } from "react-icons/md";
import { useNavigate } from 'react-router';

export const SectionDropdownViewCourse = ({section,courseId}) => {
  const [Show,setShow] = useState(false);
  const Watched = false;
  const navigator = useNavigate();
  const clickHandler = (e)=>{
    console.log(e.currentTarget.parentNode.firstChild.innerText);
    const sectionName = e.currentTarget.parentNode.firstChild.innerText;
    const lectureName = e.currentTarget.innerText;
    navigator(`/view-course/${courseId}/${sectionName}/${lectureName}`)
  }
  return (
    <div>
      <div onClick={()=>setShow(!Show)} className='text-richblack-50 px-6 justify-between bg-richblack-700 h-[3rem] border-b-[1px] border-richblack-600 items-center  flex '>
        <span>{section.section}</span>
        {Show?<BiSolidUpArrow/>:<BiSolidDownArrow/>}
      </div>
      {Show?section.lectures.map((lecture,i)=>{
        return <div onClick={clickHandler} className='text-richblack-50 h-[2rem] flex items-center space-x-2 px-6' key={i}>{Watched?<MdCheckBox/>:<MdCheckBoxOutlineBlank/>}<span>{lecture.title}</span></div>}
        ):""}
    </div>
  )
}
