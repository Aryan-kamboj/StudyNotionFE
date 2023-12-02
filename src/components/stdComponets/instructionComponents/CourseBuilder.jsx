import React, { useState } from 'react'
import { InputField } from '../InputField'
import { AiFillPlusCircle } from "react-icons/ai";
import { SectionsArea } from './SectionsArea';
export const CourseBuilder = () => {
  const [sectionName,setSecName] = useState("");
  const [sections,setSections] = useState([{name:"section1",lectures:[{name:"lecture1.1"},{name:"lecture1.2"},{name:"lecture1.3"}]},{name:"section2",lectures:[{name:"lecture2.1"},{name:"lecture2.2"}]}]);
  return (
    <div className='bg-richblack-800 border-[1px] rounded-xl border-richblack-800 p-4'>
      <h1 className='text-2xl font-[500]'>Course Builder</h1>
      <InputField label={"Section Name"} value={sectionName} setterFn={setSecName} required={true} placeholder={"Add a section to build course"}/>
      <button onClick={()=>setSections([...sections,sectionName])} className=' p-3 flex items-center justify-evenly w-[11rem] outline-none border-solid border-[1px] rounded-lg border-yellow-50 text-yellow-50'>Create Section<AiFillPlusCircle/></button>
      <SectionsArea sections = {sections}/>
    </div>
  )
}
