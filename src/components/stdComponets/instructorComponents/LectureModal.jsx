import React,{useEffect, useState,useRef} from 'react'
import { FaXmark } from "react-icons/fa6";
import {FiUploadCloud} from "react-icons/fi";
import { useDropzone } from 'react-dropzone';
import { InputField } from '../InputField';
import { StdButton } from '../StdButton';
import { FieldRequiredText } from '../FieldRequiredText';
export const LectureModal = ({closeModal,data,modalType,saveHandlerFn}) => {
    // console.log(data);
    const [lectureFileUrl,setLectureFileUrl] = useState();
    const [lectureFileData,setFileData] = useState();
    const [lectureName,setLectureName] = useState(data?.lectureTitle);
    const [lectureDesc,setLectureDesc] = useState(data?.lectureDesc);
    const [req_check,setCheck] = useState(false);
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({maxFiles:1});
    useEffect(()=>{
        if(acceptedFiles.length!==0)
        {
            console.log(acceptedFiles)
            setLectureFileUrl(URL.createObjectURL(acceptedFiles[0]));
            console.log(lectureFileUrl)
            setFileData(acceptedFiles[0]);
            console.log(lectureFileData)
        }   
        else{
            setLectureFileUrl(data?.link);
            setFileData(undefined);
        }
    },[acceptedFiles,data?.lectureFile]);
    const removeLectureFile = (e)=>{
        e.preventDefault();
        setLectureFileUrl(undefined);
    }
    document.body.style.overflowY="hidden";
    document.addEventListener("keydown",(e)=>{
        if(e.keyCode===9){
            e.preventDefault();
        }
    })
    const hideModal = ()=>{
        console.log("closeModal");
        document.body.style.overflowY="scroll";
        console.log(closeModal)
        closeModal();
    }
    const saveButtonHandler = async ()=>{
        setCheck(true);
        console.log(lectureFileData)
        if((lectureFileData||lectureFileUrl)&&lectureName&&lectureDesc){
            console.log("hiii")
            await saveHandlerFn(lectureFileData ,lectureName, lectureDesc);
            hideModal();
        }

    }
  return (
    <div className={`fixed overflow-y-scroll z-[100] h-[100vh] w-[100vw] flex justify-center top-0 left-0 bg-[rgba(10,10,10,0.51)] `}>
        {/* <button onClick={closeModal}>closeMe</button> */}
        <div className='bg-richblack-800 w-[50%] rounded-xl h-fit my-auto align-middle '>
            <div className='text-white text-2xl rounded-t-xl flex justify-between items-center px-4 bg-richblack-600 h-[2.7rem]'>
                <span>{modalType}</span>
                <FaXmark onClick={hideModal}/>
            </div>
            <div className='p-4 space-y-4'>
                <label>
                    <div className='text-sm pb-2'>Course lectureFile <span className='text-pink-200'>*</span></div>
                    <div className='bg-richblack-700 max-h-fit border-[1px] text-white border-richblack-600 border-dashed rounded-lg p-8'>
                    {lectureFileUrl?
                    <div>
                        <video controls className='mx-auto'>
                            <source src={lectureFileUrl}></source>
                        </video>
                        {/* <img src={lectureFileUrl} className='object-cover max-h-[100%] w-[100%] rounded-lg' alt={"There has been some error please upload again"}/> */}
                        <button onClick={removeLectureFile}>Cancel</button>
                    </div>
                    :<div {...getRootProps({className: 'dropzone'})} name="lectureFile" className='flex flex-col h-32 justify-between items-center '>
                            <div className='p-4 bg-richblack-900 text-3xl text-yellow-50 rounded-full w-fit'><FiUploadCloud/></div>
                            <p className='text-richblack-200 text-xs font-[500]'>Drag and drop a file, or <span className='text-yellow-50'>Browse</span></p>
                            <ul className='list-disc w-[60%] text-richblack-200 text-xs font-[500] flex justify-between'>
                                <li>Aspect ratio 16:9</li>
                                <li>Recommended size 1024x576</li>
                            </ul>
                            <input {...getInputProps()}  id="lectureFile" required={true} className='' />
                        </div>
                    }
                    </div>
                </label>
                <FieldRequiredText fieldName={"Lecture file"} active={req_check} data={lectureFileUrl} />
                <InputField required={true} label={"Lecture Title"} setterFn={setLectureName} value={lectureName} placeholder={"Enter lecture Title"}/>
                <FieldRequiredText fieldName={"Lecture Title"} active={req_check} data={lectureName} />
                <InputField required={true} type={"textarea"} lines={4} label={"Lecture Description"} value={lectureDesc} setterFn={setLectureDesc}/>
                <FieldRequiredText fieldName={"Lecture Description"} active={req_check} data={lectureDesc} />
                <div className='flex flex-row-reverse'><StdButton color={"yellow"} handler={saveButtonHandler}>Save</StdButton></div>
            </div>
        </div>
    </div>
  )
}
