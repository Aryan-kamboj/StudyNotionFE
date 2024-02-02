import React from 'react'
import video from "../assets/homePageVideo.mp4"
import timelineImage from "../assets/Images/TimelineImage.png"
import {HomeNavbarData} from "../data/HomeNavbarData";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { HomePageNavbar } from '../components/homepage/Navbar/HomePageNavbar'
import { Card } from '../components/homepage/Card'
import {FaArrowRightLong} from "react-icons/fa6"
import {CodeBlock} from "../components/homepage/Typewriter"
import { StdButton } from '../components/stdComponets/StdButton'
import { CyanColoredText } from "../components/stdComponets/CyanColoredText"
import { Link } from 'react-router-dom'
import { BiRightArrowAlt} from "react-icons/bi"
import LeadershipLogo from "../assets/TimeLineLogo/Logo1.svg"
import Responsibility from "../assets/TimeLineLogo/Logo2.svg"
import Flexibility from "../assets/TimeLineLogo/Logo3.svg"
import SolveProblem from "../assets/TimeLineLogo/Logo4.svg"
import compareWithOthers from "../assets/Images/Compare_with_others.svg"
import knowYourProgress from "../assets/Images/Know_your_progress.svg"
import planYourLessons from "../assets/Images/Plan_your_lessons.svg"
import Instructor from "../assets/Images/Instructor.png"
import { useState } from 'react';
import { Footer } from '../components/Footer';
const Home = () => {
  // ye home page cards galat hai isme maine redux use kiya hai jiski jaroorat hi nahi hai 
  // + redux me update krne se dom thodai repaint hoga bhaiiiii
  // but agr merko iski functionality aage use krni hai toh variable save rhna achi baat hai toh ham use krege redux

  const [homePageCards,setHomePageCards] = useState(useSelector((state)=>{
    return state.rootReducer.UI_slice.homePageCardsData;
  }));
  // eslint-disable-next-line no-unused-vars
  const [homePageCardSelected,setSelected] = useState(useSelector((state)=>{
    return state.rootReducer.UI_slice.homePageCardSelected;
  }))
  return (
    <div className='max-w-screen mt-10 overflow-hidden'>
      <Link to = {"/signUp"}>
        <div className='group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none'>
          <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>Become an Instructor<BiRightArrowAlt/> </div>
        </div>
      </Link>
      <div className='relative w-[100%]'>
        <div className='text-white text-3xl font-[500] flex justify-center text-center mt-8'>
          <span>Empower Your Future with <CyanColoredText>Coding Skills</CyanColoredText></span>
        </div>
        <div className='text-richblack-300 w-[80%] mx-auto font-medium text-center mt-4'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</div>
      </div>
      <div className='flex justify-center mt-16 gap-8'>
        <StdButton color="yellow" linkTo="/signUp">Learn more</StdButton>
        <StdButton color="grey" linkTo="/logIn">Book a Demo</StdButton>
      </div>
      <div className='mx-auto mt-16 w-[70%] shadow-[0px_0px_30px_#a1eaf7] '>
        <video className='shadow-[10px_10px_#FFFFFFFF]' muted loop autoPlay>
          <source src={video} type='video/mp4'/>
        </video>
      </div>

      {/* unlock your coding potential section CODEBLOCK-1 */}
      <div className='w-[90%] mt-24 flex max-tablet:flex-col max-tablet:mx-auto max-tablet:pr-3 '>
        <div className='mx-[10%] w-[55%] max-tablet:w-[88%] max-tablet:mx-auto max-tablet:text-center'>
          <div className='text-white text-4xl font-medium '>
          Unlock your <CyanColoredText> coding potential </CyanColoredText> with our online courses.
          </div>
          <div className='text-richblack-400 font-[500] mt-6'>
            Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
          </div>
          <div className='flex gap-8 mt-16 max-tablet:w-[100%]'>
            <StdButton color={`yellow`} linkTo={"/signUp"}>Try it Yourself<FaArrowRightLong/></StdButton>
            <StdButton color={`grey`} linkTo={"/signUp"}>Learn More</StdButton>
          </div>
          
        </div>
        <div className={`w-[55%] flex flex-col font-bold text-md font-mono text-yellow-25 max-tablet:text-[9px] max-tablet:w-[88%] max-tablet:mx-auto max-tablet:pt-6`}>
          <CodeBlock background={"codeBlock1"} data={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="/one">One</a><a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}></CodeBlock>
        </div>
      </div>
      <div className='w-[82%] mt-40 mx-auto flex max-tablet:flex-col-reverse max-tablet:w-[88%] max-tablet:mt-30'>
        <div className='text-white w-[40%] max-tablet:w-[88%] max-tablet:mt-6 max-tablet:mx-auto max-tablet:text-[11px]'>
        <CodeBlock background = {`codeblock2`} data={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}></CodeBlock>
        </div>
        <div className='ml-40 w-[55%] mt-6 max-tablet:w-[88%] max-tablet:mx-auto max-tablet:mt-0 max-tablet:text-center'>
          <div className='text-bolder text-white text-4xl font-[500]'>
              Start coding in<CyanColoredText> seconds</CyanColoredText>
          </div>
          <div className='text-richblack-400 font-[500] mt-6 w-[90%] max-tablet:mx-auto '>
              Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.
          </div>
          <div className='flex gap-6 mt-16'>
            <StdButton color={`yellow`}>Continue Lesson <FaArrowRightLong/></StdButton>
            <StdButton color={`grey`}>Learn More</StdButton>
          </div>
        </div>
        
      </div>
      <div>
          <div className='text-white text-4xl text-center font-[500] pt-36 '>
          Unlock the <CyanColoredText>Power of Code</CyanColoredText>
          </div>
          <p className='text-richblack-400 text-xl font-[500] mt-2 text-center'>
          Learn to Build Anything You Can Imagine
          </p>
        </div>
       <div className=''>
          <div className='mx-auto w-[60%] pt-8 max-laptop:hidden'>
            <HomePageNavbar setterFn={setHomePageCards} buttons = {HomeNavbarData}/>
          </div>
          <div className='flex gap-[4rem] left-0 right-0 mx-auto relative z-[10] pt-16 justify-center items-center w-[88%] max-tablet:flex-col flex-wrap'>
              {homePageCards.map((cardData)=>{
                return <Card setSelected={setSelected} key={Math.random()} data = {cardData}/>
              })}
          </div>
       </div>
       {/* the white colored section */}
      <div className='bg-pure-greys-5 relative z-[0] top-[-8rem]'>
        {/* the cross bg section  */}
        <div className={`bg-homePageBg bg-repeat-x min-w-[100vw] min-h-[320px] max-h-[320px]`}>
          <div className='flex gap-10 justify-center relative bottom-[-14rem]'>
                <StdButton color={`yellow`} linkTo={`/login`}>Explore Full Catalogue <FaArrowRightLong/></StdButton>
                <StdButton color={`grey`} linkTo={`/signUp`}>Learn More</StdButton>
          </div>
        </div>
        {/* Get skills section  */}
        <div className='flex w-[88%] mx-auto  mt-16 justify-between max-tablet:flex-col'>
          <div className=' w-[50%] text-4xl font-[500] max-tablet:w-[100%] '>
            Get the skills you need for a job that is <CyanColoredText>in demand.</CyanColoredText>
            </div>
            <div className='w-[40%] max-tablet:w-[100%] max-tablet:mt-4'>
            <p className='mb-10'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
            <StdButton color={`yellow`} className=''>Learn More</StdButton>
            </div>
        </div>
        {/* the infographic section */}
        <div className='flex w-[88%] mx-auto justify-between mt-20 max-tablet:flex-col'>
             <div className='flex flex-col space-y-2 '>
              {/* infographic  */}
              <div className='flex pl-4 '>
                <div className='py-4 px-5 max-h-[3rem] rounded-full bg-white'>
                  <img src={LeadershipLogo} alt="Leadership Logo"/>
                </div>
                <div className='pl-8'>
                  <h1>Leadership</h1>
                  <p>Fully committed to the success company</p>
                </div>
              </div>
              <div className='h-16 border-l-[1px] ml-[2.7rem] border-richblack-100 border-dotted'/>
              <div className='flex pl-4'>
                <div className='p-4  max-h-[3rem] rounded-full bg-white'>
                  <img src={Responsibility} alt="Responsibility Logo"/>
                </div>
                  <div className='pl-8'>
                    <h1>Responsibility</h1>
                    <p>Fully committed to the success company</p>
                  </div>
              </div>
              <div className='h-16 border-l-[1px] ml-[2.7rem] border-richblack-100 border-dotted'/>
              <div className='flex pl-4 '>
                <div className='p-4  max-h-[3rem] rounded-full bg-white'>
                  <img src={Flexibility} alt="Flexibility Logo"/>
                </div>
                  <div className='pl-8'>
                    <h1>Flexibility</h1>
                    <p>The ability to switch is an important skills</p>
                  </div>
              </div>
              <div className='h-16 border-l-[1px] ml-[2.7rem] border-richblack-100 border-dotted'/>
              <div className='flex pl-4' >
                <div className='p-4  max-h-[3rem] rounded-full bg-white'>
                  <img src={SolveProblem} alt="SolveProblem Logo"/>
                </div>
                  <div className='pl-8'>
                    <h1>Solve the problem</h1>
                    <p>Code your way to a solution</p>
                  </div>
              </div>              
             </div>   
             <div className='relative'>
                {/* photo */}
                <div className='shadow-[0px_0px_30px] shadow-blue-200 max-tablet:mt-10'>
                  <img className="object-fill shadow-[20px_20px_white]" src={timelineImage} alt="timeline img"></img>
                </div>
                  <div className='flex bg-caribbeangreen-700 spacing-y-4 py-10 w-[88%] mx-auto relative top-[-3rem] max-tablet:w-[220px] max-tablet:py-5 max-tablet:absolute max-tablet:top-[2.5rem] max-tablet:flex-col'>
                    <div className='flex items-center justify-between w-[50%] px-8 border-r-caribbeangreen-300 border-r-2 max-tablet:px-3 max-tablet:w-[100%] max-tablet:border-none'>
                      <h1 className='text-white text-3xl font-bold  '>10</h1>
                      <p className='text-caribbeangreen-300 text-sm'>YEARS EXPERIENCES</p>
                    </div>
                    <div className='flex items-center justify-between w-[50%] px-8 max-tablet:px-3 max-tablet:w-[100%] text-center'>
                      <h1 className='text-white text-3xl font-bold'>250</h1>
                      <p className="text-caribbeangreen-300 text-sm">TYPES OF COURSES</p>
                    </div>
                  </div>
                </div>
        </div>
        <div>
            <div className='text-center'>
                <h1 className='text-4xl font-[500] mt-4'>Your swiss knife for <CyanColoredText>learning any language</CyanColoredText></h1>
                <p className='w-[65%] mt-3 mx-auto text-md'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
            </div>
            <div className='flex w-[88%] mx-auto items-center justify-center max-laptop:flex-col'>
                <img className='relative left-[8rem] max-laptop:left-0' src ={knowYourProgress} alt="Know Your Progress"/>
                <img className="z-[1]" src={compareWithOthers} alt="Compare with others"/>
                <img className='relative z-[2] right-[10rem] max-laptop:right-[0]' src = {planYourLessons} alt="Plan your lessons"/>
            </div>
        </div>
        <div className="flex justify-center pb-20"><StdButton color="yellow">Learn More</StdButton></div>
        </div>
        {/* last dark section with reviews */}
        <div>
              <div className='flex w-[88%] mx-auto space-x-20 max-tablet:flex-col max-tablet:space-x-0'>
                <img className="shadow-[-20px_-20px_0px_#ffffff] max-tablet:h-[300px]" src={Instructor} alt="instructor"/>
                <div className='flex-col my-auto justify-evenly flex h-[400px]'>
                  <h1 className='text-white text-4xl font-[600]'>Become an <br/> <CyanColoredText>instructor</CyanColoredText></h1>
                  <p className='text-richblack-300 text-lg'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                  <StdButton color="yellow" linkTo="/signUp">Start Teaching Today<FaArrowRightLong/></StdButton>
                </div>
              </div>
        </div>
        {/* reviews */}
        <div className='mt-14'>
              <h1 className='text-white text-4xl font-[500] text-center'>Reviews from other learners</h1>
              <div className='h-[184px] my-[50px]'>
                {/* review swiper left (swiper library) */}
              </div>
        </div>
        {/* footer */}
        <div className='bg-richblack-600'>
              
        </div>
        <Footer/>
      </div>
  )
}

export default Home