import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deletefeedback, edit } from '../features/state/stateSlice';
import arrowleft from "../assets/arrowleft.png";
import editicon from "../assets/editicon.svg";

const EditFeedback = () => {
    // Extracting id from URL parameters
    let { id } = useParams();
    let copyOfId = id.substring(1) - 1;

    // Accessing state and Redux dispatch function
    const state = useSelector((state) => state.state.data.productRequests[copyOfId]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State variables for form fields and error handling
    const [title, setTitle] = useState(state.title);
    const [select1, setSelect1] = useState(state.category);
    const [select2, setSelect2] = useState(state.status);
    const [details, setDetails] = useState(state.description);
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorDetail, setErrorDetail] = useState(false);

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation for title field
        if (title !== "") {
            setErrorTitle(false);
            // Validation for details field
            if (details !== "") {
                // Dispatch edit action if no errors
                dispatch(edit({ id: copyOfId, title: title, category: select1, description: details, status: select2 }));
                // Navigate to home page after successful submission
                navigate('/');
            } else {
                setErrorDetail(true);
            }
        } else {
            setErrorTitle(true);
        }
    };

    // JSX markup for the edit feedback form
    return (
        <main className='bg-grey-white2 p-6 h-full pb-20 md:px-28 md:py-14 xl:px-96 xl:pt-24 xl:pb-44'>
            <form onSubmit={handleSubmit}>
                {/* Header and navigation */}
                <img className='absolute left-12 top-20 md:left-40 md:top-28 md:w-14 md:h-14 xl:left-96 xl:ml-10 xl:top-36' src={editicon} alt='editicon' />
                <Link to="/" className='flex items-center gap-2 mb-14'>
                    <img className='w-1 h-2' src={arrowleft} alt='arrowback' />
                    <p className='text-grey text-sm font-bold'>Go Back</p>
                </Link>
                {/* Form fields */}
                <div className='bg-white flex flex-col rounded-xl p-6 pt-12 md:px-12 md:pt-14 md:pb-10'>
                    <h1 className='text-lg font-bold text-blue mb-6 md:text-2xl'>Editing '{state.title}'</h1>
                    <div className='mb-6'>
                        <label htmlFor='title' className='text-sm text-blue font-bold mb-1'>Feedback Title</label>
                        <p className='text-sm text-grey font-normal mb-4'>Add a short, descriptive headline</p>
                        <input
                            id='title'
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={errorTitle ? 'w-full bg-grey-white2 h-12 p-4 mb-1 focus:outline-strong-blue border-2 border-red rounded-xl' : 'w-full bg-grey-white2 h-12 p-4 focus:outline-strong-blue mb-1 rounded-xl'}
                            placeholder='Add a title'
                        />
                        {errorTitle && <p className='text-red'>Can’t be empty</p>}
                    </div>
                    <div className='mb-6'>
                        <label htmlFor='category' className='text-sm text-blue font-bold mb-1'>Category</label>
                        <p className='text-sm text-grey font-normal mb-4'>Choose a category for your feedback</p>
                        <select
                            id='category'
                            value={select1}
                            onChange={(e) => setSelect1(e.target.value)}
                            className='w-full bg-grey-white2 h-12 px-4 focus:outline-strong-blue rounded-xl'
                        >
                            <option value='Feature'>Feature</option>
                            <option value='UI'>UI</option>
                            <option value='UX'>UX</option>
                            <option value='Enchantment'>Enchantment</option>
                            <option value='Bug'>Bug</option>
                        </select>
                    </div>
                    <h2 className='text-sm font-bold text-blue mb-1'>Update Status</h2>
                    <p className='text-sm font-normal text-grey mb-4'>Change feature state</p>
                    <select onChange={(e) => setSelect2(e.target.value)} value={select2} className='h-12 bg-grey-white2 px-4 mb-6 rounded-xl focus:outline-strong-blue'>
                        <option value="planned">Planned</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="live">Live</option>
                    </select>
                    <div className='mb-6'>
                        <label htmlFor='detail' className='text-sm text-blue font-bold mb-1'>Feedback Detail</label>
                        <p className='text-sm text-grey font-normal mb-4'>Include any specific comments on what should be improved, added, etc.</p>
                        <textarea
                            id='detail'
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            className={errorDetail ? 'w-full bg-grey-white2 h-32 p-3 focus:outline-strong-blue border-2 border-red rounded-xl' : 'w-full bg-grey-white2 h-32 p-3 focus:outline-strong-blue rounded-xl'}
                            placeholder='Add details'
                        ></textarea>
                        {errorDetail && <p className='text-red'>Can’t be empty</p>}
                    </div>
                    {/* Form submission buttons */}
                    <div className='flex flex-col md:flex-row-reverse md:justify-between md:gap-4 md:items-center'>
                        <div className='flex flex-col md:flex-row-reverse md:gap-4'>
                        <button type="submit" className='bg-purple text-center text-white mb-4 py-2 rounded-xl font-bold text-sm md:py-2 md:mb-0 md:px-5 hover:bg-hover-purple'>Save Changes</button>
                        <Link to="/" className='bg-blue mb-4 text-white py-2 rounded-xl text-center text-sm font-bold md:py-2 md:mb-0 md:px-5 hover:bg-hover-grey'>Cancel</Link>
                        </div>
                        <button className='bg-red text-white py-2 rounded-xl text-center text-sm font-bold md:mr-28 md:py-2 md:mb-0 md:px-5 hover:bg-hover-red' onClick={(e) => dispatch(deletefeedback(copyOfId))}>Delete</button>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default EditFeedback;

