import React from 'react'
import SignUpImg from "../assets/Images/signup.webp"
import frame from "../assets/Images/frame.png"
import { InputField } from '../components/stdComponets/InputField';
import { PhoneNumberInput } from '../components/stdComponets/PhoneNumberInput';
import { useState } from 'react';
import { HomePageNavbar } from '../components/homepage/Navbar/HomePageNavbar';
import { StdButton } from '../components/stdComponets/StdButton';
import {PasswordValidation} from "../components/stdComponets/PasswordValidation"
export const SignUp = () => {
  const [fName , set_ui_fname] = useState("");
  const [lName , set_ui_lname] = useState("");
  const [email,set_ui_email] = useState("");
  const [phoneNo,set_ui_phoneNo] = useState("");
  const [countryCode,set_ui_countryCode] = useState("+91-India")
  const [password,set_ui_password] = useState("");
  const [cnfPassword,set_ui_cnfPassword] = useState("");
  const [userType,setUserType] = useState("Student");
  const [lock,setLock] = useState(false);
  const buttons = [{
      text:"Student",
    },
    {
      text:"Instructor",
    }]
  const submitHandler = (e)=>{
    e.preventDefault();
      const form = {
        fName:fName,
        lName:lName,
        email:email,
        phoneNo:phoneNo,
        countryCode:countryCode,
        password:password,
        cnfPassword:cnfPassword,
        userType:userType,
      }
      console.log(form);
  }
  return (
    <div className='text-white mt-16 flex my-10 h-full justify-evenly max-tablet:flex-col mx-auto max-tablet:h-[164vh] max-tablet:my-0'>
      <div className='w-[40%] px-16 space-y-2 max-tablet:w-[96%] max-tablet:px-4'>
        <h1 className='text-2xl font-[500] '>Join the millions learning to code with StudyNotion for free</h1>
        <p className='text-richblack-100'>Build skills for today, tomorrow, and beyond.</p>
        <p className='text-blue-100 font-edu-sa'>Education to future-proof your career.</p>
        <form onSubmit={submitHandler} className='space-y-3'>
          <HomePageNavbar className="w-[45%]" buttons={buttons} setterFn={setUserType} selectedBtn = {userType}/>
          <div className='flex space-x-4'>
            <InputField value={fName} label={"First name"} type={"text"} setterFn={set_ui_fname} required={true} placeholder={"Enter first name"}/>
            <InputField value={lName} label={"Last name"} type={"text"} setterFn={set_ui_lname} required={true} placeholder={"Enter first name"}/>
          </div>
          <InputField value={email} label={"Email"} type={"email"} setterFn={set_ui_email} required={true} placeholder={"Enter first name"}/>
          <PhoneNumberInput label={"Phone Number"} required={true} setterFnNumber={set_ui_phoneNo} setterFnCountryCode={set_ui_countryCode}/>
          <div className='flex space-x-4 select-none pb-2	'>
            <InputField value={password} label={"Password"} type={"password"} setterFn={set_ui_password} required={true} placeholder={"Enter pass"}/>
            <InputField value={cnfPassword} label={"Confirm Password"} type={"password"} setterFn={set_ui_cnfPassword} required={true} placeholder={"Re-Enter pass"}/>
          </div>
          <StdButton color={"yellow"} disabled={lock?true:false} width={100}>Sign Up</StdButton>
        </form>
        <PasswordValidation password={password} cnfPassword={cnfPassword} setLock = {setLock} />
      </div>
      <div className='mt-14 relative w-[40%] select-none	max-tablet:w-[86%] max-tablet:mt-0 mx-auto'>
            <img src={SignUpImg} alt={'SignUp_photo'} className='z-[10] relative'/>
            <img src={frame} alt={'Frame'} className='absolute top-6 left-6 z-[0]'/>
        </div>
    </div>
  )
}
