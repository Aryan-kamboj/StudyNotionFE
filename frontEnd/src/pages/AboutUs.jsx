import React from 'react';
import { CyanColoredText } from '../components/stdComponets/CyanColoredText';
import { OrangeColoredText } from "../components/stdComponets/OrangeColoredText";
import { YellowColoredText } from '../components/stdComponets/YellowColoredText';
import { RedColoredText } from '../components/stdComponets/RedColoredText';
import aboutUs1 from "../assets/Images/aboutus1.webp";
import aboutUs2 from "../assets/Images/aboutus2.webp";
import aboutUs3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import { NumbersBar } from '../components/aboutUsPage/NumbersBar';
import { LightDarkBlocks } from '../components/aboutUsPage/LightDarkBlocks';
import { InputField } from '../components/stdComponets/InputField';
import { useState } from 'react';
import { PhoneNumberInput } from '../components/stdComponets/PhoneNumberInput';
import { StdButton } from '../components/stdComponets/StdButton';
import { Footer } from '../components/Footer';
const AboutUs = () => {
  const [fName , set_ui_fname] = useState("");
  const [lName , set_ui_lname] = useState("");
  const [email,set_ui_email] = useState("");
  const [phoneNo,set_ui_phoneNo] = useState("");
  const [countryCode,set_ui_countryCode] = useState("+91-India")
  const [message,set_ui_message] = useState("");
  const submitHandler = (e)=>{
    e.preventDefault();
      console.log({
        fName : fName,
        lName : lName,
        email : email,
        phoneNo : phoneNo,
        countryCode : countryCode,
        message : message,
      })
  }
  return (
    <div className='bg-richblack-900 hideScrollBars '>
      {/* section 1 */}
      <div className='pt-[5rem] hideScrollBars max-tablet:pt-[1rem] bg-richblack-800 mx-auto w-screen'>
        <div className='w-[60%] mx-auto'>
          <h1 className='text-white text-4xl text-center font-[500] max-tablet:text-base'>Driving Innovation in Online Education for a <br/> <CyanColoredText>Brighter Future</CyanColoredText></h1>
          <p className='text-richblack-300 text-center mt-4 max-tablet:text-xs font-[500]'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
        </div>
        {/* 3 photos */}
        <div className=" max-w-[88%] mx-auto ">
          <div className='flex space-x-[5%] flex-nowrap justify-center relative bottom-[-40px]'>
            <img className='w-[33%]' alt={"about us img"} src={aboutUs1}/>
            <img className='w-[33%]' alt={"about us img"} src={aboutUs2}/>
            <img className='w-[33%]' alt={"about us img"} src={aboutUs3}/>
          </div>
        </div>
        
      </div>

      {/* section 2 */}
      <div>
        <div className='border-b-[1px] border-richblack-600'>
          <div className='mt-24 text-white w-[86%] mx-auto text-center text-4xl font-[500] max-tablet:text-lg pb-[5rem]'>
            We are passionate about revolutionizing the way we learn. Our innovative platform <CyanColoredText>combines technology</CyanColoredText>, <OrangeColoredText>expertise</OrangeColoredText>, and community to create an <YellowColoredText>unparalleled educational experience.</YellowColoredText>
          </div>
        </div>
        <div className='flex w-[88%] mx-auto mt-[5rem] max-tablet:flex-col'>
          <div className='text-richblack-300 text-[17px] w-[50%] max-tablet:w-[100%] space-y-12 '>
            <span className="text-4xl max-tablet:text-lg font-[500]"><RedColoredText>Our Founding Story</RedColoredText></span>
            <p className="">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
            <p className="">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
          </div>
          <div className='mx-auto my-auto max-tablet:mt-6 shadow-[0px_0px_30px_#FC6767]'>
            <img src={FoundingStory} alt="Founding story"/>
          </div>
        </div>
        <div className='flex text-richblack-300 w-[88%] mx-auto mt-[12rem] max-tablet:mt-[4rem] justify-between pb-20 max-tablet:flex-col'>
          <div className='w-[45%] max-tablet:w-[100%]'>
            <span className='text-3xl font-[500]'><OrangeColoredText>Our Vision</OrangeColoredText></span>
            <p className='mt-[3rem]'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
          </div>
          <div className='w-[45%] max-tablet:w-[100%] max-tablet:mt-12'>
            <span className='text-3xl font-[500]'><CyanColoredText>Our Mission</CyanColoredText></span>
            <p className='mt-[3rem]'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
          </div>
        </div>
      </div>

      {/* Active students bar */}
      <NumbersBar/>

      {/* special light and dark blocks section */}
      <div className="w-[88%] mx-auto my-16 "><LightDarkBlocks/></div>

      {/* get in touch section */}
      <div>
        <div className='text-center space-y-4'>
          <h1 className='text-white text-4xl font-[500]'>Get in Touch</h1>
          <p className='text-richblack-300'>We'd love to here for you, Please fill out this form.</p>
        </div> 
        {/* main form */}
        <form onSubmit={submitHandler} className='my-12 w-[35%] max-tablet:w-[88%] mx-auto flex flex-col justify-center space-y-4'>
          <div className='flex space-x-5'>
            <InputField label={"First Name"} required={true} type={"text"} placeholder={"First Name"} value={fName} setterFn={set_ui_fname}/>
            <InputField label={"Last Name"} required={true} type={"text"} placeholder={"Last Name"} value={lName} setterFn={set_ui_lname}/>
          </div>
          <InputField label={"Email"}  required={true} type={"email"} placeholder={"Email"} value={email} setterFn={set_ui_email}/>
          <PhoneNumberInput required={true} phoneNo={phoneNo} label={"Phone number"} setterFnNumber={set_ui_phoneNo} setterFnCoutry={set_ui_countryCode}/>
          <InputField innerText={message} setterFn={set_ui_message} required={true} type={"textarea"} label={"Message"} placeholder={"Enter your message here"}/>
          <StdButton width={100} color={"yellow"} type='submit'>Send Message</StdButton>
        </form>
      </div>
      <Footer/>
    </div>
  )
}

export default AboutUs;