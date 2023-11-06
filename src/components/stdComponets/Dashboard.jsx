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
    const [tab,setTab]=useState(path);
    const userType = "student";
  return (
        <div className='text-white flex'>
            <DashboardNav setTab={setTab} userType={userType} tab={tab}/>
            {/* <DashboardNav setTab={setTab} userType={userType} tab={tab}/> */}
            {(tab==="My Profile")||(tab==="My%20Profile")?<MyProfile tab={tab} setTab={setTab}/>
            :tab==="Enrolled Courses"||(tab==="Enrolled%20Cources")?<EnrolledCourses tab={tab} setTab={setTab}/>
            :tab==="Cart"?<Cart tab={tab} setTab={setTab}/>
            :tab==="Purchase History"||(tab==="Purchase%20History")?<PurchaseHistory tab={tab} setTab={setTab}/>
            :tab==="Courses"?<Courses tab={tab} setTab={setTab}/>
            :tab==="Settings"?<Settings tab={tab} setTab={setTab}/>
            :tab==="Dashboard"?<MyDashboard tab={tab} setTab={setTab}/>
            :tab==="My Courses"||(tab==="My%20Cources")?<MyCourses tab={tab} setTab={setTab}/>:
            <div className='text-white'>There has been some error please logIn again</div>
            }
        </div>
  )
}
