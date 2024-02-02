import React from 'react'
import { useState } from 'react';
import { InputField } from '../components/stdComponets/InputField';
import { StdButton } from '../components/stdComponets/StdButton';
import { PhoneNumberInput } from '../components/stdComponets/PhoneNumberInput';
import { IoChatbubbles,IoEarthSharp,IoCall } from "react-icons/io5"
import { Footer } from '../components/Footer';
const ContactUs = () => {

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

  const [fName , set_ui_fname] = useState("");
  const [lName , set_ui_lname] = useState("");
  const [email,set_ui_email] = useState("");
  const [phoneNo,set_ui_phoneNo] = useState("");
  const [countryCode,set_ui_countryCode] = useState("+91-India")
  const [message,set_ui_message] = useState("");
  return (
    <div>
      <div className='flex space-x-10 mt-24 justify-center max-tablet:items-center pb-14 max-tablet:flex-col max-tablet:space-y-5 max-tablet:space-x-0'>
        <div className='text-white w-[35%] max-tablet:w-[96%] space-y-10 h-fit rounded-2xl p-8 bg-richblack-800'>
          <div className='flex space-x-4'>
            <div className='text-richblack-100 text-lg mt-1'><IoChatbubbles/></div>
            <div>
            <h1 className='font-[500] text-lg'>Chat with us</h1>
              <p className='text-richblack-100'>Our friendly team is here to help.
              <br/>info@studynotion.com</p>
            </div>
          </div>
          <div className='flex space-x-4'>
            <div className='text-richblack-100 text-lg mt-1'><IoEarthSharp/></div>
            <div>
            <h1 className='font-[500] text-lg'>Visit us</h1>
              <p className='text-richblack-100'>Come and say hello at our office HQ.
              <br/>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>
            </div>
          </div>
          <div className='flex space-x-4'>
            <div className='text-richblack-100 text-lg mt-1'><IoCall/></div>
            <div>
            <h1 className='font-[500] text-lg'>Call us</h1>
              <p className='text-richblack-100'>Mon - Fri From 8am to 5pm
              <br/>+123 456 7869</p>
            </div>
          </div>
        </div>
        <div className=' w-[50%] border-[1px] p-[2rem] border-richblack-600 rounded-2xl  max-tablet:w-[96%]'>
          <div className='text-white ml-[5%] mt-[1.5rem] w-[90%] items-start justify-center flex-col flex'>
            <h1 className='text-4xl font-[500]'>Got a Idea? We've got the skills.<br/> Let's team up</h1>
            <p className='text-richblack-600'>Tell us more about yourself and what you're got in mind.</p>
          </div>
          <form onSubmit={submitHandler} className='my-12 max-tablet:w-[88%] mx-auto flex flex-col justify-center space-y-4'>
              <div className='flex space-x-5'>
                <InputField label={"First Name"} required={true} type={"text"} placeholder={"First Name"} value={fName} setterFn={set_ui_fname}/>
                <InputField label={"Last Name"} required={true} type={"text"} placeholder={"Last Name"} value={lName} setterFn={set_ui_lname}/>
              </div>
              <InputField label={"Email"}  required={true} type={"email"} placeholder={"Email"} value={email} setterFn={set_ui_email}/>
              <PhoneNumberInput required={true} phoneNo={phoneNo} label={"Phone number"} setterFnNumber={set_ui_phoneNo} set_ui_countryCode={set_ui_countryCode} />
              <InputField value={message} setterFn={set_ui_message} required={true} type={"textarea"} label={"Message"} placeholder={"Enter your message here"}/>
              <StdButton width={100} color={"yellow"} type='submit' >Send Message</StdButton>
            </form>
        </div>
        {/* reviews section */}
        
      </div>
    <Footer/>
    </div>
  )
}

export default ContactUs