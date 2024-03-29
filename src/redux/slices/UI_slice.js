import { createSlice } from '@reduxjs/toolkit'
import { HomePageExplore } from "../../data/HomeNavbarData"
import { getCategories } from '../../services/open/categoryAPIs';
const initialState = {
  loading:false,
  // categories:await getCategories(),
  dashboardTab:"my-profile",
  categories:[],
  homePageNavbarSelected: HomePageExplore[0].tag,
  homePageCardsData:HomePageExplore[0].courses,
  homePageCardSelected:null,
}
const UI_slice = createSlice({
  name: 'UI_slice',
  initialState,
  reducers: {
    setDashTab:(state,action)=>{
      state.dashboardTab=action.payload;
    },
    setCategories:(state,action)=>{
      // console.log(action.payload);
      state.categories = action.payload;
    },
    setLoading:(sate,action)=>{
      // console.log("hiii");
      sate.loading = action.payload.loading;
    },
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
export const { setHomePageNavFilter,setHomePageCardSelected,setLoading,setCategories,setDashTab } = UI_slice.actions;

export default UI_slice;