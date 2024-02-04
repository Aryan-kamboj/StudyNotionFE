/* eslint-disable react/prop-types */
import  {  useState } from 'react'
import { InputField } from '../InputField'
import { AiFillPlusCircle } from "react-icons/ai";
import { SectionDropdown } from './SectionDropdown';
import { StdButton } from '../StdButton';
import { FaArrowRight,FaArrowLeft } from "react-icons/fa";
import { addSectionApi } from '../../../services/instructor/Course';
import {deleteSectionApi} from "../../../services/instructor/Course";
import {shallowEqual, useDispatch, useSelector} from "react-redux"
import toast from 'react-hot-toast';
import { setCourseInfo } from '../../../redux/slices/instructorSlice';
export const CourseBuilder = ({submitHandler,backHandler}) => {
  const [sectionName,setSecName] = useState("");
  const dispatcher = useDispatch();
  const courseDetails = useSelector(({rootReducer})=>rootReducer.instructorSlice.courseInfo,shallowEqual);
  const sections = courseDetails?.sections;

  console.log(sections);
  const addSectionHandler = async ()=>{
    console.log(!(sectionName.length===0));
    if(!(sectionName.length===0)){
      const {updatedCourse} = await addSectionApi(sectionName,courseDetails._id); 
      dispatcher(setCourseInfo(updatedCourse));
    }
    else
     toast.error("Add section name first");
  }
  const deleteSectionHandler = async (sectionIdx)=>{
    const {updatedCourse}= await deleteSectionApi(sectionIdx,courseDetails._id);
    dispatcher(setCourseInfo(updatedCourse));
  }
    const nextHandler = ()=>{
      console.log("Next");
      submitHandler();
    }
  return (
    <div>
      <div className='bg-richblack-800 border-[1px] space-y-4 rounded-xl border-richblack-800 p-4'>
      <h1 className='text-2xl font-[500]'>Course Builder</h1>
      <InputField label={"Section Name"} value={sectionName} setterFn={setSecName} required={true} placeholder={"Add a section to build course"}/>
      <button onClick={addSectionHandler} className=' p-3 flex items-center justify-evenly w-[11rem] outline-none border-solid border-[1px] rounded-lg border-yellow-50 text-yellow-50'>Create Section<AiFillPlusCircle/></button>

      <div className='bg-richblack-700 text-richblack-400 border-[1px] rounded-xl border-richblack-600'>
      {sections.map((section,i)=>{
        return <SectionDropdown key={i} courseId={courseDetails?._id} sectionIdx={i} deleteSectionHandler={deleteSectionHandler} sectionData={section} />
      })}
      </div>
    </div>
    <div className='flex mt-4 space-x-4 justify-end'>
      <StdButton color="grey" handler={backHandler}><FaArrowLeft/> Back</StdButton>
      <StdButton color="yellow" handler={nextHandler}>Next <FaArrowRight/></StdButton>
    </div>
    </div>
  )
}


// name:"section1",
//       lectures:[{name:"lecture1.1",
//                 desc:"lectureDesc",
//                 lectureFile:undefined}
//                 ,{name:"lecture1.2",
//                 desc:"lectureDesc1",
//                 lectureFile:undefined}
//                 ,
//                 {name:"lecture1.3",
//                 desc:"lectureDesc2",
//                 lectureFile:"https://res.cloudinary.com/studynotion/image/upload/v1696274432/studyNotion/b9b4viqiilgswnrtgasv.jpg"}
//               ]},{name:"section2",lectures:[{name:"lecture2.3"},{name:"lecture2.2"}]