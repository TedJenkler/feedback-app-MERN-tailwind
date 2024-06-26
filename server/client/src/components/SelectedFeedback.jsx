import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import arrowleft from "../assets/arrowleft.png";
import comment from "../assets/comment.png";
import arrowup from "../assets/arrowup.png";
import whitearrowup from "../assets/whitearrowup.png";
import { useSelector, useDispatch } from 'react-redux';
import CommentMap from './CommentMap';
import { getAllPosts, getAllCategories, upvoteToggle } from '../features/social/socialSlice';
import AddComment from './AddComment';

function SelectedFeedback() {
    const { id } = useParams();
    const navigate = useNavigate();
    const posts = useSelector((state) => state.social.posts);
    const categories = useSelector((state) => state.social.categories);
    const post = posts.find(item => item._id === id)
    const dispatch = useDispatch()

    const user = localStorage.getItem('user')
    const username = localStorage.getItem('username')

    useEffect(() => {
        dispatch(getAllCategories())
        dispatch(getAllPosts());
      }, []);

      const handleUpvote = (post) => {
        if (post.upvotes.users.includes(user)) {
          dispatch(upvoteToggle({ toggle: false, id: post._id, username: username })).then(() => {
            dispatch(getAllPosts());
          });
        } else {
          dispatch(upvoteToggle({ toggle: true, id: post._id, username: username })).then(() => {
            dispatch(getAllPosts());
          });
        }
      };

    const getCategoryNameById = (categoryId) => {
        const category = categories.find(cat => cat._id === categoryId);
        return category ? category.name : "Unknown";
      };
    

    return (
        <main className='absolute top-0 bg-grey-white left-0 right-0 min-w-screen min-h-full p-6 pb-24 md:px-10 md:pt-14 md:pb-32 xl:pt-20 xl:pb-32 xl:px-80'>
            <div className='flex justify-between mb-6'>
                <button onClick={() => navigate(-1)} className='flex items-center gap-1'>
                    <img className='w-1 h-2' src={arrowleft} alt='arrowback' />
                    <p className='text-grey px-3 font-bold hover:text-black md:text-sm'>Go Back</p>
                </button>
                <Link to={"/editfeedback/" + id} className='bg-strong-blue px-3 font-bold text-white rounded-xl py-2 hover:bg-hover-blue md:text-sm'>Edit Feedback</Link>
            </div>
            <div className='bg-white mb-6 p-6 rounded-xl md:flex md:flex-row-reverse md:justify-between'>
                <button className='hidden absolute items-center gap-1 md:flex md:relative'>
                    <img className='h-4 w-5' src={comment} alt='comments' />
                    <p className='px-3 font-bold tracking-[-0.22px] md:text-base'>{post ? post.comments.length : 0}</p>
                </button>
                <div className='md:flex md:flex-row-reverse md:gap-10'>
                    <div>
                        <h2 className='px-3 tracking-[-0.18px] font-bold text-blue mb-2 md:text-lg'>{post ? post.title : null}</h2>
                        <p className='text-grey px-3 font-normal mb-2 md:text-base'>{post ? post.description : null}</p>
                        <div className='items-center justify-center bg-grey-white py-1 rounded-xl px-3 inline-block mb-4'>
                            <p className='text-strong-blue font-semibold'>{post ? getCategoryNameById(post.category) : null}</p>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex justify-between'>
                        <button onClick={() => handleUpvote(post)} className={post ? post.upvotes.users.includes(user) ? 'flex bg-strong-blue text-white items-center gap-2 py-2 px-4 rounded-xl md:flex-col md:h-12 md:w-10 md:p-2 hover:bg-hover-blue' : 'flex bg-grey-white text-blue items-center gap-2 py-2 px-4 rounded-xl md:flex-col md:h-12 md:w-10 md:p-2 hover:bg-hover-blue' : null}>
                                <img className='w-2 h-1' src={post ? post.upvotes.users.includes(user) ? whitearrowup : arrowup : null} alt='arrowup' />
                                <p className={post ? post.upvotes.users.includes(user) ? 'px13 tracking-[-0.18px] text-white font-bold' : 'px13 tracking-[-0.18px] text-blue font-bold' : null}>{post ? post.upvotes.totalUpvotes : 0}</p>
                            </button>
                        </div>
                        <button className='flex items-center gap-1 md:hidden md:absolute'>
                            <img className='h-4 w-5' src={comment} alt='comments' />
                            <p className='font-bold px-3 tracking-[-0.18px] md:text-base'>{post ? post.comments.length : 0}</p>
                        </button>
                    </div>
                </div>
            </div>
            <div className='bg-white rounded-xl p-6 mb-6 md:px-8'>
                <h2 className='text-lg tracking-[-0.25px] text-blue font-bold mb-6'>{post ? post.comments.length : 0} Comments</h2>
                <CommentMap id={id}/>
            </div>
            <AddComment postId={post ? post._id : null} />
        </main>
    );
}

export default SelectedFeedback;
