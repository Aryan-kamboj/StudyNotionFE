import {useState} from 'react'
import { BiSolidUpArrow,BiSolidDownArrow } from "react-icons/bi";
import { MdCheckBoxOutlineBlank,MdCheckBox } from "react-icons/md";

export const SectionDropdownViewCourse = ({section,sectionIdx,watchedInfo,courseId,setWatching}) => {
  const [Show,setShow] = useState(false);
  // console.log(watchedInfo);
  const clickHandler = (e)=>{
    const str = `${sectionIdx}.${e.currentTarget.attributes.lectureIdx.value}`;
    console.log(str);
    setWatching(str)
    e.stopPropagation();
  }
  return (
    <div>
      <div onClick={()=>setShow(!Show)} className='text-richblack-50 px-6 justify-between bg-richblack-700 h-[3rem] border-b-[1px] border-richblack-600 items-center  flex '>
        <span>{section?.sectionName}</span>
        {Show?<BiSolidUpArrow/>:<BiSolidDownArrow/>}
      </div>
      {Show?section?.lectures?.map((lecture,i)=>{
        {/* console.log(lecture); */}
        const watched = watchedInfo?.includes(`${sectionIdx}.${i}`);
        return <div onClick={clickHandler} lectureidx={i} className='text-richblack-50 h-[2rem] flex items-center space-x-2 px-6' key={i}>{watched?<MdCheckBox/>:<MdCheckBoxOutlineBlank/>}<span>{lecture.lectureTitle}</span></div>}
        ):""}
    </div>
  )
}
