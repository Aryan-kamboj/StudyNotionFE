import React from 'react'

export const NumbersBar = () => {
    const data=[
        {
            number:"5K",
            title:"Active Students"
        },
        {
            number:"10+",
            title:"Mentors"
        },
        {
            number:"200+",
            title:"Courses"
        },
        {
            number:"50+",
            title:"Awards"
        },
    ]
  return (
    <div className='text-white flex justify-evenly bg-richblack-700 py-12 text-center'>
        {data.map((item,i)=>{
            return (<div key={i}>
                <h1 className='text-3xl font-[500]'>{item.number}</h1>
                <p className='text-richblack-400 font-[500]'>{item.title}</p>
            </div>)
        })}
    </div>
  )
}
