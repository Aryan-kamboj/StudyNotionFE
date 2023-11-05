import React from 'react'
import { LightDarkCards } from './LightDarkCards';
import { LightDarkCardsData } from '../../data/AboutUsData';
import { StdButton } from '../stdComponets/StdButton';
import { CyanColoredText } from '../stdComponets/CyanColoredText';

// infoAndButton:{
//     headingWhite:"World-Class Learning for ",
//     headingCyan:"Anyone, Anywhere",
//     desc:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
//     button:{
//         text:"Learn More",
//         link:"/"
//     }
// },
// cards:[
//     {
//         title:"Curriculum Based on Industry Needs",
//         desc:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
//     },

export const LightDarkBlocks = () => {
    let light = true;
  return (
    <div className='flex flex-wrap justify-end max-desktop:justify-center'>
        {/* heading and button div */}
        <div className='w-[50%] space-y-3 pr-14 max-desktop:w-[100%] max-desktop:pr-0 max-desktop:pb-8'>
            <h1 className='text-white text-4xl font-[500]'>{LightDarkCardsData.infoAndButton.headingWhite}<CyanColoredText>{LightDarkCardsData.infoAndButton.headingCyan}</CyanColoredText></h1>
            <p className='text-richblack-300 pb-4'>{LightDarkCardsData.infoAndButton.desc}</p>
            <StdButton color="yellow" linkTo={LightDarkCardsData.infoAndButton.button.link}>{LightDarkCardsData.infoAndButton.button.text}</StdButton>
        </div>
        {/* cards to be mapped */}
        {
            LightDarkCardsData.cards.map((card,i)=>{
                light=!light
                return (<LightDarkCards key={i} title={card.title} desc={card.desc} light={!light}/>)
            })
        }
    </div>
  )
}
