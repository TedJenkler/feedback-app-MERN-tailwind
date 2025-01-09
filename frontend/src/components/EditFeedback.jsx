import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import arrowleft from '../assets/arrowleft.png';
import editicon from '../assets/editicon.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  editPost,
  deletePost,
  getAllCategories,
  getPostById,
} from '../features/social/socialSlice';
import CategorySelect from './CategorySelect';
import StatusSelect from './StatusSelect';

const EditFeedback = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector(state => state.social.selectedPost);
  const categories = useSelector(state => state.social.categories);

  useEffect(() => {
    dispatch(getPostById({ id }));
    dispatch(getAllCategories());
  }, [dispatch, id]);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Feature',
    status: 'planned',
    description: '',
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        category: post.category || 'Feature',
        status: post.status || 'planned',
        description: post.description || '',
      });
    }
  }, [post]);

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDetail, setErrorDetail] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    if (formData.title.trim() === '') {
      setErrorTitle(true);
      return;
    }
    if (formData.description.trim() === '') {
      setErrorDetail(true);
      return;
    }
    setErrorTitle(false);
    setErrorDetail(false);
    dispatch(editPost({ formData, id }));
    navigate('/feedback-app-tailwind-vite/');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost({ id }));
      navigate('/feedback-app-tailwind-vite/');
    }
  };

  const handleStatusChange = status => {
    setFormData({
      ...formData,
      status: status,
    });
  };

  return (
    <main className='h-full bg-grey-white2 p-6 pb-20 pt-[2.125rem] xs:px-3 s:px-6 md:px-28 md:py-14 xl:px-96 xl:pb-44 xl:pt-24'>
      <div>
        <img
          className='relative left-[24px] top-20 md:left-[40px] md:top-24 md:h-14 md:w-14 xl:left-96 xl:top-36 xl:ml-10'
          src={editicon}
          alt='editicon'
        />
        <Link
          to='/feedback-app-tailwind-vite/'
          className='mb-[2.125rem] flex items-center gap-2'
        >
          <img className='h-2 w-1' src={arrowleft} alt='arrowback' />
          <p className='px13 font-bold text-grey hover:text-black md:text-sm'>
            Go Back
          </p>
        </Link>
        <div className='flex flex-col rounded-xl bg-white p-6 pt-12 md:px-12 md:pb-10 md:pt-14'>
          <h1 className='mb-6 text-lg font-bold tracking-[-0.25px] text-blue md:text-2xl md:tracking-[-0.33px]'>
            Editing '{formData.title}'
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
              className={`input h-12 w-full ${errorTitle ? 'outline-red' : 'outline-transparent'}`}
              placeholder='Add a title'
            />
            {errorTitle && (
              <p className='mt-1 text-sm text-red md:text-sm'>Can’t be empty</p>
            )}
          </div>
          <CategorySelect
            value={formData.category}
            onChange={value => setFormData({ ...formData, category: value })}
          />
          <div>
            <StatusSelect
              value={formData.status}
              onChange={handleStatusChange}
            />
          </div>
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
              className={`input h-32 w-full ${errorDetail ? 'outline-red' : 'outline-transparent'}`}
              placeholder='Add details'
            ></textarea>
            {errorDetail && <p className='text-sm text-red'>Can’t be empty</p>}
          </div>
          <div className='flex flex-col md:flex-row-reverse md:items-center md:justify-between md:gap-4'>
            <div className='flex flex-col md:flex-row-reverse md:gap-4'>
              <button
                type='button'
                onClick={handleSaveChanges}
                className='px13 mb-4 flex h-10 min-h-[2.75rem] w-full items-center justify-center rounded-xl bg-purple text-center text-sm font-bold text-white hover:bg-hover-purple md:mb-0 md:min-w-[9rem] md:max-w-[9rem] md:text-sm'
              >
                Save Changes
              </button>
              <Link
                to='/feedback-app-tailwind-vite/'
                className='px13 mb-4 flex h-10 min-h-[2.75rem] w-full items-center justify-center rounded-xl bg-blue text-center text-sm font-bold text-white hover:bg-hover-grey md:mb-0 md:min-w-[5.813rem] md:max-w-[5.813rem] md:text-sm'
              >
                Cancel
              </Link>
            </div>
            <button
              type='button'
              onClick={handleDelete}
              className='px13 flex h-10 min-h-[2.75rem] w-full items-center justify-center rounded-xl bg-red text-center text-sm font-bold text-white hover:bg-hover-red md:mb-0 md:max-w-[5.813rem] md:text-sm'
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditFeedback;
