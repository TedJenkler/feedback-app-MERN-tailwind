import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filter } from '../features/state/stateSlice';

function Filter() {
    const [filterBy, setFilterBy] = useState("ALL");
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.social.categories);

    useEffect(() => {
        dispatch(filter(filterBy));
    }, [filterBy, dispatch]);

    return (
        <div className='bg-white mt-6 mx-6 p-6 flex flex-wrap gap-2 rounded-xl mb-6 pb-9 md:w-1/3 md:h-full md:m-0 lg:h-full lg:mt-0 lg:mx-2 lg:w-1/3 xl:min-w-64 xl:w-full xl:h-40 xl:m-0 xl:mb-0 xl:pb-9'>
            <button
                className={filterBy === "ALL" ? 'py-1 px-4 bg-strong-blue text-white rounded-xl px13 font-semibold' : 'py-1 px-4 bg-grey-white rounded-xl px13 font-semibold text-strong-blue hover:bg-hover-blue'} 
                onClick={() => setFilterBy("ALL")}
            >
                All
            </button>
            {categories && categories.map(category => (
                <button
                    key={category._id}
                    className={filterBy === category.namme ? 'py-1 px-4 bg-strong-blue text-white rounded-xl px13 font-semibold' : 'py-1 px-4 bg-grey-white rounded-xl px13 font-semibold text-strong-blue hover:bg-hover-blue'} 
                    onClick={() => setFilterBy(category.name)}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}

export default Filter;