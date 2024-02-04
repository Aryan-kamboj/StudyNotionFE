/* eslint-disable react/prop-types */
import {useState} from 'react'
import { StdButton } from '../StdButton'
import { makeCoursePublicApi } from '../../../services/instructor/Course';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseInfo } from '../../../redux/slices/instructorSlice';

export const PublishCourse = ({backHandler,courseId}) => {
  const [checkbox,setCheckbox] = useState(useSelector(({rootReducer})=>rootReducer.instructorSlice.courseInfo.isPublic));
  const dispatcher = useDispatch();
  const submitHandler = async ()=>{
    const response = await makeCoursePublicApi(courseId,checkbox);
    console.log(response)
    dispatcher(setCourseInfo(response));
    checkbox?console.log("Public"):console.log("Private");
  }

  return (
    <div>
      <div className='bg-richblack-800 border-[1px] rounded-xl border-richblack-800 p-4'>
        <h1 className='text-2xl font-[500]'>Publish Settings</h1>
        <label className='flex space-x-4'>
        <input checked={checkbox} onChange={(e)=>setCheckbox(e.target.checked)} className='bg-richblack-800 border-solid border-richblack-500 border-[1px] appearance-' type="checkbox"/>
          <span>Make the couse public</span>
        </label>
      </div>
      <div className='flex space-x-4 justify-end mt-4'>
        <StdButton color="grey" handler={backHandler}>Back</StdButton>
        <StdButton color="yellow" handler={submitHandler}>Publish</StdButton>
      </div>
    </div>
  )
}
