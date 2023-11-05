import React, { useEffect } from 'react'
import {AiFillCheckCircle , AiFillCloseCircle } from "react-icons/ai"
import { useState } from 'react';
export const PasswordValidation = ({password,cnfPassword,setLock}) => {
    const [checkLower,setCheckLower] = useState(false);
    const [checkUpper,setCheckUpper] = useState(false);
    const [checkNumber,setCheckNumber] = useState(false);
    const [checkSpecial,setCheckSpecial] = useState(false);
    const [checkMinChars,setCheckMinChars] = useState(false);
    let cnfCheck = false;   
    function validator(){
        // console.log(password);
        const array = password.split("");
        setCheckLower(false);
        setCheckUpper(false);
        setCheckNumber(false);
        setCheckSpecial(false);
        setCheckMinChars(false);
        array.forEach((element)=>{
            if("a"<=element && element<="z")
                setCheckLower(true);
            if("A"<=element && element<="Z")
                setCheckUpper(true);
            if("0"<=element && element<="9")
                setCheckNumber(true);
            if(("!"<=element && element<="/")||(":"<=element && element<="@")||("["<=element && element<="`")||("{"<=element && element<="~"))
                setCheckSpecial(true);
        })
        if(array.length >= 8)
            setCheckMinChars(true);
        if(password===cnfPassword)
            cnfCheck = true;
        else
            cnfCheck = false;
        if(checkMinChars&&checkSpecial&&checkNumber&&checkUpper&&checkLower&&cnfCheck){
            console.log("Pass= "+password+" cnfPass = "+cnfPassword);
            if(setLock!==undefined){
                setLock(false);
            }
        }  
        else
        if(setLock){
            setLock(true);
        } 
    }
   
    useEffect(()=>{
        console.log(cnfCheck);
        validator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[password,cnfPassword])
    const cssTrue = `text-caribbeangreen-200`
    const cssFalse = `text-pink-400`
  return (
    <div className='flex flex-wrap '>
        <p id={"lowercase"} className={`w-[50%] flex items-center ${checkLower?cssTrue:cssFalse}`}>{checkLower?<AiFillCheckCircle className='mr-2'/>:<AiFillCloseCircle className='mr-2'/>} One lowercase character</p>
        <p id={"uppercase"} className={`w-[50%] flex items-center ${checkUpper?cssTrue:cssFalse}`}>{checkUpper?<AiFillCheckCircle className='mr-2'/>:<AiFillCloseCircle className='mr-2'/>} One uppercase character</p>
        <p id={"number"} className={`w-[50%] flex items-center ${checkNumber?cssTrue:cssFalse}`}>{checkNumber?<AiFillCheckCircle className='mr-2'/>:<AiFillCloseCircle className='mr-2'/>} One number</p>
        <p id={"special"} className={`w-[50%] flex items-center ${checkSpecial?cssTrue:cssFalse}`}>{checkSpecial?<AiFillCheckCircle className='mr-2'/>:<AiFillCloseCircle className='mr-2'/>} One special character</p>
        <p id={"minChars"} className={`w-[50%] flex items-center ${checkMinChars?cssTrue:cssFalse}`}>{checkMinChars?<AiFillCheckCircle className='mr-2'/>:<AiFillCloseCircle className='mr-2'/>} Atleast 8 characters</p>
    </div>
  )
}
