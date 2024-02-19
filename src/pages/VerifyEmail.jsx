import { useState } from 'react'
import { StdButton } from '../components/stdComponets/StdButton';
import {FaUndoAlt,FaLongArrowAltLeft} from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom';
import { OtpInput } from '../components/stdComponets/OtpInput';
import { generateOTP, signUpApi } from '../services/auth/auth';
import { useSelector } from 'react-redux';
export const VerifyEmail = () => {
    const [otp,setOtp]=useState();
    const userData = useSelector(({rootReducer})=>rootReducer.UserDataSlice.userData);
    const navigator = useNavigate();
    const resendOtp = async ()=>{
        await generateOTP(userData?.email);
    }
    const submitHandler = async (e)=>{
        e.preventDefault();
        if(userData){
            const data = {...userData,otp};
            const response = await signUpApi(data);
            if(response){
                navigator("/login")
            }
        }
        else{
            navigator("/signUp")
        }
    }
  return (
    <div className='h-[93vh] max-tablet:h-[79vh] flex justify-center items-center'>
        <div className='w-[32%] space-y-2 max-tablet:w-[96%]'>
            <h1 className='text-3xl font-[500] text-white'>
                Verify Email
            </h1>
            <p className='text-richblack-400'>
                A verification code has been sent to you. Enter the code below
            </p>
            <form className='space-y-6' onSubmit={submitHandler}>
                <OtpInput setOtp={setOtp}/>
                <StdButton width={100} color="yellow">Verify Email</StdButton>
            </form>
            <div className='text-white flex items-center justify-between mt-5'>
                <Link to ={"/login"} className='space-x-3 items-center flex '><FaLongArrowAltLeft className='inline'/><span>Back to login</span></Link>
                <div className='flex items-center justify-center space-x-2 text-blue-100' onClick={resendOtp}><FaUndoAlt/><span>Resend</span></div>
            </div>
        </div>
    </div>
  )
}
