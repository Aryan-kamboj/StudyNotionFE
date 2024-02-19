import { useDispatch } from "react-redux";
import { StdButton } from "./stdComponets/StdButton"
import Cookies from "js-cookie"
import { updateUserType } from "../redux/slices/UserDataSlice";
export const LogOutModal = ({setModal}) => {
    const dispatcher = useDispatch();
    document.addEventListener("keydown",(e)=>{
        e.preventDefault();
    })
    document.addEventListener("click",()=>{
        setModal(false);
    })
    const logoutHandler = (e)=>{
        e.stopPropagation();
        Cookies.remove('login',{ path: '/' });
        dispatcher(updateUserType(null));
        setModal(false);
      }
  return (
    <div className="flex items-center justify-center absolute backdrop-blur h-screen w-screen top-0 left-0 z-[100] ">
        <div className="bg-richblack-900 items-center justify-center flex flex-col space-y-4 border-[1px] w-[25%] p-10 border-richblack-500 rounded-lg">
            <p className="text-white text-xl">Do you want to log out ?</p>
            <div className="flex space-x-4 ">
                <StdButton handler={logoutHandler} color="yellow">LogOut</StdButton>
                <StdButton handler={()=>{setModal(false)}} color="grey">Cancle</StdButton>
            </div>
        </div>
    </div>
  )
}
