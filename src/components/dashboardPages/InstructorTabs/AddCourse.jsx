import React, { useState } from 'react'
import {IoIosArrowBack,IoIosArrowForward} from "react-icons/io"
import { catagories } from '../../../data/tempData';
import { useNavigate } from 'react-router'
import { InputField } from '../../stdComponets/InputField';
import { StdButton } from '../../stdComponets/StdButton';
import { TagsInput } from '../../stdComponets/TagsInput';
import {RequirementInput} from "../../stdComponets/RequirementInput";
import {FiUploadCloud} from "react-icons/fi"
export const AddCourse = ({setTab}) => {
    const [thumbnail,setThumbnail] = useState(undefined)
    const navigator = useNavigate();
    const [stage,setStage]=useState(1);
    const submitHandler = (e)=>{
        setStage(2);
    }
    const removeThumbnail = (e)=>{
        e.preventDefault();
        setThumbnail(undefined);
    }
    const [tags,setTags] = useState([]);
    const imageChangeHandler = (e)=>{ 
        const image = e.target.files[0];
        image?setThumbnail(URL.createObjectURL(image)):setThumbnail(undefined);
        console.log(thumbnail);}
    const [requirements,setRequirements]=useState([]);
  return (
    <div className='p-8 flex max-tablet:flex-col'>
        <div className='basis-[70%]'>
            <div className='flex space-x-4 items-center text-richblack-300' onClick={()=>{navigator("my-courses");setTab("my-courses");}}> 
                <IoIosArrowBack/> Back to Dashboard
            </div>
            <div className='flex flex-col mt-4 justify-between '>
                <div className='flex items-center mx-[10%]'>
                    <div className='flex w-fit flex-col items-center justify-center'>
                        <span className={`px-4 font-[500] text-lg py-[0.40rem] rounded-full border-[1px] ${stage===1?" text-yellow-50 bg-yellow-900 border-yellow-50 ":" bg-richblack-800 border-richblack-700 text-richblack-500 "}`}>1</span>
                    </div>
                        <div className='border-dashed border-[1px] justify-center w-[42%] border-richblack-700 h-0'></div>
                    <div className='flex  flex-col items-center'>
                        <span className={`px-4 font-[500] text-lg py-2 rounded-full border-[1px] ${stage===2?" text-yellow-50 bg-yellow-900 border-yellow-50 ":"  bg-richblack-800 border-richblack-700 text-richblack-500 "}`}>2</span>
                    </div>
                        <div className='border-dashed border-[1px] w-[42%] border-richblack-700 h-0'></div>
                    <div className='flex  flex-col items-center'>
                        <span className={`px-4 font-[500] text-lg py-2 rounded-full border-[1px] ${stage===3?" text-yellow-50 bg-yellow-900 border-yellow-50 ":"  bg-richblack-800 border-richblack-700 text-richblack-500 "}`}>3</span>
                    </div>
                </div>
                <div className=' flex justify-between text-richblack-500 pt-4'>
                    <span className={`basis-[25%] text-right  ${stage===1?" text-yellow-50 ":" text-richblack-500 "} pr-[3%]`}>Course Information</span>
                    <span className={`basis-[50%] text-center ${stage===2?" text-yellow-50 ":" text-richblack-500 "} `}>Course Builder</span>
                    <span className={`basis-[25%] text-center ${stage===3?" text-yellow-50 ":" text-richblack-500 "} `}>Publish</span>
                </div>
            </div>
            <div className='bg-richblack-800 border-[1px] border-richblack-700 p-4 space-y-4 rounded-xl'>
                <form className=' space-y-2' id={"basicInfo"} onSubmit={submitHandler}>
                    <InputField label={"Course Title"} required={true} placeholder={"Enter Course Title"} />
                    <InputField label={"Course Short Description"} type="textarea" lines={3} required={true} placeholder={"Enter Course Description"} />
                    <InputField label={"Course Price"} required={true} placeholder={"Enter Course Price"} />
                    <div>
                        <p className='text-sm pb-2'>Catagory <span className='text-pink-200 pl-[0.1rem]'>*</span></p>
                        <select className='outline-none bg-richblack-700 p-3 rounded-lg border-b-[1px] border-richblack-300 w-[100%]'>
                            <option>Select Catagory</option>
                            {catagories.map((catagory)=>{
                                return <option value={catagory}>{catagory}</option>
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
                        :<div className='flex flex-col h-32 justify-between items-center '>
                                <div className='p-4 bg-richblack-900 text-3xl text-yellow-50 rounded-full w-fit'><FiUploadCloud/></div>
                                <p className='text-richblack-200 text-xs font-[500]'>Drag and drop an image, or <span className='text-yellow-50'>Browse</span> *Max size 6MB</p>
                                <ul className='list-disc w-[60%] text-richblack-200 text-xs font-[500] flex justify-between'>
                                    <li>Aspect ratio 16:9</li>
                                    <li>Recommended size 1024x576</li>
                                </ul>
                                <input onChange={imageChangeHandler} id="thumbnail" className='hidden' type="file" />
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
        </div>
        <div className='basis-[30%] text-richblack-5 bg-richblack-800 border-[1px] border-richblack-700 rounded-lg p-4'>
            <h1 className='text-xl'>&#9889; Course Upload Tips</h1>
            <ul className='list-disc pl-5 text-sm  w-[100%]'>
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>Make Announcements to notify any important</li>
                <li>Notes to all enrolled students at once.</li>
            </ul>
        </div>
    </div>
  )
}
