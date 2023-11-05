import React, { useState }  from 'react';
import {testUserProfile} from "../../data/tempData";
import {StdButton} from "../stdComponets/StdButton";
import {FaEdit} from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { EditProfilePage } from './EditProfilePage';

export const MyProfile = () => {
  
  const{profilePhoto,fname,
  lname,
  email,
  phoneNo,
  gender,
  bio,DOB} = testUserProfile;  
  const [showEditPage,setEditPage] = useState(false);
  return (
      <div className='basis-[100%] overflow-auto h-[93vh]'>
        <div className=' mx-auto pb-14'>
        {showEditPage?
        <EditProfilePage profileInfo={testUserProfile} setEditPage={setEditPage}/>
        :<div>
          <div className='text-sm m-8 space-y-4'>
            <span className='text-richblack-300'>Home / Dashboard /</span>
            <span className='text-yellow-50'> My profile</span>
            <h1 className='text-3xl '>My Profile</h1>
          </div>
          <div className='w-[80%] mx-auto space-y-8 '>
            <div className=' p-6 rounded-lg  bg-richblack-800 flex justify-between items-center border-[1px] border-richblack-700'>
              <div className='flex space-x-4 items-center text-rich'>
                <img className="w-[8rem] h-[8rem] rounded-full object-cover " src = {profilePhoto} alt={fname+" "+lname}/>
                <div>
                  <span className='text-2xl font-[500]'>{fname+" "+lname}</span>
                  <br/>
                  <span className='text-richblack-300'>{email}</span>
                </div>
              </div>
              <StdButton handler = {()=>setEditPage(true)} color="yellow"><FaEdit/>Edit</StdButton>
            </div>
            <div className='space-y-8 p-6 rounded-lg bg-richblack-800 items-center border-[1px] border-richblack-700'>
              <div className='flex justify-between items-center'>
                <h1 className='font-[500] text-2xl'>Bio</h1>
                <StdButton  handler = {()=>setEditPage(true)} color="yellow"><FaEdit/>Edit</StdButton>
              </div>
              <div className='text-richblack-300'>{bio}</div>
            </div>
            <div className=' p-6 rounded-lg bg-richblack-800 items-center border-[1px] border-richblack-700'>
              <div className='flex justify-between items-center'>
                <h1 className='font-[500] text-2xl'>Personal Details</h1>
                <StdButton  handler = {()=>setEditPage(true)} color="yellow"><FaEdit/>Edit</StdButton>
              </div>
              <div className='grid grid-cols-2 gap-y-8 mt-8'>
                <div className='flex flex-col '>
                  <span className='text-richblack-600'>First Name</span>
                  {fname}
                </div>
                <div className='flex flex-col '>
                  <span className='text-richblack-600'>Last Name</span>
                  {lname}
                </div>
                <div className='flex flex-col '>
                  <span className='text-richblack-600'>Email</span>
                  {email}
                </div>
                <div className='flex flex-col '>
                  <span className='text-richblack-600'>Gender</span>
                  {gender}
                </div>
                <div className='flex flex-col '>
                  <span className='text-richblack-600'>Phone Number</span>
                  {phoneNo.countryCode+" "+phoneNo.number}
                </div>
                <div className='flex flex-col '>
                  <span className='text-richblack-600'>Date Of Birth</span>
                  {DOB}
                </div>
              </div>
            </div>
          </div>
          </div>}
        </div>
      </div>
  )
}
