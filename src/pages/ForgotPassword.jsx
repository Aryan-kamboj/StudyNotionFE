import React, { useState } from 'react'
import { InputField } from '../components/stdComponets/InputField'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {FaLongArrowAltLeft} from "react-icons/fa"
import { StdButton } from '../components/stdComponets/StdButton'

export const ForgotPassword = () => {
  const [email,set_email_ui]=useState("")
  const [resetPasswordMailSent,setMailSent_ui] = useState(false);

  // api call to backend on submit
  const submitHandler = (e)=>{
    e.preventDefault();
    // after the backend says that mail is sent we update the mailSent variable
    setMailSent_ui(!resetPasswordMailSent);
    console.log(e)
  }
  // api call to resend email
  const resendEmail = (e)=>{
    console.log(e);
  }
  return (
    <div className='text-white flex justify-center mt-[11rem] h-[72vh]'>
      <div className='w-[37%] max-tablet:w-[88%] '>
        {resetPasswordMailSent?
        <div>
          <h1 className='text-3xl font-[500] mb-6'>
            Check Email
          </h1>
          <p className='text-richblack-100 font-[500] mb-6'>
            We have sent the rest email to {email}
          </p>
          <StdButton width={100} color={"yellow"} onClick={resendEmail} >
              Resend Email
          </StdButton>
        </div>
        :<div>
          <div>
            <h1 className='text-3xl font-[500] mb-6'>Reset your password</h1>
            <p className='text-richblack-100 font-[500] mb-6'>Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery. </p>
        </div>
        <form onSubmit={submitHandler} className=" space-y-8 ">
          <InputField  required={true} type={"email"} value={email} uiFn={set_email_ui} label={"Email Address"} placeholder={"Enter your email here"} />
          <StdButton width={100} color={"yellow"} >Reset Password</StdButton>
        </form>
        </div>}
        <Link to ={"/login"} className='space-x-3 mt-5 items-center flex '><FaLongArrowAltLeft className='inline'/><span>Back to login</span></Link>
      </div>
    </div>
  )
}
