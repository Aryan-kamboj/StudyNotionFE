import { useState }  from 'react';
import {testUserProfile} from "../../data/tempData";
import {StdButton} from "../stdComponets/StdButton";
import {FaEdit} from "react-icons/fa"
import { EditProfilePage } from './EditProfilePage';
import { useSelector } from 'react-redux';

export const MyProfile = () => {
  const profileData =  useSelector(({rootReducer})=>{return rootReducer.UserDataSlice?.profileData});  
  const [showEditPage,setEditPage] = useState(false);
  return (
      <div className=' pt-14 max-tablet:pt-0 overflow-auto hideScrollBars h-fit'>
        <div className=' mx-auto pb-14'>
        {showEditPage?
        <EditProfilePage profileInfo={testUserProfile} setEditPage={setEditPage}/>
        :<div>
          <div className='text-sm m-8 space-y-4 max-tablet:space-y-2'>
            <span className='text-richblack-300'>Home / Dashboard /</span>
            <span className='text-yellow-50'> My profile</span>
            <h1 className='text-3xl '>My Profile</h1>
          </div>
          <div className='max-tablet:w-[90%] w-[80%] mx-auto space-y-8 '>
            <div className=' p-6 rounded-lg bg-richblack-800 flex max-tablet:flex-col justify-between items-center border-[1px] border-richblack-700'>
              <div className='flex max-tablet:space-x-8 space-x-4 items-center text-rich'>
                <img className="max-tablet:w-[6rem] max-tablet:h-[6rem] w-[8rem] h-[8rem] rounded-full object-cover " src = {profileData?.profilePhoto} alt={profileData?.fname+" "+profileData?.lname}/>
                <div>
                  <span className='text-2xl max-tablet:text-base font-[500]'>{profileData?.fname+" "+profileData?.lname}</span>
                  <br/>
                  <span className='max-tablet:text-xs text-richblack-300'>{profileData?.email}</span>
                </div>
              </div>
              <StdButton handler = {()=>setEditPage(true)} color="yellow"><FaEdit/>Edit</StdButton>
            </div>
            <div className='space-y-8 p-6 rounded-lg bg-richblack-800 items-center border-[1px] border-richblack-700'>
              <div className='flex justify-between items-center'>
                <h1 className='font-[500] text-2xl'>Bio</h1>
                <StdButton  handler = {()=>setEditPage(true)} color="yellow"><FaEdit/>Edit</StdButton>
              </div>
              <div className='text-richblack-300'>{profileData?.bio}</div>
            </div>
            <div className=' p-6 rounded-lg bg-richblack-800 items-center border-[1px] border-richblack-700'>
              <div className='flex justify-between items-center'>
                <h1 className='font-[500] text-2xl'>Personal Details</h1>
                <StdButton  handler = {()=>setEditPage(true)} color="yellow"><FaEdit/>Edit</StdButton>
              </div>
              <div className='grid max-tablet:grid-cols-1  grid-cols-2 gap-y-8 mt-8'>
                <div className='flex flex-col '>
                  <span className='text-richblack-600'>First Name</span>
                  {profileData?.fname}
                </div>
                <div className='flex flex-col '>
                  <span className='text-richblack-600'>Last Name</span>
                  {profileData?.lname}
                </div>
                <div className='flex flex-col '>
                  <span className='text-richblack-600 '>Email</span>
                  <span className='no-underline'>{profileData?.email}</span>
                </div>
                <div className='flex flex-col '>
                  <span className='text-richblack-600'>Gender</span>
                  {profileData?.gender}
                </div>
                <div className='flex flex-col '>
                  <span className='text-richblack-600'>Phone Number</span>
                  <span className='no-underline'>{profileData?.countryCode+" "+profileData?.phoneNo}</span>
                </div>
                <div className='flex flex-col '>
                  <span className='text-richblack-600'>Date Of Birth</span>
                  {profileData?.DOB}
                </div>
              </div>
            </div>
          </div>
          </div>}
        </div>
      </div>
  )
}
