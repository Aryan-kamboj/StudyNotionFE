import {HomePageExplore} from "../../../data/HomeNavbarData";
import { setHomePageNavFilter } from "../../../redux/slices/UI_slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
export const NavButton = ({children,filter,setterFn,selectedBtn}) => {
  const dispatecher = useDispatch();
  const applyFilter = (e)=>{
    if(filter){
      const filtered = HomePageExplore.find((element)=>element.tag === e.target.attributes.filter.value);
      dispatecher(setHomePageNavFilter(filtered));
      setterFn(filtered.courses);
    }
    else 
    {
      console.log(e.target.innerHTML)
      setterFn(e.target.innerHTML);
    }
  };
  let buttonValue = useSelector((state)=>{
    return state.rootReducer.UI_slice.homePageNavbarSelected;
  });
  if(!filter){
    buttonValue = selectedBtn;
  }
  return (
    buttonValue===children ? <div className="bg-richblack-900 rounded-full py-1 px-8 transition-all delay-75text-white " onClick={applyFilter} filter={filter}>{children}</div>:<div className="hover:bg-richblack-900 hover:rounded-full py-1 px-8 transition-all delay-75 text-richblack-300 hover:text-white " onClick={applyFilter} filter={filter}>{children}</div>
  )
}
