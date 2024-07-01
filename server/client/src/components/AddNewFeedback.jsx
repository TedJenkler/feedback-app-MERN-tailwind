import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import addicon from "../assets/addicon.png";
import arrowleft from "../assets/arrowleft.png";
import { useDispatch, useSelector } from 'react-redux';
import { addPost, getAllCategories } from '../features/social/socialSlice';
import CategorySelect from './CategorySelect';

const AddNewFeedback = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const username = localStorage.getItem('username');

    const [formData, setFormData] = useState({
        title: '',
        category: 'Feature',
        description: '',
    });
    const [errors, setErrors] = useState({
        title: false,
        description: false,
    });

    const categories = useSelector((state) => state.social.categories);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title.trim() === '') {
            setErrors({ ...errors, title: true });
            return;
        }
        if (formData.description.trim() === '') {
            setErrors({ ...errors, description: true });
            return;
        }
        const dataWithUser = {
            ...formData,
            user: username
        };
        dispatch(addPost(dataWithUser));
        navigate('/feedback-app-tailwind-vite/');
    };

    return (
        <main className='absolute min-h-full w-full bg-grey-white2 top-0 left-0 right-0 px-6 pt-[2.125rem] pb-20 md:px-28 md:pb-56 md:pt-14 xl:px-96 xl:pt-24 xl:pb-44'>
            <img className='absolute left-12 top-20 h-10 w-10 md:left-40 md:top-24 md:h-14 md:w-14 xl:left-96 xl:ml-10 xl:top-32' src={addicon} alt='addicon' />
            <Link to="/feedback-app-tailwind-vite/" className='flex items-center gap-1 mb-[2.125rem] md:mb-10'>
                <img className='w-1 h-2' src={arrowleft} alt='arrowback' />
                <p className='text-grey px13 font-bold md:text-sm hover:text-black'>Go Back</p>
            </Link>
            <form onSubmit={handleSubmit} className='flex flex-col text-black mt-5 py-11 px-6 bg-white rounded-[0.625rem] md:py-14 md:px-12'>
                <h1 className='text-lg tracking-[-0.25px] text-blue font-bold mb-6 md:text-2xl md:tracking-[-0.33px]'>Create New Feedback</h1>
                <div className='mb-6'>
                    <label htmlFor='title' className='px13 tracking-[-0.18px] text-blue font-bold mb-1 md:text-sm'>Feedback Title</label>
                    <p className='px13 text-grey font-normal mb-4 md:text-sm'>Add a short, descriptive headline</p>
                    <input
                        id='title'
                        name='title'
                        type='text'
                        value={formData.title}
                        onChange={handleInputChange}
                        className={errors.title ? 'w-full px13 bg-grey-white2 h-12 p-4 mb-1 focus:outline-strong-blue border-2 border-red rounded-[0.313rem] md:px-15' : 'w-full px13 bg-grey-white2 h-12 p-4 focus:outline-strong-blue mb-1 rounded-xl md:px-15'}
                        placeholder='Add a title'
                    />
                    {errors.title && <p className='text-red px13 md:text-sm'>Can’t be empty</p>}
                </div>
                <CategorySelect
                    value={formData.category}
                    onChange={(value) => setFormData({ ...formData, category: value })}
                    categories={categories.map(cat => ({ value: cat.name, label: cat.name }))}
                />
                <div className='mb-6'>
                    <label htmlFor='detail' className='px13 tracking-[-0.18px] text-blue font-bold mb-1 md:text-sm'>Feedback Detail</label>
                    <p className='px13 text-grey font-normal mb-4 md:text-sm'>Include any specific comments on what should be improved, added, etc.</p>
                    <textarea
                        id='detail'
                        name='description'
                        value={formData.description}
                        onChange={handleInputChange}
                        className={errors.description ? 'w-full px13 bg-grey-white2 h-32 p-3 focus:outline-strong-blue border-2 border-red rounded-[0.313rem] md:px-15' : 'w-full px-13 bg-grey-white2 h-32 p-3 focus:outline-strong-blue rounded-xl md:px-15'}
                        placeholder='Add details'
                    ></textarea>
                    {errors.description && <p className='text-red px13 md:text-sm'>Can’t be empty</p>}
                </div>
                <div className='flex flex-col md:flex-row-reverse md:gap-4 md:items-center'>
                    <button type="submit" className='flex items-center justify-center px13 bg-purple text-center text-white mb-4 w-full h-10 rounded-xl font-bold text-sm md:py-2 md:mb-0 md:px-5 hover:bg-hover-purple md:text-sm'>Add Feedback</button>
                    <Link to="/feedback-app-tailwind-vite/" className='flex items-center justify-center px13 bg-blue text-white w-full h-10 rounded-xl text-center text-sm font-bold md:py-2 md:mb-0 md:px-5 hover:bg-hover-grey md:text-sm'>Cancel</Link>
                </div>
            </form>
        </main>
    );
}

export default AddNewFeedback;