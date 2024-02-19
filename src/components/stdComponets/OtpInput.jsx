import React from 'react'
export const OtpInput = ({setOtp}) => {
    const backspaceHandler = (e)=>{
        if(e.key==="Backspace"&&e.target.value===""){
            e.target.previousSibling?e.target.previousSibling.focus():e.target.focus();
        }
    }
    const changeHandler = (e)=>{
        if("0"<=e.target.value&&"9">=e.target.value)
        {
            const arr = Array.from(e.target.parentNode.childNodes);
            const value = parseInt(arr.reduce((total,current)=>{
               return (total+=current.value);
            },0))
            setOtp(value);

            e.target.nextSibling?e.target.nextSibling.focus():e.target.focus();
        }
        else{
            e.target.value="";
        }
    }
    const css = "border-b-[1px] border-richblack-300 w-[100%] text-center bg-richblack-700 rounded-lg outline-none text-md text-white p-3";
    const css_to_remove_number_arrows= ` [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none `;
  return (
    <div>
        <div className='flex space-x-5'>
            <input required={true} placeholder='-' className={css+css_to_remove_number_arrows} maxLength="1" type={"text"} inputMode='numeric' onChange={changeHandler} onKeyDown={backspaceHandler}></input>
            <input required={true} placeholder='-' className={css+css_to_remove_number_arrows} maxLength="1" type={"text"} inputMode='numeric' onChange={changeHandler} onKeyDown={backspaceHandler}></input>
            <input required={true} placeholder='-' className={css+css_to_remove_number_arrows} maxLength="1" type={"text"} inputMode='numeric' onChange={changeHandler} onKeyDown={backspaceHandler}></input>
            <input required={true} placeholder='-' className={css+css_to_remove_number_arrows} maxLength="1" type={"text"} inputMode='numeric' onChange={changeHandler} onKeyDown={backspaceHandler}></input>
            <input required={true} placeholder='-' className={css+css_to_remove_number_arrows} maxLength="1" type={"text"} inputMode='numeric' onChange={changeHandler} onKeyDown={backspaceHandler}></input>
            <input required={true} placeholder='-' className={css+css_to_remove_number_arrows} maxLength="1" type={"text"} inputMode='numeric' onChange={changeHandler} onKeyDown={backspaceHandler}></input>
        </div>
    </div>
  )
}
