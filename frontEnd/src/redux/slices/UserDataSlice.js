import { createSlice } from "@reduxjs/toolkit";
import { getProfileApi } from "../../services/user/profileApis";
const initialState = {
    profileData:document.cookie.length!==0?await getProfileApi():null,
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
        state.fname= action.payload;
      },
      setEnrolledCourses:(state,action)=>{
        state.enrolledCourses = action.payload;
      },
      setMessage: (state,action) => {
        state.message = action.payload;
      },
    }
  })
  // Action creators are generated for each case reducer function
  export const {setEnrolledCourses,setCourseDetails,updateUserType,setMessage,updateCart,updateMyCources,setProfileData } = UserDataSlice.actions;
  
  export default UserDataSlice;