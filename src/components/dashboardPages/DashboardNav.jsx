import React from 'react'
import {LiaBookSolid,LiaBookmarkSolid,LiaGraduationCapSolid} from "react-icons/lia"
import {CgProfile,CgShoppingCart,CgLogOut} from "react-icons/cg"
import {RiDashboard2Line} from "react-icons/ri"
import {AiFillSetting} from "react-icons/ai"
import { useNavigate } from 'react-router'
export const DashboardNav = ({setTab,userType,tab}) => {
    const navigator = useNavigate();
    const clickHandler = (e)=>{
      e.stopPropagation();
      navigator(`${e.currentTarget.innerText}`);
      setTab(e.currentTarget.innerText);
    }
    const selectedCSS = "bg-yellow-800 text-yellow-50 border-yellow-50 "
  return (
         <div className=' h-[93vh] w-[20%] top-14 text-richblack-300 space-y-2 font-[500] pt-14  text-md bg-richblack-800 border-x-[1px] border-richblack-700 '>
            {(userType==="student")?
            <div className='space-y-2'>
                <div onClick={clickHandler} className={`flex border-l-4 cursor-pointer items-center space-x-2 px-6 py-2 ${(tab==="My Profile")||(tab==="My%20Profile")?selectedCSS: "border-richblack-800 "}`}><CgProfile/><span>My Profile</span></div>
                <div onClick={clickHandler} className={`flex border-l-4 cursor-pointer items-center space-x-2 px-6 py-2 ${(tab==="Enrolled Courses")||(tab==="Enrolled%20Cources")?selectedCSS: "border-richblack-800 "}`}><LiaBookSolid/><span>Enrolled Courses</span></div>
                <div onClick={clickHandler} className={`flex border-l-4 cursor-pointer items-center space-x-2 px-6 py-2 ${(tab==="Cart")?selectedCSS: "border-richblack-800 "}`}><LiaBookmarkSolid/><span>Cart</span></div>
                <div onClick={clickHandler} className={`flex border-l-4 cursor-pointer items-center space-x-2 px-6 py-2 ${(tab==="Purchase History")||(tab==="Purchase%20History")?selectedCSS: "border-richblack-800 "}`}><CgShoppingCart/><span>Purchase History</span></div>
                <div onClick={clickHandler} className={`flex border-l-4 cursor-pointer items-center space-x-2 px-6 py-2 ${(tab==="Courses")?selectedCSS: "border-richblack-800 "}`}><LiaGraduationCapSolid/><span>Courses</span></div>
            </div>
            :(userType==="instructor")?
            <div className='space-y-2'>
                <div onClick={clickHandler} className={`flex border-l-4 cursor-pointer items-center space-x-2 px-6 py-2 ${(tab==="Dashboard")?selectedCSS: "border-richblack-800 "}`}><RiDashboard2Line/><span>Dashboard</span></div>
                <div onClick={clickHandler} className={`flex border-l-4 cursor-pointer items-center space-x-2 px-6 py-2 ${(tab==="My Courses")||(tab==="My%20Cources")?selectedCSS: "border-richblack-800 "}`}><LiaBookSolid/><span>My Courses</span></div>
                <div className='border-b-[1px] mx-2 border-richblack-600'/>
                <div onClick={clickHandler} className={`flex border-l-4 cursor-pointer items-center space-x-2 px-6 py-2 ${(tab==="My Profile")||(tab==="My%20Profile")?selectedCSS: "border-richblack-800 "}`}><CgProfile/><span>My Profile</span></div>
            </div>
            :<div>There is some error please log in again</div>}

            <div className='border-b-[1px] mx-2 border-richblack-600'/>
            <div onClick={clickHandler}  className={`flex border-l-4 cursor-pointer items-center space-x-2 px-6 py-2 ${(tab==="Settings")?selectedCSS: "border-richblack-800 "}`}><AiFillSetting/><span>Settings</span></div>
            <div onClick={clickHandler}  className={`flex border-l-4 cursor-pointer items-center space-x-2 px-6 py-2 ${(tab==="Logout")?selectedCSS: "border-richblack-800 "}`}><CgLogOut/><span>Logout</span></div>
        </div>
  )
}
