import React from 'react'

export const FieldRequiredText = ({active,data,fieldName}) => {
    let showRequired;
    if(Array.isArray(data)){
        if(data.length===0&&active){
            showRequired=true;
        }
    }
    else if(!data&&active){
        showRequired=true;
    }
  return (
    <div>
        {showRequired?<span className='text-xs text-pink-200'>{fieldName} is required </span>:<span></span>}
    </div>
  )
}
