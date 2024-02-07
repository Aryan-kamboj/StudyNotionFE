import {useEffect, useState} from 'react'
// import { courseDetails } from '../../data/tempData';
import { SectionDropdownViewCourse } from './SectionDropdownViewCourse.jsx';
import { getCourseInfo } from '../../services/user/userCourseApis.js';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseDetails } from '../../redux/slices/UserDataSlice.js';

export const ViewCourse = () => {
    const courseId = window.location.pathname.split("/")[2];
    // const [courseDetails,setDetails] = useState(null);
    const courseDetails = useSelector(({rootReducer})=>rootReducer.UserDataSlice.courseDetails);
    const dispatcher = useDispatch();
    useEffect(()=>{
        (async()=>{
            const {details} = await getCourseInfo(courseId); 
            console.log(details);
            dispatcher(setCourseDetails(details));
        })()
    },[])
    // const videoUrl = "https://res.cloudinary.com/studynotion/video/upload/v1702285552/studynotion/kkkirhlajkn7jgscoxqi.mp4"
    const [lectureCount,setLectureCount] = useState(()=>{
        const lectures = courseDetails?.sections.reduce((acc,section)=>{
            return (acc+section.lectures.reduce((acc,lecture)=>{
                return acc+1;
            },0));
    },0)
    return lectures;});
    const remove_me = (e)=>{
        setLectureCount(10);
    }
    // const lectureName = "Lecture 1";
    // const desc = "Lecture ka chota sa description";

    function onRemove(e){
        console.log(e.contextmenu);
    }
  return (
    <div className='text-white flex'>
        <div className='bg-richblack-800 min-w-[20%] w-[20%] h-fit pt-14  min-h-[100vh]'>
            {/* dashboard */}
            <div onClick={remove_me} className='text-2xl font-[500] text-center mt-6'>
                <span className='text-richblack-50 text-wrap '>{courseDetails?.courseName}</span><span className='text-sm text-richblack-500'> {4}/{lectureCount}</span>
            </div>
            <div className='mt-4'>
            {courseDetails?courseDetails?.sections?.map((section,i)=>{
                return <SectionDropdownViewCourse key={i} courseId={courseId} section={section}/>
            }):""}
            </div>
        </div>
        <div className=' basis-[80%] mt-14'>
            {courseDetails?.sections[0]?.lectures[0]?.link?<video className='object-contain w-[100%] h-[65vh]' controlsList='nodownload' controls>
                <source src={`${courseDetails?.sections[0]?.lectures[0]?.link}`} type="video/mp4"/>
                {/* <source src={'https://res.cloudinary.com/studynotion/video/upload/v1707025309/studyNotion/xunpf67nry2szdiabsao.mp4'} type="video/mp4"/> */}
            </video>:""}
            <div className="ml-12 mt-4">
                <h2 className='text-2xl font-[500] text-richblack-5'>{courseDetails?.sections[0]?.lectures[0]?.lectureTitle}</h2>
                <p className='text-richblack-200 mt-4'>{courseDetails?.sections[0]?.lectures[0]?.lectureDesc}</p>
            </div>
        </div>
    </div>
  )
}
