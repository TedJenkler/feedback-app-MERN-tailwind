import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import arrowleft from "../assets/arrowleft.png";
import editicon from "../assets/editicon.svg";
import { useDispatch, useSelector } from 'react-redux';
import { editPost, deletePost, getAllCategories, getPostById } from '../features/social/socialSlice';
import CategorySelect from './CategorySelect';

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

    const initialFormData = {
        title: post.title || '',
        category: post.category || 'Feature',
        status: post.status || 'planned',
        description: post.description || '',
    };

    const [formData, setFormData] = React.useState(initialFormData);
    const [errorTitle, setErrorTitle] = React.useState(false);
    const [errorDetail, setErrorDetail] = React.useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSaveChanges = () => {
        dispatch(editPost({ formData, id }));
        navigate('/feedback-app-tailwind-vite/');
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            dispatch(deletePost({ id }));
            navigate('/feedback-app-tailwind-vite/');
        }
    };

    return (
        <main className='bg-grey-white2 p-6 h-full pb-20 md:px-28 md:py-14 xl:px-96 xl:pt-24 xl:pb-44'>
            <div>
                <img className='absolute left-12 top-20 md:left-40 md:top-28 md:w-14 md:h-14 xl:left-96 xl:ml-10 xl:top-36' src={editicon} alt='editicon' />
                <Link to="/feedback-app-tailwind-vite/" className='flex items-center gap-2 mb-14'>
                    <img className='w-1 h-2' src={arrowleft} alt='arrowback' />
                    <p className='text-grey px-13 font-bold md:text-sm hover:text-black'>Go Back</p>
                </Link>
                <div className='bg-white flex flex-col rounded-xl p-6 pt-12 md:px-12 md:pt-14 md:pb-10'>
                    <h1 className='text-lg tracking-[-0.25px] font-bold text-blue mb-6 md:text-2xl md:tracking-[-0.33px]'>Editing '{formData.title}'</h1>
                    <div className='mb-6'>
                        <label htmlFor='title' className='px-13 tracking-[-0.18px] text-blue font-bold mb-1 md:text-sm'>Feedback Title</label>
                        <p className='px-13 text-grey font-normal mb-4 md:text-sm'>Add a short, descriptive headline</p>
                        <input
                            id='title'
                            name='title'
                            type='text'
                            value={formData.title}
                            onChange={handleInputChange}
                            className={errorTitle ? 'w-full px-13 bg-grey-white2 h-12 p-4 mb-1 focus:outline-strong-blue border-2 border-red rounded-xl md:px-15' : 'w-full px-13 bg-grey-white2 h-12 p-4 focus:outline-strong-blue mb-1 rounded-xl md:px-15'}
                            placeholder='Add a title'
                        />
                        {errorTitle && <p className='text-red px-13 md:text-sm'>Can’t be empty</p>}
                    </div>
                    <CategorySelect
                        value={formData.category}
                        onChange={(value) => setFormData({ ...formData, category: value })}
                    />
                    <h2 className='px-13 tracking-[-0.18px] font-bold text-blue mb-1 md:text-sm'>Update Status</h2>
                    <p className='px-13 font-normal text-grey mb-4 md:text-sm'>Change feature state</p>
                    <select
                        id='status'
                        name='status'
                        value={formData.status}
                        onChange={handleInputChange}
                        className='h-12 px-13 bg-grey-white2 px-4 mb-6 rounded-xl focus:outline-strong-blue md:px-15'
                    >
                        <option value="planned">Planned</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="live">Live</option>
                    </select>
                    <div className='mb-6'>
                        <label htmlFor='detail' className='px-13 tracking-[-0.18px] text-blue font-bold mb-1 md:text-sm'>Feedback Detail</label>
                        <p className='px-13 text-grey font-normal mb-4 md:text-sm'>Include any specific comments on what should be improved, added, etc.</p>
                        <textarea
                            id='detail'
                            name='description'
                            value={formData.description}
                            onChange={handleInputChange}
                            className={errorDetail ? 'w-full px-13 bg-grey-white2 h-32 p-3 focus:outline-strong-blue border-2 border-red rounded-xl md:px-15' : 'w-full px-13 bg-grey-white2 h-32 p-3 focus:outline-strong-blue rounded-xl md:px-15'}
                            placeholder='Add details'
                        ></textarea>
                        {errorDetail && <p className='text-red px-13 md:text-sm'>Can’t be empty</p>}
                    </div>
                    <div className='flex flex-col md:flex-row-reverse md:justify-between md:gap-4 md:items-center'>
                        <button type="button" onClick={handleSaveChanges} className='px-13 bg-purple text-center text-white mb-4 py-2 rounded-xl font-bold text-sm md:py-2 md:mb-0 md:px-5 hover:bg-hover-purple md:text-sm'>Save Changes</button>
                        <Link to="/feedback-app-tailwind-vite/" className='px-13 bg-blue mb-4 text-white py-2 rounded-xl text-center text-sm font-bold md:py-2 md:mb-0 md:px-5 hover:bg-hover-grey md:text-sm'>Cancel</Link>
                        <button type="button" onClick={handleDelete} className='px-13 bg-red text-white py-2 rounded-xl text-center text-sm font-bold md:mr-28 md:py-2 md:mb-0 md:px-5 hover:bg-hover-red md:text-sm'>Delete</button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default EditFeedback;