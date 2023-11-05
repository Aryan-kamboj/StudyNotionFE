import React, { useState } from 'react'
import {courseDetails} from "../data/tempData"
import { RatingStars } from '../components/stdComponets/RatingStars';
import {AiOutlineInfoCircle,AiOutlineShareAlt} from 'react-icons/ai'
import {IoGlobeOutline} from "react-icons/io5"
import {BiSolidRightArrow} from "react-icons/bi"
import {SectionDropdown} from "../components/stdComponets/SectionDropdown"
import { StdButton } from '../components/stdComponets/StdButton';
import {CopyToClipboard} from "react-copy-to-clipboard"
import {GoDotFill} from "react-icons/go"
import toast from "react-hot-toast"
import { addToCart } from '../redux/slices/UserDataSlice';
import { useDispatch } from 'react-redux';
import { Footer } from '../components/Footer';
export const CoursePage = () => {
    const dispatcher = useDispatch();
    const addToCartHandler=(e)=>{
        console.log("hii");
        dispatcher(addToCart(id));
    }
    const notify = () => {
        console.log("hiiii");
        return toast.success('Copied to clip board');
    }
    const courseId = document.location.pathname.split("/")[2];
    const courseLink = document.URL;
    console.log(courseId);

    const months= ["January","February","March","April","May","June","July",
                "August","September","October","November","December"];
    // fetch course by course id 
    const {thumbnail,title,description,price,reviewCount,rating,id,enrolledNo,createdAt,language,instructorName,benifits,requirements,courseContent,instructorImg} = courseDetails[0];
    const dateCreated = new Date(createdAt);
    // console.log(dateCreated.getFullYear());
    const date = dateCreated.getDate();
    const month = months[dateCreated.getMonth()];
    const year = dateCreated.getFullYear();
    const hours = dateCreated.getHours()%12;
    const mins = dateCreated.getMinutes();
    const am_pm = dateCreated.getHours()/12?"PM":"AM";
    // console.log(mins);

    const courseLengthSec = courseContent.reduce((acc,section)=>acc+section.lectures.reduce((accTime,lecture)=>accTime+lecture.length,0),0);
    const secondsToArr = (seconds)=>{
        const sec = seconds%60;
        seconds-=sec;
        const totalMins = ((seconds)%60);
        const mins = (totalMins%60);
        const hours = ((totalMins-mins)/60);
        return ([hours,mins,sec]);
    }
    const courseLenArr=secondsToArr(courseLengthSec);
    const courseLengthStr = `${courseLenArr[0]} h : ${courseLenArr[1]} m : ${courseLenArr[2]} s`;

    const [sectionFolded,setSecFolded] = useState(true);
    const collapseAll = ()=>{
        setSecFolded(!sectionFolded);
    }
  return (
    <div className='overflow-hidden'>
        <div className='text-white bg-richblack-800 '>
        {/* course Buy and add to cart card */}
            <div className='w-[24rem] p-4 overflow-hidden bg-richblack-700 rounded-md absolute right-8 top-[10.5rem]'>
                <img className="rounded-lg h-[22rem] object-cover" src={thumbnail} alt={title}/>
                <div className='space-y-4 pt-4'>
                    <p className='text-3xl font-[500]'>Rs. {price}</p>
                    <StdButton width={100} color="yellow">Buy Now</StdButton>
                    <StdButton handler={addToCartHandler} width={100} color="grey">Add to Cart</StdButton>
                    <p className='text-center text-sm text-richblack-200 '>30-Day Money-Back Guarantee</p>
                    <div className='space-y-2 '>
                        <h1 className='text-xl'>This Course Requires:</h1>
                        <div>
                            {requirements.map((requirement,i)=>{
                                return <div key={i} className='flex text-caribbeangreen-100 text-sm items-start space-x-2 px-4 '><BiSolidRightArrow className='min-w-[1rem] mt-1'/> <p>{requirement}</p></div>
                            })}
                        </div>
                    </div>
                    <CopyToClipboard text={courseLink} onCopy={notify}>
                        <span className='flex text-yellow-100 items-center justify-center'><AiOutlineShareAlt/>  Share</span>
                    </CopyToClipboard>
                </div>
            </div>
        {/* course title section */}
            <div className='w-[70%] px-24 py-32 space-y-4 text-lg'>
                <h1 className='text-5xl font-[500]'>{title}</h1>
                <p className='text-richblack-300'>{description}</p>
                <div className='flex items-center space-x-2 '><span className='text-yellow-100'>{rating}</span><RatingStars space={2} rating={rating}/><span>({reviewCount} reviews)</span> <span>{enrolledNo} students enrolled</span> </div>
                <p>Created By {instructorName}</p>
                <div className='flex space-x-2 items-center'>
                    <p className='flex items-center space-x-2'><AiOutlineInfoCircle/> <span>Created at {month} {date}, {year} | {hours}:{mins} {am_pm}</span></p>
                    <IoGlobeOutline/>
                    <p>{language}</p>
                </div>
            </div>
{/* dark colored section */}
            <div className='bg-richblack-900 pt-8 px-24'>
                <div className='w-[66%]'>
                {/* what you will learn section */}
                    <div className='p-8 border-2 border-richblack-700 space-y-4'>
                        <h1 className='text-3xl'>What you will learn....</h1>
                        {benifits.map((benifit,i)=>{
                            return <p className='text-blue-200 flex items-center space-x-2' key={i}><GoDotFill/> <span>{benifit}</span></p>
                        })}
                    </div>
                {/* course content section */}
                    <div className='space-y-5'>
                        <h1 className='mt-4 text-3xl font-[500]'>Course Content</h1>
                        <div className='flex justify-between '>
                            <div className='flex space-x-2'>
                                <p>{courseContent.length} section(s) </p>
                                <p>{courseContent.reduce((acc,section)=>acc+section.lectures.length,0)} lecture(s)</p>
                                <p>{courseLengthStr} total length</p>
                            </div>
                            <span className='text-yellow-100' onClick={collapseAll}>
                                Collapse all sections
                            </span>
                        </div>
                {/* sections bars */}
                        <div className={` border-b-[0.5px] border-richblack-500 `}>
                            {courseContent.map((section,i)=>{
                                return <SectionDropdown key={i} section={section} collapseAll={sectionFolded}/>
                            })}
                        </div>
                    </div>
{/* would like to add a link to the authors profile  */}
                    {/* authour section */}
                    <div className='my-8 space-y-3'>
                        <h1 className='text-3xl font-[500]'>Author</h1>
                        <div className='flex items-center space-x-4'>
                            <img className='rounded-full w-[6rem] h-[6rem]' src={instructorImg} alt={instructorName}/>
                            <p className='text-3xl'>{instructorName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}
