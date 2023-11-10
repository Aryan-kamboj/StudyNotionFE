import React from 'react'
import {BsFillEyeSlashFill,BsFillEyeFill} from "react-icons/bs"
import {useState} from "react"
export const InputField = ({type,lines,label,placeholder,required,value,setterFn,name,max}) => {
    const changeHandler = (e)=>{
        setterFn(e.target.value);
    }
    const [showPass,setShowPass] = useState(false);
    const showHidePass = (e)=>{
        showPass?e.target.parentNode.firstChild.type="password":e.target.parentNode.firstChild.type="text";
        setShowPass(!showPass);
    }
    let textArea;
    let rows=7;
    if(type==="textarea"){
        textArea=true;
        if(lines){
            rows=lines;
        }
    }
    let pass ;
    if(type==="password"){
        pass = true;
    }
    const css = "border-b-[1px] border-richblack-300 w-[100%] bg-richblack-700 rounded-lg outline-none text-md text-white p-3"
  return (
    <div className='w-[100%]'>
        <div className='text-white text-sm pb-2'>
            {required?<span>{label} <span className='text-pink-200'>*</span></span>:label}
        </div>
        {textArea?<textarea rows={rows} value={value} required={required} type={type} placeholder={placeholder} onChange={changeHandler} className={css}/>
        :pass?<div className="text-white relative flex" >
                <input max={max} name={name} value={value} required={required} id = {label} type={type} placeholder={placeholder} onChange={changeHandler} className={css}/>
                <div onClick={showHidePass} className="absolute right-[1rem] top-[1rem] text-richblack-100">{showPass?<BsFillEyeSlashFill className='pointer-events-none'/>:<BsFillEyeFill className='pointer-events-none'/>}</div>
            </div>
        :   <div>
            <input max={max} name={name} value={value} required={required} type={type} placeholder={placeholder} onChange={changeHandler} className={css}/>
            </div>}
        
    </div>
  )
}
