import React from 'react'
import { SectionDropdown } from './SectionDropdown';

export const SectionsArea = ({sections}) => {
  return (
    <div className='bg-richblack-700 text-richblack-400 border-[1px] rounded-xl border-richblack-600'>
    {sections.map((section)=>{
        return <SectionDropdown section={section}/>
    })}
    </div>
  )
}
