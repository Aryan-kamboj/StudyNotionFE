import React from 'react'
import { RatingStars } from './RatingStars';
import { Link } from 'react-router-dom';
export const CourseCard = ({thumbnail,title,rating,price,reviewCount,id}) => {
    // console.log(thumbnail,title,rating,price,reviewCount);
  return (
    <Link to={`/cources/${id}`} className='w-[25rem] relative space-y-2'>
        <img src={thumbnail} alt={"Thumbnail"} className='rounded-2xl w-[25rem] h-[18rem] object-cover '/>
        <p className='text-xl'>{title}</p>
        <div className=' flex items-center space-x-3'>
            <span className='text-yellow-100'>{rating}</span>
            <div>
                <RatingStars rating={rating}/>
            </div>
            <span className='text-richblack-300'>{reviewCount} Ratings</span>
        </div>
        <p className='text-lg'>Rs. {price}</p>
    </Link>
  )
}
