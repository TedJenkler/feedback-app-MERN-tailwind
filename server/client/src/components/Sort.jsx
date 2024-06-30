import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sort } from '../features/state/stateSlice';
import { Link } from 'react-router-dom';
import SortSelect from './SortSelect';
import lightbulb from "../assets/lightbulb.png";

function Sort() {
    const [sortBy, setSortBy] = useState("Most Upvotes");
    const dispatch = useDispatch();

    const productRequests = useSelector(state => state.state.data.productRequests);

    const suggestionCount = productRequests.reduce((acc, currentValue) => {
        if (currentValue.status === "suggestion") {
            return acc + 1;
        }
        return acc;
    }, 0);

    useEffect(() => {
        dispatch(sort(sortBy));
    }, [sortBy, dispatch]);

    const options = [
        { value: "Most Upvotes", label: "Most Upvotes" },
        { value: "Least Upvotes", label: "Least Upvotes" },
        { value: "Most Comments", label: "Most Comments" },
        { value: "Least Comments", label: "Least Comments" },
    ];

    return (
        <div className='flex justify-between h-14 items-center text-white px-6 py-2 bg-dark-blue text-sm md:mx-10 md:rounded-xl md:h-20 xl:mt-24 xl:mr-0 xl:ml-9 xl:h-16'>
            <div className='flex items-center'>
                <div className='hidden absolute md:flex md:relative md:gap-2 md:items-center xl:mr-10'>
                    <img src={lightbulb} alt='lightbulb' />
                    <p className='text-lg tracking-[-0.25px] font-bold text-white xl:whitespace-nowrap md:mr-10'>{suggestionCount} Suggestions</p>
                </div>
                <div className='flex hover:opacity-75'>
                    <label className='px-13 text-white2 mr-2 font-normal whitespace-nowrap md:text-sm'>Sort by : </label>
                    <SortSelect
                        value={sortBy}
                        onChange={setSortBy}
                        options={options}
                    />
                </div>
            </div>
            <Link to="/addfeedback" className='flex items-center justify-center bg-purple px13 rounded-xl h-10 w-[8.375rem] font-bold whitespace-nowrap hover:bg-hover-purple md:text-sm'>+ Add Feedback</Link>
        </div>
    );
}

export default Sort;