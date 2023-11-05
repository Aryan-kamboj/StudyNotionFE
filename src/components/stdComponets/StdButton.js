import React from 'react'
import { Link } from 'react-router-dom'
export const StdButton = ({color,children,linkTo,width,type,disabled,handler,textColor}) => {
    let css = ` flex justify-center gap-2 items-center font-medium rounded-md py-3 px-6 shadow-solid hover:shadow-none transition-all duration-200 max-laptop:text-xs  `;
    if(color==="yellow"){
        if(!disabled)
        css += `hover:scale-95 bg-yellow-50 text-richblack-900 `
        else
        css += ` bg-richblack-700 text-richblack-5 hover:scale-100 hover:shadow-solid `
    }
    else if(color==="grey"){
        css += ` bg-richblack-800 text-richblack-5 `
    }
    else {
        css += ` bg-${color} text-${textColor}  `
    }
    width?css+=` w-[${width}%] `:css+=` w-fit `;
  return (linkTo?<Link to={linkTo}><div className={css} >{children}</div></Link>:<button onClick={handler} type={type} disabled={disabled} className={css}>{children}</button>)
}
