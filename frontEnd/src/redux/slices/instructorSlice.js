import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentlyEditing:localStorage.getItem("userType")==="instructor"?"6596730b41696e8b12fb6e43":null,
    courseInfo:{}
}

const instructorSlice = createSlice({
    name:"instructorSlice",
    initialState,
    reducers:{
        setCurrentlyEditing:(state,action)=>{
            state.currentlyEditing=action.payload;
        },
        setCourseInfo:(state,action)=>{
            state.courseInfo=action.payload;
        }
    }
})
export const {setCurrentlyEditing,setCourseInfo} =instructorSlice.actions;
export default instructorSlice;