import { createSlice } from "@reduxjs/toolkit";
// import {testCartData} from "../../data/tempData"
import { getCart } from "../../services/open/courseAPIs";
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
    cart:document.cookie.length!==0?await getCart():[],
    userType:document.cookie.length!==0?localStorage.getItem("userType"):null,
  }

  const UserDataSlice = createSlice({
    name: 'UI_slice',
    initialState,
    reducers: {
      updateCart:(state,action)=>{
        console.log(action.payload);
        state.cart=action.payload;
      },
      setUserType:(state,action)=>{
        console.log("setUserType runnig")
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
        console.log(action.payload);
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
  export const { setFname,setLname,setUserType,setMessage,setphoneNo,setEmail,setPassword,updateCart } = UserDataSlice.actions;
  
  export default UserDataSlice;