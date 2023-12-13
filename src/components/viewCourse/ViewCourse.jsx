import React ,{useState} from 'react'
import { courseDetails } from '../../data/tempData';
import { SectionDropdownViewCourse } from './SectionDropdownViewCourse.jsx';

export const ViewCourse = () => {
    const courseId = window.location.pathname.split("/")[2];
    const videoUrl = "https://res.cloudinary.com/studynotion/video/upload/v1702285552/studynotion/kkkirhlajkn7jgscoxqi.mp4"
    const [lectureCount,setLectureCount] = useState(()=>{
        const lectures = courseDetails.courseContent.reduce((acc,section)=>{
            return (acc+section.lectures.reduce((acc,lecture)=>{
                return acc+1;
            },0));
    },0)
    console.log(setLectureCount(lectureCount));
    return lectures;});
    const lectureName = "Lecture 1";
    const desc = "Lecture ka chota sa description";
  return (
    <div className='text-white flex'>
        <div className='bg-richblack-800 min-w-[20%] w-[20%] h-fit pt-14  min-h-[100vh]'>
            {/* dashboard */}
            <div className='text-2xl font-[500] text-center mt-6'>
                <span className='text-richblack-50'>{courseDetails.title}</span><span className='text-sm text-richblack-500'> {4}/{lectureCount}</span>
            </div>
            <div className='mt-4'>
            {courseDetails.courseContent.map((section,i)=>{
                return <SectionDropdownViewCourse courseId={courseId} section={section}/>
            })}
            </div>
        </div>
        <div className=' basis-[80%] mt-14'>
            <video className='object-contain w-[100%] h-[65vh]' controlsList='nodownload' controls>
                <source src={videoUrl} type="video/mp4"/>
            </video>
            <div className="ml-12 mt-4">
                <h2 className='text-2xl font-[500] text-richblack-5'>{lectureName}</h2>
                <p className='text-richblack-200 mt-4'>{desc}</p>
            </div>
        </div>
    </div>
  )
}
