import {useEffect, useState} from 'react'
import { SectionDropdownViewCourse } from './SectionDropdownViewCourse.jsx';
import { getCourseInfo } from '../../services/user/userCourseApis.js';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseDetails, setEnrolledCourses, updateContentConsumed } from '../../redux/slices/UserDataSlice.js';
import { getEnorlledCourses } from '../../services/student/dashboardAPIS.js';
import { StdButton } from '../stdComponets/StdButton.jsx';
import { MdReplay } from "react-icons/md";
import { newContentWatched } from '../../services/student/courseApis.js';
import { AddReviewModal } from '../stdComponets/studentComponents/AddReviewModal.jsx';
export const ViewCourse = () => {
    const courseId = window.location.pathname.split("/")[2];
    const courseDetails = useSelector(({rootReducer})=>rootReducer.UserDataSlice.courseDetails);
    let enrolledCourses = useSelector(({rootReducer})=>rootReducer.UserDataSlice.enrolledCourses);
    let courseIdxInEnrolled;
    const enrolledInfo = enrolledCourses.filter((course,i)=>{
        // console.log("helluuu",i);  
        if(course.courseId === courseId)
            courseIdxInEnrolled = i;
        // console.log(courseIdxInEnrolled);
        return (course.courseId===courseId);
    })[0];
    console.log(enrolledInfo);
    const [showNextOverlay,setNextOverlay] = useState(false);
    const [currentlyWatching,setWatching] = useState("0.0");
    const sectionIdx = Number(currentlyWatching?.split('.')[0]);
    const lectureIdx = Number(currentlyWatching?.split('.')[1]);
    const dispatcher = useDispatch();
    const [reviewModal,setReviewModal] = useState(false);
    const addReviewHandler = async ()=>{
        console.log("add review");
    }
    const nextVideoHandler =async ()=>{
        const lecturesInSec =  courseDetails.sections[sectionIdx].lectures.length;
        if(!(enrolledInfo.contentConsumed.includes(`${sectionIdx}.${lectureIdx}`))){   
            const contentConsumed = await newContentWatched(courseId,`${sectionIdx}.${lectureIdx}`);
            dispatcher(updateContentConsumed({idx:courseIdxInEnrolled,contentConsumed:contentConsumed}));
        }
        if(lecturesInSec===lectureIdx+1){
            if(courseDetails.sections[sectionIdx+1]!==undefined)
                if(courseDetails.sections[sectionIdx+1].lectures[0]!==undefined)
                {
                    setWatching(`${sectionIdx+1}.${0}`)
                    setNextOverlay(false);
                }
        }
        else if (courseDetails.sections[sectionIdx].lectures[lectureIdx+1]!==undefined){
            setWatching(`${sectionIdx}.${lectureIdx+1}`);
            setNextOverlay(false);
        }
    }
    const replayHandler = ()=>{
        setNextOverlay(false);
        document?.getElementById("video")?.play();
    }
    useEffect(()=>{
        (async()=>{
            if(enrolledCourses.length<1){
                const data = await getEnorlledCourses();
                console.log(data);
                dispatcher(setEnrolledCourses(data));
            }
            const {details} = await getCourseInfo(courseId); 
            console.log(details);
            dispatcher(setCourseDetails(details));
        })()
    },[])
    useEffect(()=>{
        document?.getElementById("video")?.load();
    },[sectionIdx,lectureIdx])
  return (
    <div className='relative'>
        {reviewModal?<AddReviewModal courseId={courseId} setModal = {setReviewModal} />:''}
        <div className='text-white flex'>
            <div className='bg-richblack-800 min-w-[20%] w-[20%] h-fit pt-14  min-h-[100vh]'>
                {/* dashboard */}
                <div className='text-2xl font-[500] text-center mt-6'>
                    <span className='text-richblack-50 text-wrap flex flex-col '>{courseDetails?.courseName}</span><span className='text-sm text-richblack-500'>{enrolledInfo?.contentConsumed?.length}/{enrolledInfo?.totalLectures}</span>
                </div>
                {enrolledInfo?.progress>75?<div className='w-[80%] mx-auto mt-4'><StdButton handler={()=>{setReviewModal(true)}} color='yellow' width={100}>Add review</StdButton></div>:""}
                <div className='mt-4'>
                {courseDetails?courseDetails?.sections?.map((section,i)=>{
                    return <SectionDropdownViewCourse watchedInfo={enrolledInfo.contentConsumed} setWatching={setWatching} sectionIdx={i} key={i} courseId={courseId} section={section}/>
                }):""}
                </div>
            </div>
            <div className=' basis-[80%] mt-14'>
                {courseDetails?.sections[sectionIdx]?.lectures[lectureIdx]?.link?
                <div className='relative'>
                    {showNextOverlay?<div className='flex-col space-y-4 absolute z-[1000] h-[100%] w-[100%] flex justify-center items-center bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0)]'>
                        <StdButton color="yellow" handler={nextVideoHandler}>Next video</StdButton>
                        <MdReplay className='text-3xl' onClick={replayHandler}/>
                    </div>:""}
                    <video onEnded={()=>{setNextOverlay(true)}} id="video" className='object-contain w-[100%] h-[65vh]' controlsList='nodownload' controls>
                        <source src={courseDetails?.sections[sectionIdx]?.lectures[lectureIdx]?.link} type="video/mp4"/>
                    </video>
                </div>:""}
                <div className="ml-12 mt-4">
                    <h2 className='text-2xl font-[500] text-richblack-5'>{courseDetails?.sections[sectionIdx]?.lectures[lectureIdx]?.lectureTitle}</h2>
                    <p className='text-richblack-200 mt-4'>{courseDetails?.sections[sectionIdx]?.lectures[lectureIdx]?.lectureDesc}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
