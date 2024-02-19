import React from 'react'

export const LoadingScreen = ({loading}) => {
  return (<div>
    {
        loading?<div className='h-[100vh] w-[100vw] static bg-richblack-500'>
            LoadingScreen
        </div>:""
    }
  </div>
  )
}
