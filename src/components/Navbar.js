import {LuSearch,LuShoppingCart} from 'react-icons/lu';
import {CgProfile} from "react-icons/cg";
import logo from "../assets/Logo/Logo-Full-Light.png";
import {RiArrowDropDownLine} from "react-icons/ri";
import {PiTriangleFill} from "react-icons/pi";
import {Link} from "react-router-dom"
import { NavbarLinks } from '../data/NavbarData';
import { catagories } from '../data/tempData';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Headder() {
    const pathname = window.location.pathname;
    console.log(pathname);
    const [catagoriesVisible,setVisible] = useState(false);
    const makeVisible = (e)=>{
        setVisible(true);
    }
    const hide = (e)=>{
        setVisible(false);
    }
    const navigator = useNavigate();
    return (
      <div className="h-14 z-[100] w-[100vw] bg-richblack-900 text-rich-black-25  border-solid border-b-[1px] border-richblack-700">
            {catagoriesVisible?<div onMouseEnter={makeVisible} onMouseLeave={hide} className='rounded-2xl p-3 bg-richblack-5 absolute top-[48px] z-[10000] right-[45%] w-[15%] flex flex-col text-richblack-5 '><PiTriangleFill className="text-2xl absolute -top-[18px] right-[41%]" />{catagories.map((catagory,i)=>{
                return <Link key={i} to={`catalog/${catagory}`} className='text-black font-[500] text-lg p-4 text-center hover:bg-richblack-100 rounded-2xl'>{catagory}</Link>
            })}</div>:<p className='w-[15%]'></p>}

            <div className='justify-between flex items-center'>
                <div className="pl-32 max-tablet:pl-4">
                    <Link to={'/'}><img src={logo} alt={"logo"} loading='lazy'/></Link>
                </div>
                <div className="w-fill flex my-auto  justify-between text-richblack-25 max-tablet:hidden">
                    {NavbarLinks.map((link,index)=>{
                        if(link.title==="Catalog"){
                            return (
                                <div className=' py-2 px-3 flex' onMouseEnter={makeVisible} onMouseLeave={hide} key={index} ><div className='flex pr-1' >{link.title}</div><RiArrowDropDownLine className='text-2xl'/></div>
                            )
                        }
                        return (<Link key={index} to = {link.path}><div className='py-2 px-3 flex' key={index}>{link.title}</div></Link>)
                    })}
                </div>
                <div className='flex w-[22%] text-2xl text-white justify-evenly py-4  max-tablet:w-[50%] pr-0'>
                    <LuSearch className=''/>
                    <div onClick={()=>navigator("dashboard/cart")}><LuShoppingCart/></div>
                    <CgProfile className=''/>
                </div>
            </div>
            
      </div>
      
    )
  };
  export default Headder;
  