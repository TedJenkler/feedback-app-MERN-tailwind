import React from 'react';
import empty from "../assets/empty.svg";
import { Link } from 'react-router-dom';

function NoFeedback() {
    return (
        <div className='xs:mx-3 s:mx-6 flex flex-col bg-white px-6 py-[4.75rem] rounded-xl items-center md:mx-10 md:py-28 xl:mr-0 overflow-hidden'>
            <img className='mb-10 md:w-[8.094rem] md:mb-[3.344rem]' src={empty} alt='empty' />
            <h1 className='mb-[0.875rem] text-blue font-bold tracking-[-0.25px] text-lg md:text-2xl md:tracking-[-0.33px]'>There is no feedback yet.</h1>
            <p className='mb-6 text-grey leading-[auto] px13 font-normal text-center md:mb-12 md:mx-32 md:text-base xl:mx-40 xl:text-base'>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
            <Link to="/addfeedback" className='flex items-center justify-center bg-purple px13 rounded-[0.625rem] w-[8.375rem] h-10 font-bold whitespace-nowrap text-white hover:bg-hover-purple md:text-sm md:w-[9.875rem] md:h-[2.75rem]'>+ Add Feedback</Link>
        </div>
    );
}

export default NoFeedback;