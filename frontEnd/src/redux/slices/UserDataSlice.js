import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    fname:"",
    lname:"",
    phoneNo:{
        countryCode:"+91-India",
        number:"",
    },
    email:"",
    message:"",
    password:"",
    userType:document.cookie.length!==0?localStorage.getItem("userType"):null,
    cart:[],
    myCourses:[],
  }

  const UserDataSlice = createSlice({
    name: 'UserDataSlice',
    initialState,
    reducers: {
      updateMyCources:(state,action)=>{
        state.myCourses=action.payload;
      }, 
      updateCart:(state,action)=>{
        state.cart=action.payload;
      },
      setUserType:(state,action)=>{
        state.userType = action.payload;
      },
        setFname: (state,action) => {
        state.fname= action.payload;
      },
        setLname:(state,action)=>{
        state.lname = action.payload;
      },
      setEmail: (state,action) =>
      {
        state.email = action.payload;
      },
      setphoneNo: (state,action) => {
        if(action.payload.countryCode)
        state.phoneNo.countryCode = action.payload.countryCode;
        else
        state.phoneNo.number = action.payload.number;
      },
      setMessage: (state,action) => {
        state.message = action.payload;
      },
      setPassword:(state,action)=>{
        state.password = action.payload;
      }
    }
  })
  // Action creators are generated for each case reducer function
  export const { setFname,setLname,setUserType,setMessage,setphoneNo,setEmail,setPassword,updateCart,updateMyCources } = UserDataSlice.actions;
  
  export default UserDataSlice;