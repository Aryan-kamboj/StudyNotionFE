import React from 'react'
import {FooterLink2} from "../data/FooterLinks"
import {BsFacebook,BsGoogle,BsTwitter,BsYoutube,BsBalloonHeartFill} from "react-icons/bs"
import { Link } from 'react-router-dom';
import { CyanColoredText } from './stdComponets/CyanColoredText';
// video playback screen
export const Footer = () => {
   const Company = ["About","Careers","Affiliates"];
    const Resources = ["Articles",
        "Blog",
        "Chart Sheet",
        "Code challenges",
        "Docs",
        "Projects",
        "Videos",
        "Workspaces"]
    
    
    const Support = [
        "Help Center"]
    const Plans = [
        "Paid memberships",
        "For students",
        "Business solutions"
    ]
    const Community= [
        "Forums",
        "Chapters",
        "Events"
    ]
  return (
    <div className=' bg-richblack-800'>
        <div className=' w-[80%] pt-[6rem] flex relative mx-auto flex-wrap '>
            <div className=' mt-3 w-[50%] max-tablet:w-[100%] max-tablet:border-none max-tablet:justify-normal max-tablet:space-x-2 max-tablet:space-y-2 justify-evenly flex border-r-[1px] border-richblack-700 flex-wrap'>
                <div className='max-tablet:space-x-2 space-y-3 flex flex-col'>
                    <svg width="160" height="32" viewBox="0 0 160 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_62501_1126)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16 32C24.8366 32 32 24.8365 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8365 7.16344 32 16 32ZM18.6074 9.83905C19.2066 10.2804 19.5457 10.8996 19.6247 11.6967H23.7235C23.7037 10.4912 23.3811 9.43062 22.7556 8.51497C22.13 7.5993 21.2543 6.88456 20.1284 6.37074C19.0091 5.85691 17.6988 5.6 16.1975 5.6C14.7226 5.6 13.4058 5.85691 12.2469 6.37074C11.0881 6.88456 10.1761 7.5993 9.51111 8.51497C8.85267 9.43062 8.52675 10.5011 8.53333 11.7264C8.52675 13.2217 9.01728 14.4108 10.0049 15.2935C10.9926 16.1762 12.3391 16.8251 14.0444 17.2401L16.2469 17.7934C16.9844 17.9713 17.6066 18.1689 18.1136 18.3863C18.6272 18.6037 19.0156 18.8672 19.279 19.1768C19.549 19.4864 19.684 19.8685 19.684 20.323C19.684 20.8105 19.5358 21.242 19.2395 21.6175C18.9432 21.993 18.5251 22.2861 17.9852 22.4969C17.4519 22.7077 16.823 22.8131 16.0988 22.8131C15.3613 22.8131 14.6996 22.7011 14.1136 22.4771C13.5342 22.2466 13.07 21.9073 12.721 21.4594C12.3786 21.0048 12.1844 20.4383 12.1383 19.7598H8C8.03292 21.2156 8.38518 22.4376 9.05679 23.4257C9.73498 24.4073 10.6765 25.1484 11.8815 25.649C13.093 26.1497 14.5152 26.4 16.1481 26.4C17.7942 26.4 19.2 26.153 20.3654 25.6589C21.5374 25.1583 22.4329 24.4567 23.0519 23.5542C23.6774 22.6451 23.9934 21.5714 24 20.3329C23.9934 19.4897 23.8387 18.742 23.5358 18.0899C23.2395 17.4377 22.8214 16.8712 22.2815 16.3903C21.7416 15.9094 21.1029 15.5043 20.3654 15.1749C19.628 14.8455 18.8181 14.582 17.9358 14.3844L16.1185 13.9496C15.6774 13.8508 15.2626 13.7323 14.8741 13.5939C14.4856 13.449 14.1432 13.281 13.8469 13.09C13.5506 12.8924 13.3169 12.6585 13.1457 12.3884C12.9811 12.1183 12.9053 11.8021 12.9185 11.4398C12.9185 11.005 13.0436 10.6164 13.2938 10.2738C13.5506 9.93127 13.9193 9.66448 14.4 9.47344C14.8807 9.27582 15.47 9.17701 16.1679 9.17701C17.1951 9.17701 18.0082 9.39769 18.6074 9.83905Z" fill="#C5C7D4"/>
                        <path d="M44.5641 22.1552C43.4412 22.1552 42.491 22.0062 41.7136 21.7082C40.9485 21.3979 40.3254 20.9944 39.8441 20.4978C39.3752 20.0012 39.0235 19.4611 38.7891 18.8776C38.567 18.2817 38.4374 17.6982 38.4004 17.1271H41.2879C41.3126 17.574 41.4483 18.0023 41.6951 18.412C41.9419 18.8217 42.3121 19.1569 42.8057 19.4177C43.2993 19.6784 43.9162 19.8087 44.6566 19.8087C45.4587 19.8087 46.051 19.6473 46.4335 19.3245C46.8284 18.9893 47.0258 18.5548 47.0258 18.021C47.0258 17.5119 46.8531 17.096 46.5076 16.7732C46.1744 16.4504 45.7302 16.1959 45.1749 16.0097L43.0833 15.302C42.417 15.0786 41.7753 14.8054 41.1583 14.4826C40.5537 14.1474 40.0539 13.7129 39.659 13.1791C39.2642 12.6328 39.0667 11.9375 39.0667 11.0933C39.0667 10.2243 39.2827 9.49176 39.7146 8.89583C40.1588 8.2999 40.7634 7.84675 41.5285 7.53637C42.3059 7.226 43.1944 7.07081 44.1939 7.07081C45.4772 7.07081 46.4891 7.28807 47.2294 7.7226C47.9698 8.15713 48.5066 8.7096 48.8398 9.38002C49.1853 10.038 49.3951 10.7271 49.4691 11.4471H46.5816C46.5569 11.0995 46.4582 10.7705 46.2855 10.4601C46.125 10.1373 45.8659 9.87663 45.5081 9.67798C45.1502 9.47934 44.669 9.38002 44.0643 9.38002C43.3856 9.38002 42.8797 9.5228 42.5465 9.80834C42.2257 10.0939 42.0653 10.4539 42.0653 10.8885C42.0653 11.3602 42.2319 11.7389 42.565 12.0244C42.9106 12.31 43.3671 12.5521 43.9347 12.7507L46.0263 13.4584C46.705 13.6819 47.3467 13.9612 47.9513 14.2964C48.556 14.6316 49.0496 15.0786 49.4321 15.6372C49.827 16.1835 50.0244 16.9036 50.0244 17.7975C50.0244 19.1507 49.5431 20.2184 48.5806 21.0006C47.6305 21.7703 46.2916 22.1552 44.5641 22.1552Z" fill="#C5C7D4"/>
                        <path d="M53.7931 21.8758C53.5093 21.5406 53.281 21.1371 53.1083 20.6654C52.9478 20.1936 52.8676 19.4859 52.8676 18.5424V12.8252H51.3498V10.7022H52.9046V7.90883H55.8477V10.7022H57.6431V12.8252H55.8477V18.2258C55.8477 19.2066 55.9587 19.9577 56.1808 20.4791C56.403 21.0006 56.6683 21.4289 56.9767 21.7641V21.8758H53.7931Z" fill="#C5C7D4"/>
                        <path d="M63.1517 22.1552C61.9177 22.1552 60.9861 21.7641 60.3568 20.982C59.7274 20.1998 59.4128 19.1383 59.4128 17.7975V10.7022H62.4113V17.2947C62.4113 18.052 62.5471 18.6417 62.8185 19.0638C63.09 19.4859 63.5281 19.697 64.1327 19.697C64.8608 19.697 65.4222 19.4114 65.8171 18.8404C66.212 18.2693 66.4094 17.5678 66.4094 16.736V10.7022H69.4079V21.8758H66.7055V20.1998H66.2613C66.0762 20.7585 65.7369 21.2241 65.2433 21.5965C64.7497 21.969 64.0525 22.1552 63.1517 22.1552Z" fill="#C5C7D4"/>
                        <path d="M75.8435 22.0993C74.8316 22.0993 73.9987 21.851 73.3447 21.3544C72.6907 20.8454 72.2033 20.1501 71.8824 19.2687C71.5616 18.3872 71.4012 17.3878 71.4012 16.2704C71.4012 15.1158 71.5616 14.104 71.8824 13.2349C72.2156 12.3659 72.7092 11.6892 73.3632 11.205C74.0295 10.7209 74.8563 10.4788 75.8435 10.4788C76.5715 10.4788 77.1638 10.6091 77.6204 10.8698C78.0893 11.1306 78.4595 11.4844 78.731 11.9313H79.1752V6.97769H82.1737V21.8758H79.3973V20.4233H78.9531C78.6939 20.8951 78.3176 21.2923 77.824 21.6151C77.3304 21.9379 76.6702 22.0993 75.8435 22.0993ZM76.6949 19.9763C77.4476 19.9763 78.0461 19.6473 78.4903 18.9893C78.9469 18.3189 79.1752 17.4188 79.1752 16.289C79.1752 15.1468 78.9469 14.2468 78.4903 13.5888C78.0461 12.9307 77.4476 12.6017 76.6949 12.6017C76.0162 12.6017 75.4795 12.9121 75.0846 13.5329C74.702 14.1412 74.5108 15.0599 74.5108 16.289C74.5108 17.5181 74.702 18.4431 75.0846 19.0638C75.4795 19.6722 76.0162 19.9763 76.6949 19.9763Z" fill="#C5C7D4"/>
                        <path d="M85.6023 25.6004V25.5631C85.9108 25.0541 86.244 24.4644 86.6019 23.794C86.9597 23.1236 87.2744 22.4842 87.5458 21.8758L83.7329 10.814V10.7022H86.6944L87.842 14.0543C88.0271 14.5882 88.2122 15.1593 88.3973 15.7676C88.5824 16.3759 88.7675 17.1457 88.9526 18.0768H89.3968C89.5819 17.1457 89.767 16.3759 89.9521 15.7676C90.1372 15.1593 90.3223 14.5882 90.5074 14.0543L91.655 10.7022H94.4684V10.814L91.0627 20.3488C90.6184 21.6027 90.1865 22.6704 89.767 23.5519C89.3598 24.4458 89.0143 25.1286 88.7305 25.6004H85.6023Z" fill="#C5C7D4"/>
                        <path d="M96.0602 21.8758V7.35015H101.428L105.907 19.4177H106.352V7.35015H109.165V21.8758H103.76L99.2994 9.80834H98.8737V21.8758H96.0602Z" fill="#C5C7D4"/>
                        <path d="M116.683 22.1552C114.844 22.1552 113.468 21.6275 112.555 20.5723C111.654 19.5046 111.204 18.0768 111.204 16.289C111.204 14.5013 111.654 13.0797 112.555 12.0244C113.468 10.9567 114.844 10.4229 116.683 10.4229C118.521 10.4229 119.891 10.9567 120.792 12.0244C121.705 13.0797 122.162 14.5013 122.162 16.289C122.162 18.0768 121.705 19.5046 120.792 20.5723C119.891 21.6275 118.521 22.1552 116.683 22.1552ZM116.683 20.1439C117.497 20.1439 118.096 19.8211 118.478 19.1756C118.861 18.53 119.052 17.5616 119.052 16.2704C119.052 14.9917 118.861 14.0357 118.478 13.4025C118.096 12.7569 117.497 12.4341 116.683 12.4341C115.868 12.4341 115.27 12.7569 114.887 13.4025C114.505 14.0357 114.314 14.9917 114.314 16.2704C114.314 17.5616 114.505 18.53 114.887 19.1756C115.27 19.8211 115.868 20.1439 116.683 20.1439Z" fill="#C5C7D4"/>
                        <path d="M125.785 21.8758C125.501 21.5406 125.273 21.1371 125.1 20.6654C124.94 20.1936 124.86 19.4859 124.86 18.5424V12.8252H123.342V10.7022H124.897V7.90883H127.84V10.7022H129.635V12.8252H127.84V18.2258C127.84 19.2066 127.951 19.9577 128.173 20.4791C128.395 21.0006 128.66 21.4289 128.969 21.7641V21.8758H125.785Z" fill="#C5C7D4"/>
                        <path d="M131.553 21.8758V10.7022H134.551V21.8758H131.553ZM133.052 9.41727C132.522 9.41727 132.121 9.2807 131.849 9.00757C131.578 8.72202 131.442 8.35577 131.442 7.90883C131.442 7.46188 131.578 7.10184 131.849 6.82871C132.121 6.54316 132.522 6.40039 133.052 6.40039C133.583 6.40039 133.984 6.54316 134.255 6.82871C134.527 7.10184 134.662 7.46188 134.662 7.90883C134.662 8.35577 134.527 8.72202 134.255 9.00757C133.984 9.2807 133.583 9.41727 133.052 9.41727Z" fill="#C5C7D4"/>
                        <path d="M142.039 22.1552C140.201 22.1552 138.825 21.6275 137.912 20.5723C137.011 19.5046 136.561 18.0768 136.561 16.289C136.561 14.5013 137.011 13.0797 137.912 12.0244C138.825 10.9567 140.201 10.4229 142.039 10.4229C143.878 10.4229 145.248 10.9567 146.149 12.0244C147.062 13.0797 147.518 14.5013 147.518 16.289C147.518 18.0768 147.062 19.5046 146.149 20.5723C145.248 21.6275 143.878 22.1552 142.039 22.1552ZM142.039 20.1439C142.854 20.1439 143.452 19.8211 143.835 19.1756C144.217 18.53 144.409 17.5616 144.409 16.2704C144.409 14.9917 144.217 14.0357 143.835 13.4025C143.452 12.7569 142.854 12.4341 142.039 12.4341C141.225 12.4341 140.627 12.7569 140.244 13.4025C139.861 14.0357 139.67 14.9917 139.67 16.2704C139.67 17.5616 139.861 18.53 140.244 19.1756C140.627 19.8211 141.225 20.1439 142.039 20.1439Z" fill="#C5C7D4"/>
                        <path d="M149.513 21.8758V10.7022H152.289V12.3783H152.734C152.956 11.8196 153.295 11.354 153.752 10.9816C154.221 10.6091 154.905 10.4229 155.806 10.4229C157.04 10.4229 157.966 10.814 158.583 11.5961C159.2 12.3783 159.508 13.4398 159.508 14.7806V21.8758H156.51V15.2834C156.51 14.5137 156.374 13.924 156.102 13.5143C155.831 13.0921 155.387 12.8811 154.77 12.8811C154.054 12.8811 153.499 13.1666 153.104 13.7377C152.709 14.2964 152.511 14.9979 152.511 15.8421V21.8758H149.513Z" fill="#C5C7D4"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_62501_1126">
                        <rect width="160" height="32" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <span className='font-[500] text-richblack-50'>Company</span>
                    {Company.map((item,i)=>{
                        return <Link key={i} to={item} className='text-sm text-richblack-400 hover:text-richblack-50 transition-all duration-200'>{item}</Link>
                    })}
                    <div className='flex space-x-2 text-richblack-500'>
                    <a className="hover:text-richblack-50 transition-all duration-200" href='https://www.facebook.com'><BsFacebook/></a>
                    <a className="hover:text-richblack-50 transition-all duration-200" href='https://www.google.com'><BsGoogle/></a>
                    <a className="hover:text-richblack-50 transition-all duration-200" href='https://www.twitter.com'><BsTwitter/></a>
                    <a className="hover:text-richblack-50 transition-all duration-200" href='https://www.youtube.com'><BsYoutube/></a>
                    </div>
                </div>
                <div className='space-y-3 flex flex-col'>
                    <span className='font-[500] text-richblack-50'>Resources</span>
                    {Resources.map((item,i)=>{
                        return <Link key={i} to={item} className='text-sm text-richblack-400 hover:text-richblack-50 transition-all duration-200'>{item}</Link>
                    })}
                    <span className='font-[500] text-richblack-50'>Support</span>
                    {Support.map((item,i)=>{
                        return <Link key={i} to={item} className='text-sm text-richblack-400 hover:text-richblack-50 transition-all duration-200'>{item}</Link>
                    })}
                </div>
                <div className='space-y-3 flex flex-col'>
                    <span className='font-[500] text-richblack-50'>Plans</span>
                    {Plans.map((item,i)=>{
                        return <Link key={i} to={item} className='text-sm text-richblack-400 hover:text-richblack-50 transition-all duration-200'>{item}</Link>
                    })}
                    <span className='font-[500] text-richblack-50'>Community</span>
                    {Community.map((item,i)=>{
                        return <Link key={i} to={item} className='text-sm text-richblack-400 hover:text-richblack-50 transition-all duration-200'>{item}</Link>
                    })}
                </div>
            </div>
            <div className='w-[50%] max-tablet:w-[100%]'>
                <div className='flex justify-evenly max-tablet:justify-normal flex-wrap max-tablet:pl-2'>
                    {FooterLink2.map((item,i)=>{
                        return (
                        <div key={i} className='flex flex-col space-y-3 mt-3'>
                            <span className='font-[500] text-richblack-50'>{item.title}</span>
                            {item.links.map((subItem,j)=>{
                            return (<Link to = {subItem.link} key={j} className='text-sm text-richblack-400 hover:text-richblack-50 transition-all duration-200'>{subItem.title}</Link>)
                        })}
                        </div>)

                    })}
                </div>
            </div>
        </div>
        <div className='border-t-[1px] mt-4 mx-auto py-10 flex justify-between text-richblack-500 border-richblack-700 w-[80%] max-tablet:flex-col max-tablet:items-center max-tablet:space-y-4'>
            <div className='flex w-[40%] max-tablet:justify-center items-center '>
            <Link to = "Privacy Policy" className='border-r-[1px] border-richblack-700  px-4'>Privacy Policy</Link>
            <Link to = "Cookie Policy" className='border-r-[1px] border-richblack-700  px-4'>Cookie Policy</Link>
            <Link to = "Terms" className='px-4'>Terms</Link>
            </div>
            <span className='text-lg'>Made with <BsBalloonHeartFill className='text-[#FFADAD] inline text-3xl'/> by <a className="underline decoration-caribbeangreen-25" rel="noreferrer" target="_blank" href='https://www.linkedin.com/in/aryan-kamboj-32873a215/'><CyanColoredText>Aryan Kamboj </CyanColoredText></a></span>
        </div>
    </div>
  )
}
