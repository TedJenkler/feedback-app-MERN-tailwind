import React from 'react';
import empty from '../assets/empty.svg';
import { Link } from 'react-router-dom';

function NoFeedback() {
  return (
    <div className='flex flex-col items-center overflow-hidden rounded-xl bg-white px-6 py-[4.75rem] xs:mx-3 s:mx-6 md:mx-10 md:py-28 xl:mr-0'>
      <img
        className='mb-10 md:mb-[3.344rem] md:w-[8.094rem]'
        src={empty}
        alt='empty'
      />
      <h1 className='mb-[0.875rem] text-lg font-bold tracking-[-0.25px] text-blue md:text-2xl md:tracking-[-0.33px]'>
        There is no feedback yet.
      </h1>
      <p className='px13 mb-6 text-center font-normal leading-[auto] text-grey md:mx-32 md:mb-12 md:text-base xl:mx-40 xl:text-base'>
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <Link
        to='/addfeedback'
        className='px13 flex h-10 w-[8.375rem] items-center justify-center whitespace-nowrap rounded-[0.625rem] bg-purple font-bold text-white hover:bg-hover-purple md:h-[2.75rem] md:w-[9.875rem] md:text-sm'
      >
        + Add Feedback
      </Link>
    </div>
  );
}

export default NoFeedback;
