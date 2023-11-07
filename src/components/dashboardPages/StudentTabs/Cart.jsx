import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {RatingStars} from "../../stdComponets/RatingStars"
import { StdButton } from '../../stdComponets/StdButton'
import {FiTrash2} from 'react-icons/fi'
import { removeFromCart } from '../../../redux/slices/UserDataSlice'
export const Cart = () => {
    const dispatcher = useDispatch();

    const cart = useSelector(({rootReducer})=>{
        return rootReducer.UserDataSlice.cart;
    })
    const total = cart.reduce((acc,course)=>{
      return acc+course.price;
    },0) 
    const buyNowHandler = (e)=>{
        console.log("buy nowwwwww");
    }
    // console.log(cart);
  return (
    <div className='basis-[100%] h-[93vh] '>
          <div className='ml-8 mt-8 pb-14'>
            <div className='text-sm space-y-4 '>
              <span className='text-richblack-300'>Home / Dashboard /</span>
              <span className='text-yellow-50'> Cart</span>
              <h1 className='text-3xl pb-4'>My Cart</h1>
            </div>
            <div className=' text-richblack-300 pb-3 border-b-[1px] border-richblack-700'>
              {cart.length} cources in cart.
            </div>
            <div style={{height:`76vh`}} className=' flex  justify-between relative '>
              <div className='basis-[70%] hideScrollBars scroll-smooth overflow-scroll'>
                {cart.map((course,i)=>{
                    const {
                    title,
                    price,
                    id,
                    rating,
                    reviewCount,
                    thumbnail,
                    instructorName}=course;
                    return (<div key={i} className='cursor-pointer h-[14rem] items-center relative -top-[1px] justify-between flex border-t-[1px] border-richblack-700'>
                      <div className='flex space-x-6'>
                        <img className='w-[15rem] h-[10rem] object-cover rounded-xl' src={thumbnail} alt={title} />
                        <div className='space-y-4'>
                          <h1 className='text-2xl font-[500]'>{title}</h1>
                          <p>{instructorName}</p>
                          <div className='flex items-center space-x-3'><span className='text-yellow-100'>{rating}</span><RatingStars rating={rating}/><span className='text-richblack-400'>{reviewCount} reviews</span></div>
                        </div>
                      </div>
                      <div className='flex flex-col h-[10rem] justify-between items-center'>
                        <button onClick={(e)=>{dispatcher(removeFromCart(e.currentTarget.attributes.courseid.value))}} courseid={id} className='space-x-2 flex bg-richblack-800 text-pink-200 items-center p-3 border-richblack-700 border-[1px] rounded-xl'><FiTrash2/><span>Remove</span></button>
                        <p className='text-2xl font-[500] text-yellow-100'>Rs.{price}</p>
                      </div>
                    </div>)
                  })}
              </div>
              <div className='w-[14rem] h-[10rem] basis-[20%] rounded-lg flex flex-col justify-evenly bg-richblack-700 p-4 absolute top-6 right-[3.5rem]'>
                  <h1 className='text-richblack-200'>Total:</h1>
                  <p className='text-3xl text-yellow-50'>Rs. {total}</p>
                  <StdButton handler={buyNowHandler} width={100} color="yellow" >Buy Now</StdButton>
              </div>
            </div>
          </div>
    </div>
  )
}
