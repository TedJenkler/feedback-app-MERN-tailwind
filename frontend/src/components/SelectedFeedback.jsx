import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import arrowleft from '../assets/arrowleft.png';
import comment from '../assets/comment.png';
import arrowup from '../assets/arrowup.png';
import whitearrowup from '../assets/whitearrowup.png';
import { useSelector, useDispatch } from 'react-redux';
import CommentMap from './CommentMap';
import {
  getAllPosts,
  getAllCategories,
  upvoteToggle,
} from '../features/social/socialSlice';
import AddComment from './AddComment';

function SelectedFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const posts = useSelector(state => state.social.posts);
  const categories = useSelector(state => state.social.categories);
  const post = posts.find(item => item._id === id);
  const dispatch = useDispatch();

  const user = localStorage.getItem('user');
  const username = localStorage.getItem('username');

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllPosts());
  }, []);

  const handleUpvote = post => {
    if (post.upvotes.users.includes(user)) {
      dispatch(
        upvoteToggle({ toggle: false, id: post._id, username: username })
      ).then(() => {
        dispatch(getAllPosts());
      });
    } else {
      dispatch(
        upvoteToggle({ toggle: true, id: post._id, username: username })
      ).then(() => {
        dispatch(getAllPosts());
      });
    }
  };

  const getCategoryNameById = categoryId => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'Unknown';
  };

  return (
    <main className='min-w-screen absolute left-0 right-0 top-0 min-h-full bg-grey-white p-6 pb-24 xs:px-3 s:px-6 md:px-10 md:pb-32 md:pt-14 xl:px-80 xl:pb-32 xl:pt-20'>
      <div className='mb-6 flex justify-between'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-4'
        >
          <img className='h-2 w-1' src={arrowleft} alt='arrowback' />
          <p className='px13 font-bold text-grey hover:text-black md:text-sm'>
            Go Back
          </p>
        </button>
        <Link
          to={'/editfeedback/' + id}
          className='px13 flex h-10 w-[7.438rem] items-center justify-center rounded-xl bg-strong-blue font-bold text-white hover:bg-hover-blue md:h-[2.75rem] md:w-[8.875rem] md:text-sm'
        >
          Edit Feedback
        </Link>
      </div>
      <div className='mb-6 rounded-xl bg-white p-6 md:flex md:flex-row-reverse md:justify-between'>
        <button className='absolute hidden items-center gap-1 md:relative md:flex'>
          <img className='h-4 w-5' src={comment} alt='comments' />
          <p className='px-3 font-bold tracking-[-0.22px] md:text-base'>
            {post ? post.comments.length : 0}
          </p>
        </button>
        <div className='md:flex md:flex-row-reverse md:gap-10'>
          <div>
            <h2 className='px13 mb-2 font-bold tracking-[-0.18px] text-blue md:text-lg'>
              {post ? post.title : null}
            </h2>
            <p className='px13 mb-[0.625rem] font-normal text-grey md:text-base'>
              {post ? post.description : null}
            </p>
            <div className='mb-4 flex h-[1.875rem] w-[6.938rem] items-center justify-center rounded-xl bg-grey-white'>
              <p className='font-semibold text-strong-blue'>
                {post ? getCategoryNameById(post.category) : null}
              </p>
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex justify-between'>
              <button
                onClick={() => handleUpvote(post)}
                className={
                  post
                    ? post.upvotes.users.includes(user)
                      ? 'flex h-[2rem] w-[4.313rem] items-center gap-2 rounded-xl bg-strong-blue text-white hover:bg-hover-blue md:h-12 md:w-10 md:flex-col md:p-2'
                      : 'flex h-[2rem] w-[4.313rem] items-center gap-2 rounded-xl bg-grey-white text-blue hover:bg-hover-blue md:h-12 md:w-10 md:flex-col md:p-2'
                    : null
                }
              >
                <img
                  className='ml-4 h-1 w-2 md:ml-0'
                  src={
                    post
                      ? post.upvotes.users.includes(user)
                        ? whitearrowup
                        : arrowup
                      : null
                  }
                  alt='arrowup'
                />
                <p
                  className={
                    post
                      ? post.upvotes.users.includes(user)
                        ? 'px13 ml-[0.625rem] font-bold tracking-[-0.18px] text-white md:ml-0'
                        : 'px13 ml-[0.625rem] font-bold tracking-[-0.18px] text-blue md:ml-0'
                      : null
                  }
                >
                  {post ? post.upvotes.totalUpvotes : 0}
                </p>
              </button>
            </div>
            <button className='flex items-center gap-1 md:absolute md:hidden'>
              <img className='h-4 w-5' src={comment} alt='comments' />
              <p className='px-3 font-bold tracking-[-0.18px] md:text-base'>
                {post ? post.comments.length : 0}
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className='mb-6 rounded-xl bg-white p-6 md:px-8'>
        <h2 className='mb-6 text-lg font-bold tracking-[-0.25px] text-blue'>
          {post ? post.comments.length : 0} Comments
        </h2>
        <CommentMap id={id} />
      </div>
      <AddComment postId={post ? post._id : null} />
    </main>
  );
}

export default SelectedFeedback;
