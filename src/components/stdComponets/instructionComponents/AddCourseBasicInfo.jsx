import React ,{ useEffect, useState } from 'react'
import { InputField } from '../InputField';
import { StdButton } from '../StdButton';
import { TagsInput } from '../TagsInput';
import {RequirementInput} from "../RequirementInput";
import {FiUploadCloud} from "react-icons/fi"
// import { categories } from '../../../data/tempData';
import {IoIosArrowForward} from "react-icons/io"
import { useDropzone } from 'react-dropzone';
import { FieldRequiredText } from './FieldRequiredText';
import { useSelector } from 'react-redux';
import { createCourse,editCourse } from '../../../services/instructor/Course';
import { setCurrentlyEditing } from '../../../redux/slices/UserDataSlice';
import { getCourseInfo } from "../../../services/user/userCourseApis";
export const AddCourseBasicInfo = ({setStage,courseDetails}) => {
    const categories = useSelector(({rootReducer})=>{
        console.log(rootReducer.UI_slice.categories)
        return rootReducer.UI_slice.categories;
    })

    console.log(courseDetails?.courseDesc);
    const [requiredTextActive,setRqTxt] = useState(false);
    const [courseTitle,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [price,setPrice] = useState();
    const [category,setCategory] = useState("");
    const [benifits,setBenifits] = useState("");
    const [thumbnail,setThumbnail] = useState(undefined);
    const [tags,setTags] = useState([]);
    const [requirements,setRequirements]=useState([]);
    useEffect(()=>{
        setTitle(courseDetails?.courseName)
        setDesc(courseDetails?.courseDesc)
        setPrice(courseDetails?.coursePrice)
        setCategory(courseDetails?.courseCategory)
        setBenifits(courseDetails?.benifits)
        setThumbnail(courseDetails.thumbnail?courseDetails.thumbnail:undefined)
        setTags(courseDetails.tags?courseDetails.tags:[])
        setRequirements(courseDetails.requirements?courseDetails.requirements:[])  
    },[courseDetails]);
    const removeThumbnail = (e)=>{
        e.preventDefault();
        setThumbnail(undefined);
    }
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({maxFiles:1,accept: {
        'image/jpeg': [],
        'image/png': [],
        // 'video/mp4':[],
        // 'video/mov':[],
        // 'video/WebM':[],
        // 'video/Ogg':[]
    }});
    let thumbnailFile = acceptedFiles[0]?acceptedFiles[0]:null;
    const handleSubmit = async ()=>{
        setRqTxt(true);
        if(courseTitle&&desc&&price&&category&&benifits&&thumbnail&&(tags.length!==0)&&(requirements.length!==0)){
            const basicInfo = {
                courseName:courseTitle,
                courseDesc:desc,
                coursePrice:price,
                courseCategory:category,
                benifits:benifits,
                thumbnail:thumbnailFile,
                tags:JSON.stringify(tags),
                requirements:JSON.stringify(requirements)
            }
            if(courseDetails)
            {
                await editCourse(basicInfo,courseDetails._id);
            }
            else
                console.log("save ho rha hai tumhara course ")
                // setCurrentlyEditing(await createCourse(basicInfo));
            setStage(2);
        }
    }
    useEffect(()=>{
        if(acceptedFiles.length!==0){
            setThumbnail(URL.createObjectURL(acceptedFiles[0]));
        }
        else{
            setThumbnail(undefined);
        }
    },[acceptedFiles])

  return (
    <div className='bg-richblack-800 border-[1px] border-richblack-700 p-4 space-y-4 rounded-xl'>
        <form className=' space-y-2' id={"basicInfo"} onSubmit={handleSubmit}>
            <InputField value={courseTitle} setterFn={setTitle} label={"Course Title"} required={true} placeholder={"Enter Course Title"} />
            <FieldRequiredText active={requiredTextActive} data={courseTitle} fieldName={"Course Title"} />
            <InputField value={desc} setterFn={setDesc} label={"Course Short Description"} type="textarea" lines={3} required={true} placeholder={"Enter Course Description"} />
            <FieldRequiredText active={requiredTextActive} data={desc} fieldName={"Course Description"} />
            <InputField value={price} setterFn={setPrice} label={"Course Price"} required={true} placeholder={"Enter Course Price"} />
            <FieldRequiredText active={requiredTextActive} data={price} fieldName={"Course Price"} />
            <div>
                <p className='text-sm pb-2'>Category <span className='text-pink-200 pl-[0.1rem]'>*</span></p>
                <select onChange={(e)=>{setCategory(e.target.value)}} className='outline-none bg-richblack-700 p-3 rounded-lg border-b-[1px] border-richblack-300 w-[100%]'>
                    <option>Select Category</option>
                    {categories.map(({categoryName},key)=>{
                        return <option key={key}>{categoryName}</option>
                    })}
                </select>
            </div> 
            <FieldRequiredText active={requiredTextActive} data={category} fieldName={"Course Category"} />                  
    {/* tags */}
            <TagsInput tags={tags} setTags={setTags} required={true} label={"Tags"} placeholder={"Write a tag and hit Enter"}/>
            <FieldRequiredText active={requiredTextActive} data={tags} fieldName={"Course Tag"}/>
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
                :<div {...getRootProps({className: 'dropzone'})} name="thumbnail" className='flex flex-col h-32 justify-between items-center '>
                        <div className='p-4 bg-richblack-900 text-3xl text-yellow-50 rounded-full w-fit'><FiUploadCloud/></div>
                        <p className='text-richblack-200 text-xs font-[500]'>Drag and drop an image, or <span className='text-yellow-50'>Browse</span> *Max size 6MB</p>
                        <ul className='list-disc w-[60%] text-richblack-200 text-xs font-[500] flex justify-between'>
                            <li>Aspect ratio 16:9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>
                        <input {...getInputProps()}  id="thumbnail" required={true} className='' />
                    </div>
                }
                </div>
            </label>
            <FieldRequiredText active={requiredTextActive} data={thumbnail} fieldName={"Course Thumbnail"} />
            </div>
            <RequirementInput requirements={requirements} setRequirements={setRequirements}/>
            <FieldRequiredText active={requiredTextActive} data={requirements} fieldName={"Course Requirements"} />
            <InputField value={benifits} setterFn={setBenifits} type={"textarea"} lines={4} label={"Course Benifits"} required={true} placeholder={"Enter benifits of the course "} />
            <FieldRequiredText active={requiredTextActive} data={benifits} fieldName={"Course Benifits"} />
        </form>
        <StdButton form={""} type={""} color="yellow" handler={handleSubmit}>Next<IoIosArrowForward/></StdButton>
        </div>
  )
}
