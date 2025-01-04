import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import arrowleft from "../assets/arrowleft.png";
import editicon from "../assets/editicon.svg";
import { useDispatch, useSelector } from 'react-redux';
import { editPost, deletePost, getAllCategories, getPostById } from '../features/social/socialSlice';
import CategorySelect from './CategorySelect';
import StatusSelect from './StatusSelect';

const EditFeedback = () => {
    let { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const post = useSelector((state) => state.social.selectedPost);
    const categories = useSelector((state) => state.social.categories);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
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

    const handleStatusChange = (status) => {
        setFormData({
            ...formData,
            status: status
        });
    };

    return (
        <main className='xs:px-3 s:px-6 bg-grey-white2 p-6 h-full pt-[2.125rem] pb-20 md:px-28 md:py-14 xl:px-96 xl:pt-24 xl:pb-44'>
            <div>
                <img className='relative left-[24px] md:left-[40px] top-20 md:top-24 md:w-14 md:h-14 xl:left-96 xl:ml-10 xl:top-36' src={editicon} alt='editicon' />
                <Link to="/feedback-app-tailwind-vite/" className='flex items-center gap-2 mb-[2.125rem]'>
                    <img className='w-1 h-2' src={arrowleft} alt='arrowback' />
                    <p className='text-grey px13 font-bold md:text-sm hover:text-black'>Go Back</p>
                </Link>
                <div className='bg-white flex flex-col rounded-xl p-6 pt-12 md:px-12 md:pt-14 md:pb-10'>
                    <h1 className='text-lg tracking-[-0.25px] font-bold text-blue mb-6 md:text-2xl md:tracking-[-0.33px]'>Editing '{formData.title}'</h1>
                    <div className='mb-6'>
                        <label htmlFor='title' className='px13 tracking-[-0.18px] text-blue font-bold mb-1 md:text-sm'>Feedback Title</label>
                        <p className='px13 text-grey font-normal mb-4 md:text-sm'>Add a short, descriptive headline</p>
                        <input
                            id='title'
                            name='title'
                            type='text'
                            value={formData.title}
                            onChange={handleInputChange}
                            className={`w-full h-12 input ${errorTitle ? 'outline-red' : 'outline-transparent'}`}
                            placeholder='Add a title'
                        />
                        {errorTitle && <p className='mt-1 text-red text-sm md:text-sm'>Can’t be empty</p>}
                    </div>
                    <CategorySelect
                        value={formData.category}
                        onChange={(value) => setFormData({ ...formData, category: value })}
                    />
                    <div>
                        <StatusSelect
                            value={formData.status}
                            onChange={handleStatusChange}
                        />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor='detail' className='px13 tracking-[-0.18px] text-blue font-bold mb-1 md:text-sm'>Feedback Detail</label>
                        <p className='px13 text-grey font-normal mb-4 md:text-sm'>Include any specific comments on what should be improved, added, etc.</p>
                        <textarea
                            id='detail'
                            name='description'
                            value={formData.description}
                            onChange={handleInputChange}
                            className={`w-full input h-32 ${errorDetail ? 'outline-red' : 'outline-transparent'}`}
                            placeholder='Add details'
                        ></textarea>
                        {errorDetail && <p className='text-red text-sm'>Can’t be empty</p>}
                    </div>
                    <div className='flex flex-col md:flex-row-reverse md:justify-between md:gap-4 md:items-center'>
                        <div className='flex flex-col md:flex-row-reverse md:gap-4'>
                            <button type="button" onClick={handleSaveChanges} className='flex justify-center items-center px13 bg-purple text-center text-white mb-4 w-full h-10 rounded-xl font-bold text-sm md:mb-0 hover:bg-hover-purple md:text-sm md:max-w-[9rem] md:min-w-[9rem] min-h-[2.75rem]'>Save Changes</button>
                            <Link to="/feedback-app-tailwind-vite/" className='flex justify-center items-center px13 bg-blue mb-4 text-white w-full h-10 rounded-xl text-center text-sm font-bold md:mb-0 hover:bg-hover-grey md:text-sm md:max-w-[5.813rem] md:min-w-[5.813rem] min-h-[2.75rem]'>Cancel</Link>
                        </div>
                        <button type="button" onClick={handleDelete} className='flex justify-center items-center px13 bg-red text-white w-full h-10 rounded-xl text-center text-sm font-bold md:mb-0 hover:bg-hover-red md:text-sm md:max-w-[5.813rem] min-h-[2.75rem]'>Delete</button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default EditFeedback;