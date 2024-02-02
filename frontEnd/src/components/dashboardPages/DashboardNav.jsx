import React, { useState } from 'react'
import {LiaBookSolid,LiaBookmarkSolid,LiaGraduationCapSolid} from "react-icons/lia"
import {CgProfile,CgShoppingCart,CgLogOut} from "react-icons/cg"
import {RiDashboard2Line} from "react-icons/ri"
import {AiFillSetting,AiOutlinePlusCircle} from "react-icons/ai"
import {FaGripLines} from "react-icons/fa"
import {FaXmark} from "react-icons/fa6"
import { useNavigate } from 'react-router'
export const DashboardNav = ({setTab,userType,setUserType,tab}) => {
    // const currentTab = document.URL.split("/").slice(-1)[0];
    // console.log(currentTab);
    const [showTabs,setShowTabs] = useState(false);
    const navigator = useNavigate();
    const clickHandler = (e)=>{
      setShowTabs(false);
      e.stopPropagation();
      // console.log(e.currentTarget.attributes.id.value);
      navigator(`${e.currentTarget.attributes.id.value}`);
      setTab(e.currentTarget.attributes.id.value);
    }
    const logoutHandler = (e)=>{
      e.stopPropagation();
      navigator("/");
      console.log("log_out");
    }
    const handleUserType = (e)=>
    {
      if(userType==="student"){
        // console.log("hii");
        setUserType("instructor");
      }
      else if(userType==="instructor"){
        setUserType("student");
        // console.log("hii2")
      }
    }
    const selectedCSS = "bg-yellow-800 text-yellow-50 border-yellow-50 "
  return (
        <div className={`overflow-hidden transition-all duration-1000 max-tablet:w-[100%] w-[18%] top-14 text-richblack-300  border-b-[1px] ${showTabs?" space-y-2 max-tablet:h-[25rem] ":" max-tablet:h-[6rem] "} font-[500] pt-28 max-tablet:pt-12  text-md bg-richblack-800 border-x-[1px] border-richblack-700 `}>
        <div className='absolute z-[1000] top-[5rem]'>Under developemnt so <br/> to see tabs use - <button className='bg-pink-100 text-black' onClick={handleUserType}>{userType} Tabs</button></div>
        <div className='fixed max-tablet:static top-21 max-tablet:w-[100%] w-[18%]'>
          <div className={`pt-2 ${showTabs?" max-tablet:space-y-2 ":""}`}>
            {(userType==="student")?
            <div className={`${showTabs?"space-y-2":""}`}>
                <div onClick={clickHandler} id="my-profile" className={`duration-500 border-l-4 ${(tab==="my-profile")?selectedCSS: ` border-richblack-800 ${(showTabs)?"":" max-tablet:hidden "}`} flex items-center justify-between pr-6`}>
                  <div className='flex cursor-pointer items-center space-x-2 px-6 py-2'>
                    <CgProfile/>
                    <span>
                      My Profile
                    </span>
                  </div>
                  <div className={`max-tablet:text-[20px] text-[0px] ${(tab==="my-profile")? "":" hidden "}`}>
                    {showTabs?<FaXmark onClick={(e)=>{setShowTabs(false)}}/>:<FaGripLines onClick={(e)=>{e.stopPropagation();setShowTabs(true)}}/>}
                  </div>
                  
                </div>
                <div onClick={clickHandler} id="enrolled-courses" className={`duration-500 border-l-4 ${(tab==="enrolled-courses")?selectedCSS: `border-richblack-800 ${(showTabs)?"":"max-tablet:hidden"}`} flex items-center justify-between pr-6`}>
                  <div className='flex cursor-pointer items-center space-x-2 px-6 py-2'>
                    <LiaBookSolid/>
                    <span>
                      Enrolled Courses
                    </span>
                  </div>
                  <div className={`max-tablet:text-[20px] text-[0px] ${(tab==="enrolled-courses")?"":" hidden "}`}>
                    {showTabs?<FaXmark onClick={(e)=>{setShowTabs(false)}}/>:<FaGripLines onClick={(e)=>{e.stopPropagation();setShowTabs(true)}}/>}
                  </div>
                </div>
                <div onClick={clickHandler} id="cart" className={`duration-500 border-l-4 ${(tab==="cart")?selectedCSS: `border-richblack-800 ${(showTabs)?"":"max-tablet:hidden"}`} flex items-center justify-between pr-6`}>
                  <div className='flex cursor-pointer items-center space-x-2 px-6 py-2'>
                    <LiaBookmarkSolid/>
                    <span>
                      Cart
                    </span>
                  </div>
                  <div className={`max-tablet:text-[20px] text-[0px] ${(tab==="cart")?"":" hidden "}`}>
                    {showTabs?<FaXmark onClick={(e)=>{setShowTabs(false)}}/>:<FaGripLines onClick={(e)=>{e.stopPropagation();setShowTabs(true)}}/>}
                  </div>
                </div>
                <div onClick={clickHandler} id="purchase-history" className={`duration-500 border-l-4 ${(tab==="purchase-history")?selectedCSS: `border-richblack-800 ${(showTabs)?"":"max-tablet:hidden"}`} flex items-center justify-between pr-6`}>
                  <div className='flex cursor-pointer items-center space-x-2 px-6 py-2'>
                    <CgShoppingCart/>
                    <span>
                      Purchase History
                    </span>
                  </div>
                  <div className={`max-tablet:text-[20px] text-[0px] ${(tab==="purchase-history")?"":" hidden "}`}>
                    {showTabs?<FaXmark onClick={(e)=>{setShowTabs(false)}}/>:<FaGripLines onClick={(e)=>{e.stopPropagation();setShowTabs(true)}}/>}
                  </div>
                </div>
                <div onClick={clickHandler} id="courses" className={`duration-500 border-l-4 ${(tab==="courses")?selectedCSS: `border-richblack-800 ${(showTabs)?"":"max-tablet:hidden"}`} flex items-center justify-between pr-6`}>
                  <div className='flex cursor-pointer items-center space-x-2 px-6 py-2'>
                    <LiaGraduationCapSolid/>
                    <span>
                      Courses
                    </span>
                  </div>
                  <div className={`max-tablet:text-[20px] text-[0px] ${(tab==="courses")?"":" hidden "}`}>
                    {showTabs?<FaXmark onClick={(e)=>{setShowTabs(false)}}/>:<FaGripLines onClick={(e)=>{e.stopPropagation();setShowTabs(true)}}/>}
                  </div>
                </div>
            </div>
            :(userType==="instructor")?
            <div className='space-y'>
                <div onClick={clickHandler} id="dashboard" className={`duration-500 border-l-4 ${(tab==="dashboard")?selectedCSS: `border-richblack-800 ${(showTabs)?"":"max-tablet:hidden"}`} flex items-center justify-between pr-6`}>
                  <div className='flex cursor-pointer items-center space-x-2 px-6 py-2'>
                    <RiDashboard2Line/>
                    <span>
                    Dashboard
                    </span>
                  </div>
                  <div className={`max-tablet:text-[20px] text-[0px] ${(tab==="dashboard")?"":" hidden "}`}>
                    {showTabs?<FaXmark onClick={(e)=>{setShowTabs(false)}}/>:<FaGripLines onClick={(e)=>{e.stopPropagation();setShowTabs(true)}}/>}
                  </div>
                </div>
                <div onClick={clickHandler} id="my-courses" className={`duration-500 border-l-4 ${(tab==="my-courses")?selectedCSS: `border-richblack-800 ${(showTabs)?"":"max-tablet:hidden"}`} flex items-center justify-between pr-6`}>
                  <div className='flex cursor-pointer items-center space-x-2 px-6 py-2'>
                    <LiaBookSolid/>
                    <span>
                    My Courses
                    </span>
                  </div>
                  <div className={`max-tablet:text-[20px] text-[0px] ${(tab==="my-courses")?"":" hidden "}`}>
                    {showTabs?<FaXmark onClick={(e)=>{setShowTabs(false)}}/>:<FaGripLines onClick={(e)=>{e.stopPropagation();setShowTabs(true)}}/>}
                  </div>
                </div>
                <div onClick={clickHandler} id="add-course" className={`duration-500 border-l-4 ${(tab==="add-course")?selectedCSS: `border-richblack-800 ${(showTabs)?"":"max-tablet:hidden"}`} flex items-center justify-between pr-6`}>
                  <div className='flex cursor-pointer items-center space-x-2 px-6 py-2'>
                    <AiOutlinePlusCircle/>
                    <span>
                    Add Course
                    </span>
                  </div>
                  <div className={`max-tablet:text-[20px] text-[0px] ${(tab==="my-profile")?"":" hidden "}`}>
                    {showTabs?<FaXmark onClick={(e)=>{setShowTabs(false)}}/>:<FaGripLines onClick={(e)=>{e.stopPropagation();setShowTabs(true)}}/>}
                  </div>
                </div>
                <div>
                  <div className='border-b-[1px] mx-2 border-richblack-600'/>
                  <div onClick={clickHandler} id="my-profile" className={`duration-500 border-l-4 ${(tab==="my-profile")?selectedCSS: `border-richblack-800 ${(showTabs)?"":"max-tablet:hidden"}`} flex items-center justify-between pr-6`}>
                    <div className='flex cursor-pointer items-center space-x-2 px-6 py-2'>
                      <CgProfile/>
                      <span>
                      My Profile
                      </span>
                    </div>
                    <div className={`max-tablet:text-[20px] text-[0px] ${(tab==="my-profile")?"":" hidden "}`}>
                      {showTabs?<FaXmark onClick={(e)=>{setShowTabs(false)}}/>:<FaGripLines onClick={(e)=>{e.stopPropagation();setShowTabs(true)}}/>}
                    </div>
                  </div>
                </div>
                
            </div>
            :<div>There is some error please log in again</div>}

            <div className='border-b-[1px] mx-2 border-richblack-600'/>
            <div onClick={clickHandler} id="settings"  className={`duration-500 border-l-4 ${(tab==="settings")?selectedCSS: `border-richblack-800 ${(showTabs)?"":"max-tablet:hidden"}`} flex items-center justify-between pr-6`}>
              <div className='flex cursor-pointer items-center space-x-2 px-6 py-2'>
                <AiFillSetting/>
                <span>
                  Settings
                </span>
              </div>
              <div className={`max-tablet:text-[20px] text-[0px] ${(tab==="settings")?"":" hidden "}`}>
                {showTabs?<FaXmark onClick={(e)=>{setShowTabs(false)}}/>:<FaGripLines onClick={(e)=>{e.stopPropagation();setShowTabs(true)}}/>}
              </div>
            </div>
            <div onClick={logoutHandler} id="logout"  className={`duration-500 border-l-4 ${(tab==="logout")?selectedCSS: `border-richblack-800 ${(showTabs)?"":"max-tablet:hidden"}`} flex items-center justify-between pr-6`}>
              <div className='flex cursor-pointer items-center space-x-2 px-6 py-2'>
                <CgLogOut/>
                <span>
                  Logout
                </span>
              </div>
              <div className={`max-tablet:text-[20px] text-[0px] ${(tab==="logout")?"":" hidden "}`}>
                {showTabs?<FaXmark onClick={(e)=>{setShowTabs(false)}}/>:<FaGripLines onClick={(e)=>{e.stopPropagation();setShowTabs(true)}}/>}
              </div>
            </div>
          </div>
          </div>
      </div>
  )
}
