import React from 'react'
import countrycode from "../../data/countrycode.json";

export const PhoneNumberInput = ({phoneNo,countryCode,label,required,setterFnNumber,setterFnCountryCode}) => {
    const numberChangeHandler = (e)=>{
        setterFnNumber(e.target.value);
    }
    const countryCodeChangeHandler=(e)=>{
        setterFnCountryCode(e.target.value)
    }
    const css_to_remove_number_arrows= ` [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none `
  return (
    <div className='text-white text-sm'>
        <div className='pb-2'>{required?<span>{label} <span className='text-pink-200'>*</span></span>:label}</div>
        <div className='flex space-x-4 appearance-none'>
            <select onChange={countryCodeChangeHandler} className='appearance-none w-[30%] border-b-[1px] border-richblack-300 bg-richblack-700 rounded-lg outline-none text-md text-white p-3'>
            {countrycode.map((country,i)=>{
             return <option selected={country.code +"-"+country.country===countryCode} key={i}>{country.code +"-"+country.country}</option>
            })}
            </select>
        <input value={phoneNo} required={required} type={"number"} placeholder={"Phone Number"} onChange={numberChangeHandler} className={`border-b-[1px] border-richblack-300 w-[100%] bg-richblack-700 rounded-lg outline-none text-md text-white p-3 ${css_to_remove_number_arrows}` }/>
        </div>
    </div>
  )
}
