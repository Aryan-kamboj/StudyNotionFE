import { useEffect, useState } from 'react'
import { RatingStars } from '../components/stdComponets/RatingStars';
import {AiOutlineInfoCircle,AiOutlineShareAlt} from 'react-icons/ai'
import {IoGlobeOutline} from "react-icons/io5"
import {BiSolidRightArrow} from "react-icons/bi"
import {SectionDropdown} from "../components/stdComponets/SectionDropdown"
import { StdButton } from '../components/stdComponets/StdButton';
import {CopyToClipboard} from "react-copy-to-clipboard"
import {GoDotFill} from "react-icons/go"
import toast from "react-hot-toast"
import { updateCart } from '../redux/slices/UserDataSlice';
import { useDispatch } from 'react-redux';
import { Footer } from '../components/Footer';
import { getCourse , addToCart } from '../services/open/courseAPIs';
import { setLoading } from '../redux/slices/UI_slice';
export const CoursePage = () => {
    const courseId = document.location.pathname.split("/")[2];
    const [courseDetails,setDetails] = useState({});
    useEffect(()=>{
        (async ()=>{ 
            setLoading(true);
            await getCourse(courseId).then(({data})=>{
                if(data){
                    const details = data.courseDetails;
                    setDetails(details);
                    setLoading(false);
                }
            })
        })();
    },[]);
    const dispatcher = useDispatch();
    const addToCartHandler = async ()=>{
        const data = await addToCart(courseId)
        if(data)
            dispatcher(updateCart(data));
    }
    const notify = () => {
        return toast.success('Copied to clip board');
    }
    
    const courseLink = document.URL;
    const months= ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    // fetch course by course id 
    const {thumbnail,courseName,description,coursePrice,reviewCount,rating,enrolled,createdAt,language,instructor,benifits,requirements,sections} = courseDetails;
    const dateCreated = new Date(createdAt);
    // console.log(dateCreated.getFullYear());
    const date = dateCreated.getDate();
    const month = months[dateCreated.getMonth()];
    const year = dateCreated.getFullYear();
    const hours = dateCreated.getHours()%12;
    const mins = (dateCreated.getMinutes()<10?`0${dateCreated.getMinutes()}`:dateCreated.getMinutes());
    const am_pm = dateCreated.getHours()/12?"PM":"AM";
    // console.log(mins);

    const courseLengthSec = sections?sections.reduce((acc,section)=>acc+section.lectures.reduce((accTime,lecture)=>accTime+lecture.length,0),0):0;
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
        <div className='text-white bg-richblack-800 flex flex-col'>
        {/* course courseName section */}
        <div className='w-[100%]  max-h-[22rem] space-y-4 text-lg flex justify-between'>
            <div className='px-24 py-32'>
                <h1 className='text-5xl font-[500]'>{courseName}</h1>
                <p className='text-richblack-300'>{description}</p>
                {rating?<div className='flex items-center space-x-2 '><span className='text-yellow-100'>{rating.$numberDecimal}</span><RatingStars space={2} rating={rating.$numberDecimal}/><span>({reviewCount} reviews)</span> <span>{enrolled} students enrolled</span></div>:""}
                <p>Created By {instructor?instructor.fullName:""}</p>
                <div className='flex space-x-2 items-center'>
                    <p className='flex items-center space-x-2'><AiOutlineInfoCircle/> <span>Created at {month} {date}, {year} | {hours}:{mins} {am_pm}</span></p>
                    <IoGlobeOutline/>
                    <p>{language}</p>
                </div>
            </div>
                {/* course Buy and add to cart card */}
            <div className='w-[24rem] relative p-4 top-[4rem] overflow-hidden h-fit max-h-[92vh] bg-richblack-700 rounded-md right-[5%]'>
                <img className="rounded-lg h-[22rem] w-full object-cover" src={thumbnail} alt={courseName}/>
                <div className='space-y-4 pt-4'>
                    <p className='text-3xl font-[500]'>Rs. {coursePrice}</p>
                    <StdButton width={100} color="yellow">Buy Now</StdButton>
                    <StdButton handler={addToCartHandler} width={100} color="grey">Add to Cart</StdButton>
                    <p className='text-center text-sm text-richblack-200 '>30-Day Money-Back Guarantee</p>
                    <div className='space-y-2 '>
                        <h1 className='text-xl'>This Course Requires:</h1>
                        <div>
                            {requirements?requirements.map((requirement,i)=>{
                                return <div key={i} className='flex text-caribbeangreen-100 text-sm items-start space-x-2 px-4 '><BiSolidRightArrow className='min-w-[1rem] mt-1'/> <p>{requirement}</p></div>
                            }):""}
                        </div>
                    </div>
                    <CopyToClipboard text={courseLink} onCopy={notify}>
                        <span className='flex text-yellow-100 items-center justify-center'><AiOutlineShareAlt/>  Share</span>
                    </CopyToClipboard>
                </div>
            </div>
            </div>
        
        
{/* dark colored section */}
            <div className='bg-richblack-900 pt-8 px-24'>
                <div className='w-[66%]'>
                {/* what you will learn section */}
                    <div className='p-8 border-2 border-richblack-700 space-y-4'>
                        <h1 className='text-3xl'>What you will learn....</h1>
                        {benifits?<p className='text-blue-200 flex items-center space-x-2'><GoDotFill/> <span>{benifits}</span></p>:""}
                    </div>
                {/* course content section */}
                    <div className='space-y-5'>
                        <h1 className='mt-4 text-3xl font-[500]'>Course Content</h1>
                        <div className='flex justify-between '>
                            <div className='flex space-x-2'>
                                <p>{sections?sections.length:0} section(s) </p>
                                <p>{sections?sections.reduce((acc,section)=>acc+section.lectures.length,0):""} lecture(s)</p>
                                <p>{courseLengthStr} total length</p>
                            </div>
                            <span className='text-yellow-100' onClick={collapseAll}>
                                Collapse all sections
                            </span>
                        </div>
                {/* sections bars */}
                        <div className={` border-b-[0.5px] border-richblack-500 `}>
                            {sections?sections.map((section,i)=>{
                                return <SectionDropdown key={i} section={section} collapseAll={sectionFolded}/>
                            }):""}
                        </div>
                    </div>
{/* would like to add a link to the authors profile  */}
                    {/* authour section */}
                    <div className='my-8 space-y-3'>
                        <h1 className='text-3xl font-[500]'>Author</h1>
                        <div className='flex items-center space-x-4'>
                            <img className='rounded-full w-[6rem] h-[6rem]' src={instructor?instructor.profilePhoto:""} alt={instructor?instructor.fullName:""}/>
                            <p className='text-3xl'>{instructor?instructor.fullName:""}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}
