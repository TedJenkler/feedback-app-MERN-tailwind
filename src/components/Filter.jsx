import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filter } from '../features/state/stateSlice';

function Filter() {
    // State variable to track the selected filter option
    const [filterBy, setFilterBy] = useState("ALL");

    // Redux dispatch function
    const dispatch = useDispatch();

    // Effect to dispatch filter action when filterBy state changes
    useEffect(() => {
        dispatch(filter(filterBy));
    }, [filterBy, dispatch]);

    return (
        <div className='bg-white mt-6 mx-6 p-6 flex flex-wrap gap-2 rounded-xl mb-6 pb-9 md:w-1/3 md:h-full md:m-0 lg:h-full lg:mt-0 lg:mx-2 lg:w-1/3 xl:w-full xl:h-40 xl:m-0 xl:mb-0 xl:pb-9'>
            {/* Filter buttons */}
            <button
                className={filterBy === "ALL" ? 'py-1 px-4 bg-strong-blue text-white rounded-xl text-sm font-semibold' : 'py-1 px-4 bg-grey-white rounded-xl text-sm font-semibold text-strong-blue hover:bg-hover-blue'} 
                onClick={(e) => {setFilterBy("ALL")}}
                value={filterBy}
            >
                All
            </button>
            <button
                className={filterBy === "UI" ? 'py-1 px-4 bg-strong-blue text-white rounded-xl text-sm font-semibold' : 'py-1 px-4 bg-grey-white rounded-xl text-sm font-semibold text-strong-blue hover:bg-hover-blue'} 
                onClick={(e) => {setFilterBy("UI")}}
                value={filterBy}
            >
                UI
            </button>
            <button
                className={filterBy === "UX" ? 'py-1 px-4 bg-strong-blue text-white rounded-xl text-sm font-semibold' : 'py-1 px-4 bg-grey-white rounded-xl text-sm font-semibold text-strong-blue hover:bg-hover-blue'} 
                onClick={(e) => {setFilterBy("UX")}}
                value={filterBy}
            >
                UX
            </button>
            <button
                className={filterBy === "Enhancement" ? 'py-1 px-4 bg-strong-blue text-white rounded-xl text-sm font-semibold' : 'py-1 px-4 bg-grey-white rounded-xl text-sm font-semibold text-strong-blue hover:bg-hover-blue'} 
                onClick={(e) => {setFilterBy("Enhancement")}}
                value={filterBy}
            >
                Enhancement
            </button>
            <button
                className={filterBy === "Bug" ? 'py-1 px-4 bg-strong-blue text-white rounded-xl text-sm font-semibold' : 'py-1 px-4 bg-grey-white rounded-xl text-sm font-semibold text-strong-blue hover:bg-hover-blue'} 
                onClick={(e) => {setFilterBy("Bug")}}
                value={filterBy}
            >
                Bug
            </button>
            <button
                className={filterBy === "Feature" ? 'py-1 px-4 bg-strong-blue text-white rounded-xl text-sm font-semibold' : 'py-1 px-4 bg-grey-white rounded-xl text-sm font-semibold text-strong-blue hover:bg-hover-blue'} 
                onClick={(e) => {setFilterBy("Feature")}}
                value={filterBy}
            >
                Feature
            </button>
        </div>
    );
}

export default Filter;
