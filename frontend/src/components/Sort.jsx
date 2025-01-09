import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sort } from '../features/state/stateSlice';
import { Link } from 'react-router-dom';
import SortSelect from './SortSelect';
import lightbulb from '../assets/lightbulb.png';
import { getAllPosts } from '../features/social/socialSlice';

function Sort() {
  const [sortBy, setSortBy] = useState('Most Upvotes');
  const dispatch = useDispatch();
  const products = useSelector(state => state.social.posts);

  /* const productRequests = useSelector(state => state.state.data.productRequests);

    const suggestionCount = productRequests.reduce((acc, currentValue) => {
        if (currentValue.status === "suggestion") {
            return acc + 1;
        }
        return acc;
    }, 0);
*/
  useEffect(() => {
    dispatch(sort(sortBy));
    dispatch(getAllPosts());
  }, [sortBy, dispatch]);

  const options = [
    { value: 'Most Upvotes', label: 'Most Upvotes' },
    { value: 'Least Upvotes', label: 'Least Upvotes' },
    { value: 'Most Comments', label: 'Most Comments' },
    { value: 'Least Comments', label: 'Least Comments' },
  ];

  return (
    <div className='flex h-14 items-center justify-between bg-dark-blue py-2 text-sm text-white xs:px-4 s:px-6 md:mx-10 md:h-[4.5rem] md:rounded-xl xl:ml-9 xl:mr-0 xl:mt-24 xl:h-16'>
      <div className='flex items-center'>
        <div className='absolute hidden md:relative md:flex md:items-center md:gap-2 xl:mr-10'>
          <img src={lightbulb} alt='lightbulb' />
          <p className='text-lg font-bold tracking-[-0.25px] text-white md:mr-10 xl:whitespace-nowrap'>
            {products ? products.length : null} Suggestions
          </p>
        </div>
        <div className='flex'>
          <label className='s:px-13 mr-2 whitespace-nowrap font-normal text-white2 xs:text-[0.625rem] md:text-sm'>
            Sort by :{' '}
          </label>
          <SortSelect value={sortBy} onChange={setSortBy} options={options} />
        </div>
      </div>
      <Link
        to='/addfeedback'
        className='s:px13 flex h-10 items-center justify-center whitespace-nowrap rounded-xl bg-purple font-bold hover:bg-hover-purple xs:w-[6.449rem] xs:text-[0.625rem] s:w-[8.375rem] md:h-[2.75rem] md:w-[9.875rem] md:text-sm'
      >
        + Add Feedback
      </Link>
    </div>
  );
}

export default Sort;
