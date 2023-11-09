import React, { useState } from 'react'
import { MyProfile } from '../dashboardPages/MyProfile'
import { EnrolledCourses } from '../dashboardPages/StudentTabs/EnrolledCourses'
import { Cart } from '../dashboardPages/StudentTabs/Cart'
import { PurchaseHistory } from '../dashboardPages/StudentTabs/PurchaseHistory'
import { Courses } from '../dashboardPages/StudentTabs/Courses'
import { Settings } from '../dashboardPages/Settings'
import {AddCourse} from "../dashboardPages/InstructorTabs/AddCourse";
import { MyCourses } from '../dashboardPages/InstructorTabs/MyCourses'
import { DashboardNav } from '../dashboardPages/DashboardNav';
export const Dashboard = () => {
    const path = document.URL.split("/").slice(-1)[0];
    // console.log(path);
    const [tab,setTab]=useState(path);
    const userType = "instructor";
  return (
        <div className='text-white overflow-y-scroll hideScrollBars flex max-tablet:flex-col h-[100%] min-h-[92vh]'>
            <DashboardNav setTab={setTab} userType={userType} tab={tab}/>
            <div className=' overflow-y-scroll hideScrollBars basis-[80%] max-tablet:pt-0 pt-[2.9rem] '>
              {/* <DashboardNav setTab={setTab} userType={userType} tab={tab}/> */}
              {(tab==="my-profile")?<MyProfile />
              :tab==="enrolled-courses"?<EnrolledCourses />
              :tab==="cart"?<Cart/>
              :tab==="purchase-history"?<PurchaseHistory />
              :tab==="courses"?<Courses />
              :tab==="dashboard"?<Settings />
              :tab==="my-courses"?<MyCourses setTab={setTab} />
              :tab==="add-course"?<AddCourse setTab={setTab} />:
              <div className='text-white'>There has been some error please logIn again</div>
              }
            </div>
        </div>
  )
}
