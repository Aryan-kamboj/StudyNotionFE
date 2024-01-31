import { combineReducers } from "@reduxjs/toolkit";
import UI_slice from "./slices/UI_slice";
import UserDataSlice from "./slices/UserDataSlice"
import instructorSlice from "./slices/instructorSlice";
export const rootReducer = combineReducers({
    UI_slice:UI_slice.reducer,
    UserDataSlice:UserDataSlice.reducer,
    instructorSlice:instructorSlice.reducer,
})
export default rootReducer;