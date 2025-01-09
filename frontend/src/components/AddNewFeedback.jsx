import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import addicon from '../assets/addicon.png';
import arrowleft from '../assets/arrowleft.png';
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

  const categories = useSelector(state => state.social.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const handleSubmit = e => {
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
      user: username,
    };
    dispatch(addPost(dataWithUser));
    navigate('/feedback-app-tailwind-vite/');
  };

  return (
    <main className='absolute left-0 right-0 top-0 min-h-full w-full bg-grey-white2 px-6 pb-20 pt-[2.125rem] xs:px-3 s:px-6 md:px-28 md:pb-56 md:pt-14 xl:px-96 xl:pb-44 xl:pt-24'>
      <img
        className='absolute left-12 top-20 h-10 w-10 md:left-40 md:top-24 md:h-14 md:w-14 xl:left-96 xl:top-32 xl:ml-10'
        src={addicon}
        alt='addicon'
      />
      <Link
        to='/feedback-app-tailwind-vite/'
        className='mb-[2.125rem] flex items-center gap-1 md:mb-10'
      >
        <img className='h-2 w-1' src={arrowleft} alt='arrowback' />
        <p className='px13 font-bold text-grey hover:text-black md:text-sm'>
          Go Back
        </p>
      </Link>
      <form
        onSubmit={handleSubmit}
        className='mt-5 flex flex-col rounded-[0.625rem] bg-white px-6 py-11 text-black md:px-12 md:py-14'
      >
        <h1 className='mb-6 text-lg font-bold tracking-[-0.25px] text-blue md:text-2xl md:tracking-[-0.33px]'>
          Create New Feedback
        </h1>
        <div className='mb-6'>
          <label
            htmlFor='title'
            className='px13 mb-1 font-bold tracking-[-0.18px] text-blue md:text-sm'
          >
            Feedback Title
          </label>
          <p className='px13 mb-4 font-normal text-grey md:text-sm'>
            Add a short, descriptive headline
          </p>
          <input
            id='title'
            name='title'
            type='text'
            value={formData.title}
            onChange={handleInputChange}
            className={`input h-12 w-full ${errors.title ? 'outline-red' : 'outline-transparent'}`}
            placeholder='Add a title'
          />
          {errors.title && (
            <p className='mt-1 text-sm text-red md:text-sm'>Can’t be empty</p>
          )}
        </div>
        <CategorySelect
          value={formData.category}
          onChange={value => setFormData({ ...formData, category: value })}
          categories={categories.map(cat => ({
            value: cat.name,
            label: cat.name,
          }))}
        />
        <div className='mb-6'>
          <label
            htmlFor='detail'
            className='px13 mb-1 font-bold tracking-[-0.18px] text-blue md:text-sm'
          >
            Feedback Detail
          </label>
          <p className='px13 mb-4 font-normal text-grey md:text-sm'>
            Include any specific comments on what should be improved, added,
            etc.
          </p>
          <textarea
            id='detail'
            name='description'
            value={formData.description}
            onChange={handleInputChange}
            className={`input h-32 w-full ${errors.description ? 'outline-red' : 'outline-transparent'}`}
            placeholder='Add details'
          ></textarea>
          {errors.description && (
            <p className='text-sm text-red'>Can’t be empty</p>
          )}
        </div>
        <div className='flex flex-col md:flex-row-reverse md:items-center md:gap-4'>
          <button
            type='submit'
            className='px13 mb-4 flex h-10 w-full items-center justify-center rounded-xl bg-purple text-center text-sm font-bold text-white hover:bg-hover-purple md:mb-0 md:h-[2.75rem] md:w-[9rem] md:text-sm'
          >
            Add Feedback
          </button>
          <Link
            to='/feedback-app-tailwind-vite/'
            className='px13 flex h-10 w-full items-center justify-center rounded-xl bg-blue text-center text-sm font-bold text-white hover:bg-hover-grey md:mb-0 md:h-[2.75rem] md:w-[5.813rem] md:text-sm'
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
};

export default AddNewFeedback;
