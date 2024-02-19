import { useState } from 'react'
import { InputField } from '../components/stdComponets/InputField'
import { PasswordValidation } from '../components/stdComponets/PasswordValidation'
import { StdButton } from '../components/stdComponets/StdButton';
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa"
export const ChooseNewPass = () => {
    const [password,setPassword]=useState("");
    const [cnfPassword,setCnfPassword]=useState("");
    const [lock,setLock]=useState(false);
    const [resetDone,setReset]=useState(false);

    // this email needs to be changed afterwards

    const email = "aryankk@24";
    const submitHandler =(e)=>{
        const data = {
            password:password,
            cnfPassword:cnfPassword,
        }
        console.log(data);
        setReset(true);
    }
  return (
    <div className='text-white items-center flex h-[93vh] '>
        {resetDone?
        <div className='w-[32%] mx-auto space-y-5 '>
            <h1 className='text-3xl font-[500]'>Reset complete</h1>
            <p className='text-richblack-200'>All done! We have sent an email to {email} to confirm </p>
            <div><StdButton linkTo={"/login"} color="yellow" width={100}>Return to LogIn</StdButton></div>
        </div>
        :<div className='w-[32%] mx-auto '>
            <h1 className='text-3xl font-[500]'>Choose New Password</h1>
            <p className='text-richblack-200'>Almost done. Enter your new password and you are all set</p>
            <form className='space-y-3 mt-5' onSubmit={submitHandler}>
                <InputField type={"password"} required={true} label={"New Password"} setterFn={setPassword} placeholder={"Enter new password"}/>
                <InputField type={"password"} required={true} label={"Re-enter new password"} setterFn={setCnfPassword} placeholder={"Re-Enter new password"}/>
                <PasswordValidation password={password} cnfPassword={cnfPassword} setLock={setLock}/>
                <div className="pb-4">
                    <StdButton  color={"yellow"} width={100} disabled={lock}>Reset Password</StdButton>
                </div>
            </form>
            <Link to ={"/login"} className='space-x-3 items-center flex '><FaLongArrowAltLeft className='inline'/><span>Back to login</span></Link>
        </div>}
    </div>
  )
}
