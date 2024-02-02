import React from 'react'

export const LightDarkCards = ({desc,title,light}) => {

    if(light){
        light=`bg-richblack-700`
    }
    else{
        light=`bg-richblack-800`
    }
  return (
    <div className={'w-[25%] h-[260px] p-9 max-desktop:w-[316px] '+light}>
        <h1 className='text-white text-lg pb-8 '>{title}</h1>
        <p className='text-richblack-300'>{desc}</p>
    </div>
  )
}
