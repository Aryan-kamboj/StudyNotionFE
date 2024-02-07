import {LuShoppingCart} from 'react-icons/lu';
import {CgProfile} from "react-icons/cg";
import logo from "../assets/Logo/Logo-Full-Light.png";
import {RiArrowDropDownLine} from "react-icons/ri";
import {PiTriangleFill} from "react-icons/pi";
import {Link} from "react-router-dom"
import { NavbarLinks } from '../data/NavbarData';
import { FaSortDown } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { updateUserType } from '../redux/slices/UserDataSlice';
function Headder() {
    const dispatcher = useDispatch();
    function closeProfileListner () { 
        document.addEventListener("click",
        ()=>{
            setShowProfileOptions(false);
        }
        )}
    const [profileOptions,setShowProfileOptions] = useState(false);
    const profilePhoto = useSelector(({rootReducer})=>rootReducer.UserDataSlice?.profileData?.profilePhoto);
    // console.log(profilePhoto);
    const userType = useSelector(({rootReducer})=>rootReducer.UserDataSlice.userType);
    const uiCategories = useSelector(({rootReducer})=>{
        return rootReducer.UI_slice.categories;
    });
    const [categoriesVisible,setVisible] = useState(false);
    const makeVisible = (e)=>{
        setVisible(true);
    }
    const hide = (e)=>{
        setVisible(false);
    }
    const navigator = useNavigate();
    return (
      <div className="h-14 fixed z-[100] w-[100vw] bg-richblack-900 text-rich-black-25  border-solid border-b-[1px] border-richblack-700">
            {categoriesVisible?<div onMouseEnter={makeVisible} onMouseLeave={hide} className='rounded-2xl p-3 bg-richblack-5 absolute top-[48px] z-[10000] right-[45%] w-[15%] flex flex-col text-richblack-5 '><PiTriangleFill className="text-2xl absolute -top-[18px] right-[41%]" />
            {uiCategories.map(({categoryName},i)=>{
                return <Link key={i} to={`catalog/${categoryName}`}className='text-black font-[500] text-lg p-4 text-center hover:bg-richblack-100 rounded-2xl'>{categoryName}</Link>
            })}</div>:<p className='w-[15%]'></p>}

            <div className='justify-between flex items-center h-[100%] '>
                <div className="pl-32 max-tablet:pl-4">
                    <Link to={'/'}><img src={logo} alt={"logo"} loading='lazy'/></Link>
                </div>
                <div className="w-fill flex my-auto  justify-between text-richblack-25 max-tablet:hidden">
                    {NavbarLinks?NavbarLinks.map((link,index)=>{
                        if(link.title==="Catalog"){
                            return (
                                <div className=' py-2 px-3 flex' onMouseEnter={makeVisible} onMouseLeave={hide} key={index} ><div className='flex pr-1' >{link.title}</div><RiArrowDropDownLine className='text-2xl'/></div>
                            )
                        }
                        return (<Link key={index} to = {link.path}><div className='py-2 px-3 flex' key={index}>{link.title}</div></Link>)
                    }):""}
                </div>
                <div className='flex w-[22%] text-2xl text-white justify-evenly  max-tablet:w-[50%] pr-0'>
                    {userType?userType==="student"?
                    <div className='flex space-x-4' >
                        <div onClick={()=>navigator("dashboard/cart")}><LuShoppingCart/></div>
                        <div onClick={(e)=>{e.stopPropagation();console.log("profileeee");setShowProfileOptions(true);closeProfileListner()}}>
                            {profilePhoto?<div className=' rounded-full overflow-hidden'>
                                            <img className='object-cover h-[2rem] w-[2rem]' src={profilePhoto}/>
                                        </div>
                            :<CgProfile/>}
                        </div>
                        {profileOptions?
                        <div className='text-lg border-[1px] text-richblack-300 cursor-pointer border-richblack-700 rounded-lg bg-richblack-800 absolute mt-[2.5rem] right-[4rem]'>
                            <div onClick={()=>{navigator("/dashboard/my-profile")}} className='border-b-[1px] text-center border-b-richblack-700 p-2'>Dashboard</div>
                            <div onClick={()=>{Cookies.remove('login',{ path: '/' });dispatcher(updateUserType(null));navigator("/")}} className='p-2 text-center'>Log out</div>
                        </div>
                        :""}
                    </div>
                    :userType==="instructor"?
                    <div className='flex ' onClick={(e)=>{e.stopPropagation();setShowProfileOptions(true);closeProfileListner()}}>
                        {profilePhoto?<div className=' rounded-full overflow-hidden'><img className='object-cover h-[2rem] w-[2rem]' src={profilePhoto}/></div>:<CgProfile/>}<FaSortDown className='relative bottom-1'/>
                        {profileOptions?
                        <div className='text-lg border-[1px] text-richblack-300 border-richblack-700 rounded-lg bg-richblack-800  absolute mt-[2.5rem] right-[4rem]'>
                            <div onClick={()=>{navigator("/dashboard/dashboard")}} className='border-b-2 text-center border-b-richblack-700 p-2'>Dashboard</div>
                            <div onClick={()=>{Cookies.remove('login',{ path: '/' });dispatcher(updateUserType(null));navigator("/")}} className='p-2 text-center'>Log out</div>
                        </div>
                        :""}
                    </div>
                    :""
                    :<div className='flex items-center space-x-4 text-lg text-richblack-300'>
                        <div className='border-[1px] border-richblack-700 px-2 py-1 bg-richblack-800 rounded-md' onClick={()=>{navigator("/login")}}>Log In</div>
                        <div className='border-[1px] border-richblack-700 px-2 py-1 bg-richblack-800 rounded-md' onClick={()=>{navigator("/signUp")}}>Sign Up</div>
                    </div>}
                </div>
            </div>
            
      </div>
      
    )
  };
  export default Headder;
  