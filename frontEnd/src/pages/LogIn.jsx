import { InputField } from '../components/stdComponets/InputField'
import { StdButton } from '../components/stdComponets/StdButton'
import {useState} from "react";
import { Link } from 'react-router-dom'
import loginPhoto from "../assets/Images/login.webp";
import frame from "../assets/Images/frame.png"
import { loginAPI } from '../services/auth/auth';

export const LogIn = () => {
    const [password,set_pass_ui] = useState();
    const [email,set_email_ui] = useState();
    const submitHandler = async (e)=>{
        e.preventDefault();
          await loginAPI({
            email:email,
            password:password,
        });
    }
  return (
    <div className='h-fit flex pt-16 max-tablet:flex-col max-tablet:h-[116vh] '>
        {/* form section */}
        <div className='w-[50%] p-16 max-tablet:p-4 max-tablet:w-[100%] space-y-4' >
            <div className=''>
                <h1 className=' text-white text-3xl pb-6 font-[500]'>Welcome Back</h1>
                <p className='text-richblack-100 text-lg'>Build skills for today, tomorrow, and beyond.</p>
                <p className='font-edu-sa font-bold font-italic text-blue-100'>Education to future-proof your career.</p>
            </div>
            <form onSubmit={submitHandler} className='space-y-6'>
                <InputField label={"Email Address"} value={email} setterFn={set_email_ui} type={"email"} placeholder={"Enter your email here"}/>
                <InputField label={"Password"} value={password} setterFn={set_pass_ui}  type={"password"} placeholder={"Enter your password here"} />
                <Link to="/forgot_password"><div className='text-blue-100 text-sm text-right'>Forgot Password</div></Link>
                <StdButton color={"yellow"} width={100}>Log In</StdButton>
            </form>
        </div>
        {/* image */}
        <div className='mt-14 relative max-tablet:w-[82%] max-tablet:mt-6 mx-auto'>
            <img src={loginPhoto} alt='LoginPhoto' className='z-[10] relative'/>
            <img src={frame} alt='loginFrame' className='absolute top-6 left-6 z-[0]'/>
        </div>
    </div>
  )
}
