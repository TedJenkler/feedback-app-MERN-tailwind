import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../features/state/stateSlice';
import { Link, useNavigate } from 'react-router-dom';
import addicon from "../assets/addicon.png";
import arrowleft from "../assets/arrowleft.png";

function AddNewFeedback() {
    // State variables
    const [title, setTitle] = useState("");
    const [select, setSelect] = useState("Feature");
    const [detail, setDetail] = useState("");
    const getId = useSelector((state) => state.state.data.productRequests);
    const [id, setId] = useState(getId.length + 1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorTitle, setErrorTitle] = useState(false)
    const [errorDetail, setErrorDetail] = useState(false)

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title !== "" && detail !== "") {
            setErrorTitle(false);
            setErrorDetail(false);
            dispatch(add({ id, title, category: select, description: detail }));
            navigate('/feedback-app-tailwind-vite/');
        } else {
            setErrorTitle(title === "");
            setErrorDetail(detail === "");
        }
    };

    return (
        // Main section
        <main className='absolute min-h-full w-full bg-grey-white2 top-0 left-0 right-0 px-6 pt-10 pb-20 md:px-28 md:pb-56 md:pt-14 xl:px-96 xl:pt-24 xl:pb-44'>
            {/* Icon for adding feedback */}
            <img className='absolute left-12 top-20 h-10 w-10 md:left-40 md:top-24 md:h-14 md:w-14 xl:left-96 xl:ml-10 xl:top-32' src={addicon} alt='addicon' />
            {/* Link to navigate back */}
            <Link to="/feedback-app-tailwind-vite/" className='flex items-center gap-1 mb-8 md:mb-10'>
                <img className='w-1 h-2' src={arrowleft} alt='arrowback' />
                <p className='text-grey text-sm font-bold'>Go Back</p>
            </Link>
            {/* Form for adding new feedback */}
            <form onSubmit={handleSubmit} className='flex flex-col text-black mt-5 py-11 px-6 bg-white rounded-xl md:py-14 md:px-12'>
                {/* Title */}
                <h1 className='text-lg text-blue font-bold mb-6 md:text-2xl'>Create New Feedback</h1>
                <div className='mb-6'>
                    <label htmlFor='title' className='text-sm text-blue font-bold mb-1'>Feedback Title</label>
                    <p className='text-sm text-grey font-normal mb-4'>Add a short, descriptive headline</p>
                    {/* Input for title */}
                    <input
                        id='title'
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={errorTitle ? 'w-full bg-grey-white2 h-12 p-4 mb-1 focus:outline-strong-blue border-2 border-red rounded-xl' : 'w-full bg-grey-white2 h-12 p-4 focus:outline-strong-blue mb-1 rounded-xl'}
                        placeholder='Add a title'
                    />
                    {/* Error message for title */}
                    {errorTitle && <p className='text-red'>Can’t be empty</p>}
                </div>
                {/* Category selection */}
                <div className='mb-6'>
                    <label htmlFor='category' className='text-sm text-blue font-bold mb-1'>Category</label>
                    <p className='text-sm text-grey font-normal mb-4'>Choose a category for your feedback</p>
                    {/* Dropdown for category selection */}
                    <select
                        id='category'
                        value={select}
                        onChange={(e) => setSelect(e.target.value)}
                        className='w-full bg-grey-white2 h-12 px-4 focus:outline-strong-blue rounded-xl'
                    >
                        <option value='Feature'>Feature</option>
                        <option value='UI'>UI</option>
                        <option value='UX'>UX</option>
                        <option value='Enchantment'>Enchantment</option>
                        <option value='Bug'>Bug</option>
                    </select>
                </div>
                {/* Feedback detail */}
                <div className='mb-6'>
                    <label htmlFor='detail' className='text-sm text-blue font-bold mb-1'>Feedback Detail</label>
                    <p className='text-sm text-grey font-normal mb-4'>Include any specific comments on what should be improved, added, etc.</p>
                    {/* Textarea for feedback detail */}
                    <textarea
                        id='detail'
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        className={errorDetail ? 'w-full bg-grey-white2 h-32 p-3 focus:outline-strong-blue border-2 border-red rounded-xl' : 'w-full bg-grey-white2 h-32 p-3 focus:outline-strong-blue rounded-xl' }
                        placeholder='Add details'
                    ></textarea>
                    {/* Error message for feedback detail */}
                    {errorDetail && <p className='text-red'>Can’t be empty</p>}
                </div>
                {/* Buttons for submitting and canceling */}
                <div className='flex flex-col md:flex-row-reverse md:gap-4 md:items-center'>
                    <button type="submit" className='bg-purple text-center text-white mb-4 py-2 rounded-xl font-bold text-sm md:py-2 md:mb-0 md:px-5 hover:bg-hover-purple'>Add Feedback</button>
                    <Link to="/feedback-app-tailwind-vite/" className='bg-blue text-white py-2 rounded-xl text-center text-sm font-bold md:py-2 md:mb-0 md:px-5 hover:bg-hover-grey'>Cancel</Link>
                </div>
            </form>
        </main>
    );
}

export default AddNewFeedback;