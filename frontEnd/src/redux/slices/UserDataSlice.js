import { createSlice } from "@reduxjs/toolkit";
import { getProfileApi } from "../../services/user/profileApis";
const initialState = {
    // profileData:document.cookie.length!==0?await getProfileApi():null,
    profileData:null,
    userType:document.cookie.length!==0?localStorage.getItem("userType"):null,
    enrolledCourses:[],
    cart:[],
    myCourses:[],
  }

  const UserDataSlice = createSlice({
    name: 'UserDataSlice',
    initialState,
    reducers: {
      setCourseDetails:(state,action)=>{
        state.courseDetails=action.payload;
      },
      updateMyCources:(state,action)=>{
        state.myCourses=action.payload;
      }, 
      updateCart:(state,action)=>{
        state.cart=action.payload;
      },
      updateUserType:(state,action)=>{
        state.userType = action.payload;
      },
      setProfileData: (state,action) => {
        state.profileData= action.payload;
      },
      setEnrolledCourses:(state,action)=>{
        state.enrolledCourses = action.payload;
      },
      updateContentConsumed:(state,action)=>{
        state.enrolledCourses[action.payload.idx].contentConsumed=action.payload.contentConsumed;
      },
      setMessage: (state,action) => {
        state.message = action.payload;
      },
    }
  })
  // Action creators are generated for each case reducer function
  export const {setEnrolledCourses,updateContentConsumed,setCourseDetails,updateUserType,setMessage,updateCart,updateMyCources,setProfileData } = UserDataSlice.actions;
  
  export default UserDataSlice;