import React from 'react'
import {BsFillPeopleFill} from "react-icons/bs"
import {MdOutlinePlayLesson} from "react-icons/md"
import {setHomePageCardSelected} from "../../redux/slices/UI_slice"
import { useDispatch,useSelector } from 'react-redux'
export const Card = ({data,setSelected}) => {
    const cardHeading = useSelector((store)=>{
        return store.rootReducer.UI_slice.homePageCardSelected;
    })
    const dispatecher = useDispatch();
    function clickHandler(e){
        dispatecher(setHomePageCardSelected(e.currentTarget.attributes.heading.value));
        setSelected(e.currentTarget.attributes.heading.value);
    }
    let cssM,cssP;
    if(cardHeading===data.heading){
        cssM = `text-black relative bg-white w-[350px] h-[300px] shadow-[10px_10px_#FFD60A] transition-all `;
        cssP = `absolute bottom-[1rem] border-t-2 text-blue-300 border-richblack-300 w-[350px] border-dashed pt-4 px-8 justify-between flex`
    }
    else {
        cssM = `w-[350px] relative h-[300px] hover:shadow-[10px_10px_#FFD60A] text-white bg-richblack-800 transition-all `;
        cssP = `text-richblack-400 absolute bottom-[1rem] border-t-2 border-richblack-300 w-[350px] border-dashed pt-4 px-8 justify-between flex`
    }
  return (
    <div className={cssM} heading={data.heading} onClick={clickHandler}>
        {/* hover:bg-white
            hover:text-black */}
        <div className='px-8 py-6'>
            <h1 className='font-[500] text-2xl'>{data.heading}</h1>
            <div className='mt-4 text-richblack-400'>{data.description}</div>
        </div>
        <div className={cssP}>
            <div className='gap-2 flex items-center'>
                <BsFillPeopleFill/>
                {data.level}
            </div>
            <p className='flex gap-2 items-center'>
                <MdOutlinePlayLesson/>
                {data.lessons}
                <span>Lessons</span>
            </p>
        </div>
    </div>
  )
}
