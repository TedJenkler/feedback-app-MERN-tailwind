import React from 'react';
import orange from "../assets/orange.png";
import purple from "../assets/purple.png";
import blue from "../assets/blue.png";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Roadmap() {
    const status = useSelector((state) => state.social.posts)
    console.log(status)

    const plannedCount = status.reduce((acc, currentValue) => {
        if (currentValue.status === "Planned" || currentValue.status === "planned") {
            return acc + 1;
        }
        return acc;
    }, 0);

    const inProgressCount = status.reduce((acc, currentValue) => {
        if (currentValue.status === "In-progress" || currentValue.status === "in-progress") {
            return acc + 1;
        }
        return acc;
    }, 0);

    const liveCount = status.reduce((acc, currentValue) => {
        if (currentValue.status === "Live" || currentValue.status === "live") {
            return acc + 1;
        }
        return acc;
    }, 0);

    return (
        <div className='xs:mx-3 s:mx-6 bg-white p-6 rounded-xl md:w-1/3 md:m-0 md:p-6 lg:w-1/3 lg:mx-2 xl:w-full xl:h-48 xl:min-w-64 xl:m-0'>
            <div className='flex items-center justify-between mb-[1.688rem] md:mb-6'>
                <h1 className='text-lg tracking-[-0.25px] font-bold text-blue'>Roadmap</h1>
                <Link to="/roadmap" className='px13 text-strong-blue font-semibold underline hover:text-hover-blue'>View</Link>
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
    );
}

export default Roadmap;
