import { useEffect, useState } from 'react'
import {AiOutlineDown,AiOutlineUp,AiFillVideoCamera} from "react-icons/ai"
export const SectionDropdown = ({collapseAll,section}) => {
    const [showLec,setShowLec]=useState(false);
    const clickHandler=()=>{
        setShowLec(!showLec);
    }
    useEffect(()=>{
        setShowLec(false);
    },[collapseAll])

    // const [height,setHeight] = useState(`h-[${4*section.lectures.length}rem]`);
    // useEffect(()=>{
    //     setHeight(`h-[${4*section.lectures.length}rem]`);
    // },[])

    // console.log(typeof height)
  return (
    <div className='duration-500 '>
        <div onClick={clickHandler} className={`text-white flex justify-between items-center px-6 bg-richblack-700 border-[0.5px] border-richblack-500 h-[4rem] border-b-0`}>
            <div className='flex items-center space-x-4 select-none '> 
                {showLec?
                <AiOutlineDown/>:<AiOutlineUp/>}
                <p>{section.sectionName}</p>
            </div>
            <p className='text-yellow-100'>{section.lectures.length} lecture(s)</p>
        </div> 
        <div className={showLec?` overflow-hidden duration-500 border-[0.5px] border-y-0 border-richblack-500 `:" duration-500 border-richblack-500"}>
        {section.lectures.map((lecture,i)=>{
                return (
                <div key={i} className={`px-6 flex overflow-hidden duration-500 items-center ${showLec?"h-[4rem]":" duration-500 overflow-hidden  h-0 text-transparent "} justify-between` }>
                    <span className="flex space-x-2 items-center">
                        <AiFillVideoCamera/>
                        <p>{lecture.lectureTitle}</p>
                    </span>
                    <p>{lecture.length}</p>
                </div>)
            })}
        </div>
    </div>
  )
}
