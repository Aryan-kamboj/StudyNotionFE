import {NavButton} from "./NavButton"
export const HomePageNavbar = ({buttons,setterFn,selectedBtn}) => {
  return (
    <div className='text-white flex w-fit space-x-2 justify-between bg-richblack-800 shadow-solid px-1 py-1 rounded-full'>
        {
            buttons.map((button,i)=>{
                return(<NavButton setterFn = {setterFn} key={i} selectedBtn={selectedBtn} filter={button.filter}>{button.text}</NavButton>)})
        }
    </div>
  )
}
