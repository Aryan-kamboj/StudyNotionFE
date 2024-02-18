import  { useState } from 'react'
import { InputField } from '../InputField';
import { StdButton } from '../StdButton';
import toast from 'react-hot-toast';
import { ImCross } from "react-icons/im";
export const DeleteCourseConfirmationModal = ({courseName,deletingFn,setModal}) => {
    const [confirm,setConf] = useState("");
    const deleteHandler = ()=>{
        if(confirm===courseName){
            deletingFn();
            setModal(false);
        }
        else
            toast.error("Confirm course name first ");
    }
  return (
    <div className='absolute flex items-center justify-center backdrop-blur h-[100vh] w-[100vw] right-0 top-0 z-[1000]'>
        <div className='w-[35rem] h-[60vh] flex flex-col justify-between bg-richblack-800 p-8 rounded-2xl border-[1px] border-richblack-600'>
            <ImCross onClick={()=>setModal(false)} className='absolute text-richblack-200 right-[30rem]'/>
            <span className='text-2xl block text-[rgb(255,180,180)]'>You want to delete the course<span className='block text-[rgb(255,0,0)]'> {courseName}</span></span>
            <span className='text-richblack-200 text-lg'>*Students who are enrolled in the course will still be able to access the course, but this course will not be publicly visible and will be deleted from your dashboard.</span>
            <span className='text-richblack-200'>To confirm type <span className='text-[rgb(255,0,0)]'>{courseName}</span></span>
            <InputField placeholder={"Name of the course to be deleted"} value={confirm} setterFn={setConf}/>
            <StdButton color={confirm===courseName?"yellow":"grey"} handler={deleteHandler}>Delete</StdButton>
        </div>
    </div>
  )
}
