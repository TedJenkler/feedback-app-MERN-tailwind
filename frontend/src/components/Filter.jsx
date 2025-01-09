import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filter } from '../features/state/stateSlice';

function Filter() {
  const [filterBy, setFilterBy] = useState('ALL');
  const dispatch = useDispatch();
  const categories = useSelector(state => state.social.categories);

  useEffect(() => {
    dispatch(filter(filterBy));
  }, [filterBy, dispatch]);

  return (
    <div className='mb-6 mt-6 flex flex-wrap gap-2 rounded-xl bg-white pb-9 pl-6 pr-4 pt-6 xs:mx-3 s:mx-6 md:m-0 md:h-full md:w-1/3 lg:mx-2 lg:mt-0 lg:h-full lg:w-1/3 xl:m-0 xl:mb-0 xl:h-40 xl:w-full xl:min-w-64 xl:pb-9'>
      <button
        className={
          filterBy === 'ALL'
            ? 'px13 rounded-xl bg-strong-blue px-4 py-1 font-semibold text-white'
            : 'px13 rounded-xl bg-grey-white px-4 py-1 font-semibold text-strong-blue hover:bg-hover-blue'
        }
        onClick={() => setFilterBy('ALL')}
      >
        All
      </button>
      {categories &&
        categories.map(category => (
          <button
            key={category._id}
            className={
              filterBy === category.name
                ? 'px13 rounded-xl bg-strong-blue px-4 py-1 font-semibold text-white'
                : 'px13 rounded-xl bg-grey-white px-4 py-1 font-semibold text-strong-blue hover:bg-hover-blue'
            }
            onClick={() => setFilterBy(category.name)}
          >
            {category.name}
          </button>
        ))}
    </div>
  );
}

export default Filter;
