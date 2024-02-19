import {PiStar,PiStarFill} from "react-icons/pi"
export const RatingSelection = ({setRating,rating}) => {
  return (
    <div className="flex text-3xl text-yellow-100 items-center justify-center">
        {(rating>=1)?<PiStarFill onClick={()=>{setRating(1)}}/>:<PiStar onClick={()=>{setRating(1)}}/>}
        {(rating>=2)?<PiStarFill onClick={()=>{setRating(2)}}/>:<PiStar onClick={()=>{setRating(2)}}/>}
        {(rating>=3)?<PiStarFill onClick={()=>{setRating(3)}}/>:<PiStar onClick={()=>{setRating(3)}}/>}
        {(rating>=4)?<PiStarFill onClick={()=>{setRating(4)}}/>:<PiStar onClick={()=>{setRating(4)}}/>}
        {(rating>=5)?<PiStarFill onClick={()=>{setRating(5)}}/>:<PiStar onClick={()=>{setRating(5)}}/>}
    </div>
  )
}
