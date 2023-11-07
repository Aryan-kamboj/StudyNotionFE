import { createSlice } from "@reduxjs/toolkit";
import {testCartData} from "../../data/tempData"
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
    cart:[...testCartData],
  }

  const UserDataSlice = createSlice({
    name: 'UI_slice',
    initialState,
    reducers: {
      addToCart:(state,action)=>{
        // console.log(action.payload);
        // console.log(typeof state.cart)
        state.cart.push(action.payload);
      },
      removeFromCart:(state,action)=>{
        console.log("action called");
        console.log(action);
        state.cart = state.cart.filter((item)=>{
          return(item.id !== action.payload);
        });
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
  export const { setFname,setLname,setMessage,setphoneNo,setEmail,setPassword,addToCart,removeFromCart } = UserDataSlice.actions;
  
  export default UserDataSlice;