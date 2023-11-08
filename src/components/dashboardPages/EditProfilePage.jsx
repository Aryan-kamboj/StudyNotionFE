import React, { useState } from 'react'
import {IoIosArrowBack} from "react-icons/io"
import {FiTrash2,FiCheck} from 'react-icons/fi'
import { StdButton } from '../stdComponets/StdButton'
import { InputField } from "../stdComponets/InputField"
import {PhoneNumberInput} from "../stdComponets/PhoneNumberInput"
import {PasswordValidation} from "../stdComponets/PasswordValidation"
export const EditProfilePage = ({setEditPage,profileInfo}) => {
    const [checked,setChecked] = useState(false);
    // const [profileData,setProfileData] = useState(profileInfo);
    // let profilePhoto,fname,lname,email,phoneNo,gender,bio,DOB;
    const[fname,setfname]=useState(profileInfo.fname);
    const[profilePhoto,setprofilePhoto]=useState(profileInfo.profilePhoto);
    const[lname,setlname]=useState(profileInfo.lname);
    const[phoneNo,setphoneNo]=useState(profileInfo.phoneNo);
    const[gender,setgender]=useState(profileInfo.gender);
    const[bio,setbio]=useState(profileInfo.bio);
    const[DOB,setDOB] =useState( profileInfo.DOB); 
    const [today,setToday] = useState(new Date().toLocaleDateString('fr-ca'));
    const [oldPass,setOldPass] = useState("");
    const [newPass,setNewPass] = useState("");
    const [cnfNewPass,setCnfNewPass] = useState("");
    const [passChangeAllowed,setLock] = useState(false);

    // setToday needs to be removed

    const imageChangeHandler = (e) => {
        const image = e.target.files[0];
        image?setprofilePhoto(URL.createObjectURL(image)):
        console.log(URL.createObjectURL(image));
    }
    const uploadHandler = (e)=>{

    }
    const submitHandler = (e)=>{
        // next line setToday needs to be removed but build fas jati hai toh abhi nahi kiya
        setToday(today);
    }
    const deleteAccountHandler = () =>{
        if(checked)
        console.log("delete account");
        else
        console.log("checkbox not checked")
    }
  return (
    <div >
        <div className='text-sm max-tablet:m-4 m-8 space-y-4'>
            <div onClick={()=>{setEditPage(false)}} className='text-richblack-300 flex items-center space-x-3'><IoIosArrowBack/><span>Back</span></div>
            <h1 className='text-3xl '>My Profile</h1>
        </div>
        <div className='max-tablet:w-[90%] w-[80%] mx-auto space-y-4'>
            {/* CHANGE PROFILE PICTURE */}
            <div className="flex space-x-5 p-4 bg-richblack-800 rounded-lg border-richblack-700 border-[1px] ">
                <img className="rounded-full h-[6rem] w-[6rem] object-cover" alt={fname+" "+lname} src={profilePhoto}/>
                {/* <div>{profileData.profilePhoto}</div> */}
                <div className="space-y-2">
                    <h3 className="text-richblack-25 font-[500] text-lg">Change Profile Picture</h3>
                    <div className = "flex space-x-4">
                        <label className=' flex justify-center gap-2 items-center font-medium rounded-md py-3 px-6 shadow-solid hover:shadow-none hover:scale-95 transition-all duration-200 max-laptop:text-xs bg-richblack-700 text-richblack-5'>
                            <input onChange={imageChangeHandler} type="file" accept=".jpg, .jpeg, .png" className='hidden'/>
                            Change
                        </label>
                        <StdButton handler={uploadHandler} color="yellow">Upload</StdButton>
                    </div> 
                </div>
            </div>
            {/* CHANGE ACCOUNT INFO */}
            <div className="  p-4 max-tablet:p-3 bg-richblack-800 rounded-lg border-richblack-700 border-[1px] space-y-3">
                <div className="text-richblack-25 font-[500] text-lg">Change Profile Information</div>
                <form onSubmit={submitHandler}>
                    <div className='grid grid-cols-2 max-tablet:grid-cols-1 gap-4 relative'>
                        <InputField required={true} placeholder={fname} setterFn={setfname} label="First name" type="text"/>
                        <InputField required={true} placeholder={lname} setterFn={setlname} label="Last name" type="text"/>
                        <div className='space-y-1'>
                            <label className='text-sm '>Gender</label>
                            <select onChange={(e)=>setgender(e.target.value)} className='p-3 text-xl w-[100%] border-b-[1px] border-richblack-300 outline-none bg-richblack-700 text-white rounded-lg'>
                                <option defaultValue={gender==="Male"}>
                                    Male
                                </option>
                                <option defaultValue={gender==="Female"} >
                                    Female
                                </option>
                                <option defaultValue={gender==="Others"}>
                                    Others
                                </option>
                            </select>
                        </div>
                        <InputField width={100} placeholder={DOB} setterFn={setDOB} max={today} label={"Date of birth"} type="date"/>
                        <PhoneNumberInput required={true} setterFnNumber={setphoneNo} countryCode={phoneNo.countryCode} phoneNo={phoneNo.number} label={"Phone Number"}/>
                        <InputField placeholder={bio} setterFn={setbio} label={"About"} type={"textarea"}/>
                        {/* <InputField setterFn={setgender} label="Gender" name="gender" type="radio" value={"Male"}/>
                            <InputField setterFn={setgender} name="gender" type="radio" value={"Female"}/>
                            <InputField setterFn={setgender} name="gender" type="radio" value={"Other"}/> */}
                        <div className="max-tablet:static max-tablet:w-[100%] absolute bottom-20 w-[49%]"><StdButton width={100} color={"yellow"}>Update</StdButton></div>
                    </div>
                </form>
            </div>
            {/* CHANGE PASSWORD */}
            <div className=" p-4 bg-richblack-800 rounded-lg border-richblack-700 border-[1px] space-y-3">
                <h1 className="text-richblack-25 font-[500] text-lg">Change Password</h1>
                <form className='space-y-4'>
                    <div className='flex space-x-4 max-tablet:flex-col max-tablet:space-x-0 max-tablet:space-y-2'>
                        <InputField setterFn={setOldPass} value={oldPass} placeholder={"Old Password"} label="Old password" type={"password"}/>
                        <InputField setterFn={setNewPass} placeholder={"New Password"} label="New password" type={"password"}/>
                        <InputField setterFn={setCnfNewPass} placeholder={"Confirm New Password"} label="Confirm New password" type={"password"}/>
                    </div>
                    <StdButton disabled={passChangeAllowed?true:false} color="yellow">Change password</StdButton>
                </form>
                <PasswordValidation setLock={setLock} password={newPass} cnfPassword={cnfNewPass}/>
            </div>

            {/* DELETE ACCOUNT */}
            <div className='bg-pink-900 max-tablet:flex-col border-[1px] border-pink-700 rounded-lg flex p-6 select-none'>
                <div className='basis-[10%] mx-auto items-center flex'>
                    <div onClick={deleteAccountHandler} className={` duration-500 w-[4rem] h-[4rem] justify-center items-center flex rounded-full text-3xl font-[900]  ${checked?" text-pink-200 hover:bg-[#FF0800] bg-pink-700 hover:text-pink-700 cursor-pointer ":" bg-[#414141c6] text-white "}`}>
                        <FiTrash2/>
                    </div>
                </div>
                <div className='basis-[90%] space-y-3'>
                    <h1 className='text-pink-5 text-2xl font-[500]'>Delete Account</h1>
                    <p className='text-pink-25'>Would you like to delete your account ? <br/> This account contains <strong> PAID </strong> content. Deleting your account will <strong>REMOVE</strong> all data and contents associated with it. </p>
                    <div className='flex space-x-5'>
                        <div onClick={()=>{setChecked(!checked)}} className={`h-[1.5rem] flex justify-center items-center w-[1.5rem] border-[1px] rounded-md ${checked?" border-[#FF0800] bg-[#FF0800] ":" border-[#818181] bg-[#414141c6]"}`}>
                            {checked?<FiCheck/>:""}
                        </div>
                        <p className='italic text-[#FF0800]'>I want to delete my accout.</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-end space-x-5'>
                <StdButton color="grey">Cancle</StdButton>
                <StdButton color={"yellow"}>Save</StdButton>
            </div>

        </div>
    </div>
  )
}
