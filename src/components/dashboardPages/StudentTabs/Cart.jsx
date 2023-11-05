import React from 'react'
import { useSelector } from 'react-redux'

export const Cart = () => {
    const cart = useSelector(({rootReducer})=>{
        return rootReducer.UserDataSlice.cart;
    })
    console.log(cart);
  return (
    <div>
    
    </div>
  )
}
