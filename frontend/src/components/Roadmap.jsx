import React from 'react';
import orange from '../assets/orange.png';
import purple from '../assets/purple.png';
import blue from '../assets/blue.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Roadmap() {
  const status = useSelector(state => state.social.posts);

  const plannedCount = status.reduce((acc, currentValue) => {
    if (
      currentValue.status === 'Planned' ||
      currentValue.status === 'planned'
    ) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const inProgressCount = status.reduce((acc, currentValue) => {
    if (
      currentValue.status === 'In-progress' ||
      currentValue.status === 'in-progress'
    ) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const liveCount = status.reduce((acc, currentValue) => {
    if (currentValue.status === 'Live' || currentValue.status === 'live') {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div className='rounded-xl bg-white p-6 xs:mx-3 s:mx-6 md:m-0 md:w-1/3 md:p-6 lg:mx-2 lg:w-1/3 xl:m-0 xl:h-48 xl:w-full xl:min-w-64'>
      <div className='mb-[1.688rem] flex items-center justify-between md:mb-6'>
        <h1 className='text-lg font-bold tracking-[-0.25px] text-blue'>
          Roadmap
        </h1>
        <Link
          to='/roadmap'
          className='px13 font-semibold text-strong-blue underline hover:text-hover-blue'
        >
          View
        </Link>
      </div>
      <div>
        <div className='flex justify-between'>
          <div className='mb-2 flex items-center gap-2'>
            <img src={orange} alt='Orange Oval' />
            <p className='text-base font-normal text-grey'>Planned</p>
          </div>
          <p className='text-base font-bold text-grey'>{plannedCount}</p>
        </div>
        <div className='flex justify-between'>
          <div className='mb-2 flex items-center gap-2'>
            <img src={purple} alt='Purple Oval' />
            <p className='text-base font-normal text-grey'>In-Progress</p>
          </div>
          <p className='text-base font-bold text-grey'>{inProgressCount}</p>
        </div>
        <div className='flex justify-between'>
          <div className='mb-2 flex items-center gap-2'>
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
