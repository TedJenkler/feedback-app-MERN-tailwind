import React from 'react'
import orange from "../assets/orange.png"
import purple from "../assets/purple.png"
import blue from "../assets/blue.png"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Roadmap() {
    const state = useSelector((state) => state.state.data.productRequests)
    const plannedCount = state.reduce((acc, currentValue) => {
        if (currentValue.status === "planned") {
            return acc + 1;
        }
        return acc;
    }, 0);

    const inProgressCount = state.reduce((acc, currentValue) => {
        if (currentValue.status === "in-progress") {
            return acc + 1;
        }
        return acc;
    }, 0);

    const liveCount = state.reduce((acc, currentValue) => {
        if (currentValue.status === "live") {
            return acc + 1;
        }
        return acc;
    }, 0);

  return (
    <div className='bg-white mx-6 p-6 rounded-xl xl:w-full xl:h-48 xl:m-0'>
        <div className='flex items-center justify-between mb-6'>
            <h1 className='text-lg font-bold text-blue'>Roadmap</h1>
            <Link to="/roadmap" className='text-sm text-strong-blue font-semibold underline'>View</Link>
        </div>
        <div>
            <div className='flex justify-between'>
                <div className='flex items-center gap-2 mb-2'>
                    <img src={orange} alt="Orange Oval" />
                    <p className='text-base font-normal text-grey'>Planned</p>
                </div>
                <p className='text-base font-bold text-grey'>{plannedCount}</p>
            </div>
            <div className='flex justify-between'>
                <div className='flex items-center gap-2 mb-2'>
                    <img src={purple} alt='Purple Oval' />
                    <p className='text-base font-normal text-grey'>In-Progress</p>
                </div>
                <p className='text-base font-bold text-grey'>{inProgressCount}</p>
            </div>
            <div className='flex justify-between'>
                <div className='flex items-center gap-2 mb-2'>
                    <img src={blue} alt='Blue Oval' />
                    <p className='text-base font-normal text-grey'>Live</p>
                </div>
                <p className='text-base font-bold text-grey'>{liveCount}</p>
            </div>
        </div>
    </div>
  )
}

export default Roadmap
