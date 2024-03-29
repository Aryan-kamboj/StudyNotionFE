import { useEffect, useState } from 'react'
import { MyProfile } from '../dashboardPages/MyProfile'
import { EnrolledCourses } from '../dashboardPages/StudentTabs/EnrolledCourses'
import { Cart } from '../dashboardPages/StudentTabs/Cart'
import { PurchaseHistory } from '../dashboardPages/StudentTabs/PurchaseHistory'
import { Courses } from '../dashboardPages/StudentTabs/Courses'
import { Settings } from '../dashboardPages/Settings'
import {AddCourse} from "../dashboardPages/InstructorTabs/AddCourse";
import { MyCourses } from '../dashboardPages/InstructorTabs/MyCourses'
import { DashboardNav } from '../dashboardPages/DashboardNav';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { MyDashboard } from './InstructorTabs/MyDashboard'
import { setDashTab } from '../../redux/slices/UI_slice'
export const Dashboard = () => {
    const path = document.URL.split("/").slice(-1)[0];
    const navigator = useNavigate();
    const dispatcher = useDispatch();
    const tab=useSelector(({rootReducer})=>rootReducer.UI_slice.dashboardTab);
    const setTab = (tab)=>{
      dispatcher(setDashTab(tab))
    }
    const [userType,setUserType] = useState(useSelector(({rootReducer})=>{
        return (rootReducer.UserDataSlice.userType);
    }));
    useEffect(()=>{
      if(!userType){
        navigator("/login");
      }    
    },[userType])
  return (
    <div className='text-white overflow-y-scroll hideScrollBars flex max-tablet:flex-col h-full min-h-full'>
            <DashboardNav setTab={setTab} setUserType={setUserType} userType={userType} tab={tab}/>
            <div className=' overflow-y-scroll hideScrollBars basis-[80%] max-tablet:pt-0 pt-[2.9rem] '>
              {/* <DashboardNav setTab={setTab} userType={userType} tab={tab}/> */}
              {(tab==="my-profile")?<MyProfile />
              :tab==="enrolled-courses"?<EnrolledCourses />
              :tab==="cart"?<Cart/>
              :tab==="purchase-history"?<PurchaseHistory />
              :tab==="courses"?<Courses />
              :tab==="dashboard"?<MyDashboard setTab={setTab}/>
              :tab==="settings"?<Settings/>
              :tab==="my-courses"?<MyCourses setTab={setTab} />
              :tab==="add-course"?<AddCourse setTab={setTab} />:
              <div className='text-white'>There has been some error please logIn again</div>
              }
            </div>
        </div>
  )
}
