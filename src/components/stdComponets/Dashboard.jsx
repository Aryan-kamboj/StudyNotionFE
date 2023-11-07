import React, { useState } from 'react'

import { MyProfile } from '../dashboardPages/MyProfile'
import { EnrolledCourses } from '../dashboardPages/StudentTabs/EnrolledCourses'
import { Cart } from '../dashboardPages/StudentTabs/Cart'
import { PurchaseHistory } from '../dashboardPages/StudentTabs/PurchaseHistory'
import { Courses } from '../dashboardPages/StudentTabs/Courses'
import { Settings } from '../dashboardPages/Settings'
import { MyDashboard } from '../dashboardPages/InstructorTabs/MyDashboard'
import { MyCourses } from '../dashboardPages/InstructorTabs/MyCourses'
import { DashboardNav } from '../dashboardPages/DashboardNav';
export const Dashboard = () => {
    const path = document.URL.split("/").slice(-1)[0];
    // console.log(path);
    const [tab,setTab]=useState(path);
    const userType = "student";
  return (
        <div className='text-white flex'>
            <DashboardNav setTab={setTab} userType={userType} tab={tab}/>
            {/* <DashboardNav setTab={setTab} userType={userType} tab={tab}/> */}
            {(tab==="my-profile")?<MyProfile />
            :tab==="enrolled-courses"?<EnrolledCourses />
            :tab==="cart"?<Cart />
            :tab==="purchase-history"?<PurchaseHistory />
            :tab==="courses"?<Courses />
            :tab==="dashboard"?<Settings />
            :tab==="my-Courses"?<MyDashboard />
            :tab==="my-courses"?<MyCourses />:
            <div className='text-white'>There has been some error please logIn again</div>
            }
        </div>
  )
}
