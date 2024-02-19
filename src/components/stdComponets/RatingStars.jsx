import {PiStar,PiStarFill,PiStarHalfFill} from "react-icons/pi"
export const RatingStars = ({rating,space}) => {
  return (
    <div className={`flex bg-clip-text text-yellow-50 relative text-transparent justify-evenly mx-0 space-x-${space?space:""}`}>
        {(rating>=1||(rating>0.5))?<PiStarFill/>:(rating<=0.5)&&(rating>0)?<PiStarHalfFill/>:<PiStar/>}
        {(rating>=2||(rating>1.5))?<PiStarFill/>:(rating<=1.5)&&(rating>1)?<PiStarHalfFill/>:<PiStar/>}
        {(rating>=3||(rating>2.5))?<PiStarFill/>:(rating<=2.5)&&(rating>2)?<PiStarHalfFill/>:<PiStar/>}
        {(rating>=4||(rating>3.5))?<PiStarFill/>:(rating<=3.5)&&(rating>3)?<PiStarHalfFill/>:<PiStar/>}
        {(rating>=5||(rating>4.5))?<PiStarFill/>:(rating<=4.5)&&(rating>4)?<PiStarHalfFill/>:<PiStar/>}
    </div>
  )
}
