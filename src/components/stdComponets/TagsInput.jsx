import React, { useState } from 'react'
import {FaXmark} from "react-icons/fa6"
export const TagsInput = ({setTags,tags,required,placeholder,label}) => {
    const [value,setValue] = useState("");
    // const changeHandler = (e)=>{
    //     // setValue(e.target.value);
    //     // console.log(value);
    // }
    console.log(tags);
    const addTag = (value)=>{
        if(!tags.some((tag)=> {
            if(tag===value)
            {
                console.log("hii");
                return true;
            }
            return false;
        })){
            setTags([...tags,value]);
            setValue("");
        }
       
    }
    const keyDownHandler = (e)=>{
        if(e.keyCode===13)
        { 
            e.preventDefault();
            addTag(value);
        }
        if(e.keyCode===8)
            setValue(value.slice(0,value.length-1));
        if(e.key.length===1)
            setValue(value+e.key);
        console.log(e);
    }
    const removeTag = (e)=>{
        e.stopPropagation();
        setTags(tags.filter((tag)=>{
            return(!(tag===e.currentTarget.attributes.tag.value));
        }))
    }
  return (
    <div>
        <div className='text-sm'>
            {label}{required?<span className='text-pink-200 pl-[0.3rem]'>*</span>:""}
        </div>
        <div className='w-[100%] flex justify-start flex-wrap'>
            {tags.map((tag)=>{
                return <div className='px-2 py-1 mr-2 mt-2 bg-yellow-300 text-white rounded-full w-fit flex items-center space-x-2'><span>{tag}</span><FaXmark tag={tag} onClick={removeTag}/></div>
            })}
        </div>
        <input onKeyDown={keyDownHandler} placeholder={placeholder} value={value} className='w-[100%] bg-richblack-700 mt-2 p-3 text-md text-whtie outline-none rounded-lg border-b-richblack-200 border-b-[1px]'/>
    </div>
  )
}
