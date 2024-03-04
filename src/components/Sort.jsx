import React, { useEffect, useState } from 'react'; // Importing React and necessary hooks
import { useDispatch, useSelector } from 'react-redux'; // Importing useDispatch and useSelector hooks from react-redux
import { sort } from '../features/state/stateSlice'; // Importing sort action from stateSlice
import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom
import lightbulb from "../assets/lightbulb.png"; // Importing image asset

function Sort() {
    const [sortBy, setSortBy] = useState("Most Upvotes"); // State for sorting option
    const state = useSelector((state) => state.state.data.productRequests); // Getting product requests data from Redux store
    const dispatch = useDispatch(); // Getting dispatch function from Redux

    // Counting the number of suggestions
    const suggestionCount = state.reduce((acc, currentValue) => {
        if (currentValue.status === "suggestion") {
            return acc + 1;
        }
        return acc;
    }, 0);

    // Triggering sorting action when sortBy state changes
    useEffect(() => {
        dispatch(sort(sortBy));
    }, [sortBy]);

    return (
        // Sort component UI
        <div className='flex justify-between h-14 items-center text-white px-6 bg-dark-blue text-sm md:mx-10 md:rounded-xl md:h-20 xl:w-3/4 xl:mt-24 xl:mr-0 xl:ml-9 xl:h-16'>
            <div className='flex items-center'>
                <div className='hidden absolute md:flex md:relative md:gap-2 md:items-center xl:mr-10'>
                    <img src={lightbulb} alt='lightbulb' /> {/* Displaying lightbulb image */}
                    <p className='text-lg font-bold text-white xl:whitespace-nowrap md:mr-10'>{suggestionCount} Suggestions</p> {/* Displaying suggestion count */}
                </div>
                <div className='hover:opacity-75'>
                    <label className='font-normal whitespace-nowrap'>Sort by : </label>
                    {/* Dropdown to select sorting option */}
                    <select className='bg-dark-blue font-bold w-32 mr-4' onChange={(e) => {setSortBy(e.target.value)}}>
                        <option className='hover:text-purple' value="Most Upvotes"> Most Upvotes</option>
                        <option className='hover:text-purple' value="Least Upvotes"> Least Upvotes</option>
                        <option className='hover:text-purple' value="Most Comments"> Most Comments</option>
                        <option className='hover:text-purple' value="Least Comments"> Least Comments</option>
                    </select>
                </div>
            </div>
            {/* Link to add feedback */}
            <Link to="/addfeedback" className='bg-purple rounded-xl px-4 py-2 font-bold whitespace-nowrap hover:bg-hover-purple'>+ Add Feedback</Link>
        </div>
    );
}

export default Sort;
