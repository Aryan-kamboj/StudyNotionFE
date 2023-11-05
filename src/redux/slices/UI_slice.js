import { createSlice } from '@reduxjs/toolkit'
import { HomePageExplore } from "../../data/HomeNavbarData"
const initialState = {
  homePageNavbarSelected: HomePageExplore[0].tag,
  homePageCardsData:HomePageExplore[0].courses,
  homePageCardSelected:null,
}
const UI_slice = createSlice({
  name: 'UI_slice',
  initialState,
  reducers: {
    setHomePageNavFilter: (state,action) => {
      state.homePageNavbarSelected = action.payload.tag;
      state.homePageCardsData = action.payload.courses;
    },
    setHomePageCardSelected:(state,action)=>{
      state.homePageCardSelected = action.payload;
    },
  }
})
// Action creators are generated for each case reducer function
export const { setHomePageNavFilter,setHomePageCardSelected } = UI_slice.actions;

export default UI_slice;