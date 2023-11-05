import React, { useState } from 'react'

import { MyProfile } from '../dashboardPages/MyProfile'
import { EnrolledCources } from '../dashboardPages/StudentTabs/EnrolledCources'
import { Cart } from '../dashboardPages/StudentTabs/Cart'
import { PurchaseHistory } from '../dashboardPages/StudentTabs/PurchaseHistory'
import { Cources } from '../dashboardPages/StudentTabs/Cources'
import { Settings } from '../dashboardPages/Settings'
import { MyDashboard } from '../dashboardPages/InstructorTabs/MyDashboard'
import { MyCources } from '../dashboardPages/InstructorTabs/MyCources'
import { DashboardNav } from '../dashboardPages/DashboardNav';
export const Dashboard = () => {
    const path = document.URL.split("/").slice(-1)[0];
    console.log(path);
    // instructo ke tabs "Dashboard" "My profile" | "My Cources" | "Settings" "Logout";
    // Student ke tabs "My Profile","Enrolled Cources","Wishlist","Purchase History","Cources";
    const [tab,setTab]=useState(path);
    const userType = "student";
  return (
        <div className='text-white flex'>
            <DashboardNav setTab={setTab} userType={userType} tab={tab}/>
            {/* <DashboardNav setTab={setTab} userType={userType} tab={tab}/> */}
            {(tab==="My Profile")||(tab==="My%20Profile")?<MyProfile tab={tab} setTab={setTab}/>
            :tab==="Enrolled Cources"||(tab==="Enrolled%20Cources")?<EnrolledCources tab={tab} setTab={setTab}/>
            :tab==="Cart"?<Cart tab={tab} setTab={setTab}/>
            :tab==="Purchase History"||(tab==="Purchase%20History")?<PurchaseHistory tab={tab} setTab={setTab}/>
            :tab==="Cources"?<Cources tab={tab} setTab={setTab}/>
            :tab==="Settings"?<Settings tab={tab} setTab={setTab}/>
            :tab==="Dashboard"?<MyDashboard tab={tab} setTab={setTab}/>
            :tab==="My Cources"||(tab==="My%20Cources")?<MyCources tab={tab} setTab={setTab}/>:
            <div className='text-white'>There has been some error please logIn again</div>
            }
        </div>
  )
}
