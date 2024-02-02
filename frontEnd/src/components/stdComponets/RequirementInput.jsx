import React from 'react'

export const RequirementInput = ({requirements,setRequirements}) => {
  const addHandler = (e)=>{
    e.preventDefault();
    const input = document.getElementById("input");
    if(input.value.length!==0){
      const newRequirements = [...requirements,input.value]
      input.value="";
      setRequirements(newRequirements);
    }
  }
  const removeHandler = (e)=>{
    const string = e.target.parentNode.firstChild.innerText;
    const newRequirements = requirements.filter((requirement)=>{
        return (requirement!==string);
    })
    setRequirements(newRequirements);
  }
  return (
    <div>
      <div className='text-sm mb-2'>
        Requirements/Instructions <span className='text-pink-200'>*</span>
      </div>
       <div className='space-y-2'>
        <input required={true} id="input" className='p-3 outline-none rounded-lg border-b-[1px] border-richblack-300 w-[100%] bg-richblack-700 placeholder:text-richblack-200' type="text" placeholder='Enter Requirements/Instructions for the course'/>
        <button onClick={addHandler} type={"submit"} className='text-yellow-50 font-bold'>
          + Add
        </button> 
        </div>
      {requirements.map((requirement,key)=>{
          return <div className='text-white' key={key}><span>{requirement}</span><span onClick={removeHandler} className='text-richblack-300 text-xs cursor-pointer'> clear</span></div>
        })}
    </div>
  )
}
