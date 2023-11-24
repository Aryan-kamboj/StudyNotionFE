import React ,{ useEffect, useState } from 'react'
import { InputField } from '../InputField';
import { StdButton } from '../StdButton';
import { TagsInput } from '../TagsInput';
import {RequirementInput} from "../RequirementInput";
import {FiUploadCloud} from "react-icons/fi"
import { catagories } from '../../../data/tempData';
import {IoIosArrowForward} from "react-icons/io"
import { useDropzone } from 'react-dropzone';
export const AddCourseBasicInfo = ({submitHandler}) => {
    const [thumbnail,setThumbnail] = useState(undefined)
    const removeThumbnail = (e)=>{
        e.preventDefault();
        setThumbnail(undefined);
    }
    const [tags,setTags] = useState([]);
    const [requirements,setRequirements]=useState([]);
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({maxFiles:1});
    // console.log(acceptedFiles)
    useEffect(()=>{
        acceptedFiles.length!==0?setThumbnail(URL.createObjectURL(acceptedFiles[0])):setThumbnail(undefined);
        console.log(thumbnail);
    },[acceptedFiles])

  return (
    <div className='bg-richblack-800 border-[1px] border-richblack-700 p-4 space-y-4 rounded-xl'>
        <form className=' space-y-2' id={"basicInfo"} onSubmit={submitHandler}>
            <InputField label={"Course Title"} required={true} placeholder={"Enter Course Title"} />
            <InputField label={"Course Short Description"} type="textarea" lines={3} required={true} placeholder={"Enter Course Description"} />
            <InputField label={"Course Price"} required={true} placeholder={"Enter Course Price"} />
            <div>
                <p className='text-sm pb-2'>Catagory <span className='text-pink-200 pl-[0.1rem]'>*</span></p>
                <select className='outline-none bg-richblack-700 p-3 rounded-lg border-b-[1px] border-richblack-300 w-[100%]'>
                    <option>Select Catagory</option>
                    {catagories.map((catagory,key)=>{
                        return <option key={key} val={catagory}>{catagory}</option>
                    })}
                </select>
            </div>                   
    {/* tags */}
            <TagsInput tags={tags} setTags={setTags} required={true} label={"Tags"} placeholder={"Write a tag and hit Enter"}/>
    {/* upload thumbnail */}
            <div>
            <label>
                <div className='text-sm pb-2'>Course Thumbnail <span className='text-pink-200'>*</span></div>
                <div className='bg-richblack-700 max-h-fit border-[1px] border-richblack-600 border-dashed rounded-lg p-8'>
                {thumbnail?
                <div>
                    <img src={thumbnail} className='object-cover max-h-[100%] w-[100%] rounded-lg' alt={"There has been some error please upload again"}/>
                    <button onClick={removeThumbnail}>Cancel</button>
                </div>
                :<div {...getRootProps({className: 'dropzone'})} className='flex flex-col h-32 justify-between items-center '>
                        <div className='p-4 bg-richblack-900 text-3xl text-yellow-50 rounded-full w-fit'><FiUploadCloud/></div>
                        <p className='text-richblack-200 text-xs font-[500]'>Drag and drop an image, or <span className='text-yellow-50'>Browse</span> *Max size 6MB</p>
                        <ul className='list-disc w-[60%] text-richblack-200 text-xs font-[500] flex justify-between'>
                            <li>Aspect ratio 16:9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>
                        <input {...getInputProps()} id="thumbnail" required={true} className='hidden' />
                    </div>
                }
                </div>
            </label>
            </div>
            <RequirementInput requirements={requirements} setRequirements={setRequirements}/>
            <InputField type={"textarea"} lines={4} label={"Course Benifits"} required={true} placeholder={"Enter benifits of the course "} />
        </form>
        <StdButton form={"basicInfo"} type={"submit"} color="yellow" accept="image/png, image/jpeg, image/jpg, image/">Next<IoIosArrowForward/></StdButton>
        </div>
  )
}
