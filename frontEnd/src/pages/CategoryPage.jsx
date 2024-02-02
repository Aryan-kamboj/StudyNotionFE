import { CourseCard } from '../components/stdComponets/CourseCard';
import { useEffect, useState } from 'react';
import { mostPopularCourses } from '../data/tempData';
import { Footer } from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { getCategoryData } from '../services/open/categoryAPIs';
export const CategoryPage = () => {
  const location = useLocation();
  const [data,setData] = useState();
  useEffect(()=>{
    const {pathname}=location;
    const arr = pathname.split("/");
    const category = arr.slice(-1)[0];
    (async()=>{
      const {data} = await getCategoryData(category);
      setCategoryData({
      categoryName:`${category}`,
      categoryDescription:"Description",
      mostPopularCourses:data?.data,
      randomSuggestionCources:[],});
      console.log(data);
    })();
  },[location])
    const [mostPopulerFilter,setFilter] = useState(true);
    // fetch data and put it in the designated variables 

    const [categoryData,setCategoryData] = useState({
      // here i have to write a fetch fucntion that gets all the data form backend 
      categoryName:"category name",
      categoryDescription:"Description",
      mostPopularCourses:data?.data,
      randomSuggestionCources:[],

    })
    const filterHandler = (e)=>{
      setCategoryData(categoryData)
      console.log(e.target.innerHTML);
      if(e.target.innerHTML==="New"&&mostPopulerFilter)
        setFilter(!mostPopulerFilter)
      if(e.target.innerHTML==="Most Populer"&&!mostPopulerFilter)
        setFilter(!mostPopulerFilter);
    }
    return (
      <div className='text-white'>
              <div className='bg-richblack-800 text-richblack-400 p-20 space-y-4'>
                  <p className='text-sm'>Home / Catalog / <span className='text-yellow-25'>{categoryData.categoryName}</span></p>
                  <p className='text-white text-3xl '>{categoryData.categoryName}</p>
                  <p className='text-richblack-300 font-[500]'>{categoryData.categoryDescription}</p>
              </div>
              <div className='m-20'>
                  <div className=' border-b-[0.5px] border-richblack-400 pb-[8px]'>
                    <h1 className='text-4xl font-[500]'>Courses to get you started</h1>
                    <div className='pt-4'>
                      <p onClick={filterHandler} className={mostPopulerFilter?`text-sm py-[10px] px-4 text-yellow-25 inline border-b-2  border-yellow-25`:" text-richblack-200 inline text-sm mx-4"}>Most Populer</p>
                      <p onClick={filterHandler} className={mostPopulerFilter? " inline text-sm mx-4 text-richblack-200":`text-sm text-yellow-25 py-[10px] px-4 inline border-b-2  border-yellow-25`}>New</p>
                    </div>
                  </div>
                  <div className='flex space-x-5 mt-4 flex-wrap'>
                    {categoryData.mostPopularCourses?.map((course,i)=>{
                      console.log(course);
                      return (<CourseCard key={i} id={course._id} thumbnail={course.thumbnail} title={course.courseName} price={course.coursePrice} reviewCount={course.reviewCount} rating={course.rating.$numberDecimal}/>)
                    })}
                  </div>
              </div>
              <Footer/>
          </div>
        )
}