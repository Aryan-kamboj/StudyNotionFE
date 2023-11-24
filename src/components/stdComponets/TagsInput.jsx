import React, { useState } from 'react'
import {FaXmark} from "react-icons/fa6"
export const TagsInput = ({setTags,tags,required,placeholder,label}) => {
    const [val,setVal] = useState("");
    console.log(tags);
    const addTag = (val)=>{
        if(!tags.some((tag)=> {
            if(tag===val)
            {
                console.log("hii");
                return true;
            }
            return false;
        })){
            setTags([...tags,val]);
            setVal("");
        }
       
    }
    const keyDownHandler = (e)=>{
        if(e.keyCode===13)
        { 
            e.preventDefault();
            addTag(val);
        }
        if(e.keyCode===8)
            setVal(val.slice(0,val.length-1));
        if(e.key.length===1)
            setVal(val+e.key);
        console.log(e);
    }
    const removeTag = (e)=>{
        e.stopPropagation();
        setTags(tags.filter((tag)=>{
            return(!(tag===e.currentTarget.attributes.tag.val));
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
        <input onKeyDown={keyDownHandler} placeholder={placeholder} val={val} className='w-[100%] bg-richblack-700 mt-2 p-3 text-md text-whtie outline-none rounded-lg border-b-richblack-200 border-b-[1px]'/>
    </div>
  )
}
