import { ImCross } from "react-icons/im";
import {InputField} from "../InputField"
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RatingSelection } from "./RatingSelection";
import {useState} from "react"
import { FieldRequiredText } from "../FieldRequiredText";
import { StdButton } from "../StdButton";
import { saveReviewApi } from "../../../services/student/courseApis";
export const AddReviewModal = ({setModal,courseId}) => {
    const {fullName,profilePhoto} = useSelector(({rootReducer})=>rootReducer.UserDataSlice.profileData);
    const [rating,setRating] = useState(4);
    const [review,setReview] = useState("");
    const [requiredActive,setReqAcitive] = useState(false);
    const submitHandler = async()=>{
        setReqAcitive(true);
        if(review.length>0){
            await saveReviewApi(courseId,rating,review);
        }
    }
  return (
    <div className='absolute h-screen flex items-center justify-center w-screen z-[200] backdrop-blur top-0 left-0' >
        <div className="w-[40%] text-white overflow-hidden rounded-lg">
            <div className="flex text-xl border-b-2 border-richblack-25 font-[500] items-center h-[4rem] justify-between px-8 bg-richblack-700">
                <span>Add review</span>
                <ImCross onClick={()=>{setModal(false)}}/>
            </div>
            <div className="bg-richblack-800 px-8">
                <div className="flex space-x-4 items-center justify-center py-8">
                    <img className="rounded-full w-[4rem] h-[4rem] object-cover" src={profilePhoto} alt={"ProfilePhoto"}/>
                    <div className="flex flex-col text-lg">
                        <span className="font-[500]">{fullName}</span>
                        <span className="font-[100] text-md text-richblack-100">Posting Publicly</span>
                    </div>
                </div>
                <RatingSelection rating={rating} setRating={setRating}/>
                <InputField setterFn={setReview} required={true} label={"Add your experience"} value={review} placeholder={"Share details of your experiance of this course"} type={"textarea"}/>
                <FieldRequiredText active = {requiredActive} data={review} fieldName={"Review"} />
                <div className="flex space-x-4 justify-end py-4 ">
                    <StdButton color={"grey"} handler={()=>{setModal(false)}}>Cancle</StdButton>
                    <StdButton color={"yellow"} handler={submitHandler}>Submit</StdButton>
                </div>
            </div>
        </div>
    </div>
  )
}
