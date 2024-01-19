import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {RatingStars} from "../../stdComponets/RatingStars"
import { StdButton } from '../../stdComponets/StdButton'
import { updateCart } from '../../../redux/slices/UserDataSlice'
import {FiTrash2} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { removeFromeCart } from '../../../services/open/courseAPIs'
export const Cart = () => {
  const dispatcher = useDispatch();
    const removeHandler = async (e)=>{
      console.log(e.currentTarget.attributes.courseid.value);
      const {cart} = await removeFromeCart(e.currentTarget.attributes.courseid.value);
      console.log(cart);
      dispatcher(updateCart(cart));
    }
    const cart = useSelector(({rootReducer})=>{
        return rootReducer.UserDataSlice.cart;
    })
    const total = cart.reduce((acc,course)=>{
      return acc+course.coursePrice;
    },0) 
    const buyNowHandler = (e)=>{
        console.log("buy nowwwwww");
    }
    // console.log(cart);
  return (
    <div className='h-fit  '>
          <div className='ml-8 max-tablet:mx-2 mt-8 max-tablet:mt-1 '>
            <div className='text-sm space-y-4 max-tablet:space-y-2'>
              <span className='text-richblack-300'>Home / Dashboard /</span>
              <span className='text-yellow-50'> Cart</span>
              <h1 className='text-3xl max-tablet:text-lg pb-4 max-tablet:pb-0'>My Cart</h1>
            </div>
            <div className=' text-richblack-300 pb-3 border-b-[1px] border-richblack-700'>
              {cart.length} cources in cart.
            </div>
            <div style={{height:`75vh`}} className='flex justify-between max-tablet:relative max-tablet:-top-2 max-tablet:flex-col-reverse'>
              <div className='basis-[70%] max-tablet:basis-[90%] hideScrollBars scroll-smooth overflow-scroll'>
                {cart.map((course,i)=>{
                    const {
                    courseName,
                    coursePrice,
                    courseCategory,
                    _id,
                    rating,
                    reviewCount,
                    thumbnail,
                    instructor}=course;
                    console.log(course)
                    return (<div  key={i} className='h-[14rem] max-tablet:h-[16rem] py-4 items-center relative -top-[1px] justify-between flex max-tablet:flex-col border-t-[1px] border-richblack-700'>
                    <Link to={`/cources/${_id}`}>
                      <div className='flex space-x-6 '>
                        <img className=' cursor-pointer  w-[15rem] max-tablet:w-[5rem] h-[10rem] object-cover rounded-xl' src={thumbnail} alt={courseName} />
                        <div className='space-y-4'>
                          <h1 className='text-2xl font-[500]'>{courseName}</h1>
                          <p>{instructor.fullName}</p>
                          <p>{courseCategory}</p>
                          <div className='flex items-center space-x-3'><span className='text-yellow-100'>{rating.$numberDecimal}</span><RatingStars rating={rating.$numberDecimal}/><span className='text-richblack-400'>{reviewCount} reviews</span></div>
                        </div>
                      </div>
                      </Link>
                      <div className='flex flex-col max-tablet:mt-4 max-tablet:flex-row max-tablet:w-[90%] h-[10rem] max-tablet:h-[4rem] justify-between items-center'>
                        <button onClick={removeHandler} courseid={_id} className='space-x-2 flex bg-richblack-800 text-pink-200 items-center p-3 border-richblack-700 border-[1px] rounded-xl'><FiTrash2/><span>Remove</span></button>
                        <p className='text-2xl font-[500] text-yellow-100'>Rs.{coursePrice}</p>
                      </div>
                    </div>)
                  })}
              </div>
              <div className='w-[14rem] h-[10rem] max-tablet:w-[100%] max-tablet:relative max-tablet:right-0 basis-[20%] rounded-lg flex flex-col justify-evenly bg-richblack-700 p-4 max-tablet:pt-2 absolute top-[15rem] max-tablet:-top-0 right-[3.5rem]'>
                  <div className='max-tablet:flex justify-between items-center'>
                    <h1 className='text-richblack-200'>Total:</h1>
                    <p className='text-3xl text-yellow-50'>Rs. {total}</p>
                  </div>
                  <StdButton handler={buyNowHandler} width={100} color="yellow" >Buy Now</StdButton>
              </div>
            </div>
          </div>
    </div>
  )
}
