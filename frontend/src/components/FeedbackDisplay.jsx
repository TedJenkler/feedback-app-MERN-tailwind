import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import arrowup from '../assets/arrowup.png';
import comment from '../assets/comment.png';
import NoFeedback from './NoFeedback';
import whitearrowup from '../assets/whitearrowup.png';
import {
  getAllPosts,
  upvoteToggle,
  getAllCategories,
} from '../features/social/socialSlice';

function FeedbackDisplay() {
  const posts = useSelector(state => state.social.posts);
  const categories = useSelector(state => state.social.categories);
  const navigate = useNavigate();
  const sortValue = useSelector(state => state.state.sortBy);
  const filterValue = useSelector(state => state.state.filterBy);
  const dispatch = useDispatch();

  const user = localStorage.getItem('user');
  const username = localStorage.getItem('username');

  const [filteredAndSortedRequests, setFilteredAndSortedRequests] = useState(
    []
  );

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    if (posts) {
      let filteredAndSortedRequestsCopy = [...posts];

      if (filterValue !== 'ALL') {
        filteredAndSortedRequestsCopy = filteredAndSortedRequestsCopy.filter(
          request => {
            return getCategoryNameById(request.category) === filterValue;
          }
        );
      }

      if (sortValue === 'Most Upvotes') {
        filteredAndSortedRequestsCopy.sort(
          (a, b) =>
            parseInt(
              b.upvotes?.totalUpvotes?.$numberInt ||
                b.upvotes?.totalUpvotes ||
                0
            ) -
            parseInt(
              a.upvotes?.totalUpvotes?.$numberInt ||
                a.upvotes?.totalUpvotes ||
                0
            )
        );
      } else if (sortValue === 'Least Upvotes') {
        filteredAndSortedRequestsCopy.sort(
          (a, b) =>
            parseInt(
              a.upvotes?.totalUpvotes?.$numberInt ||
                a.upvotes?.totalUpvotes ||
                0
            ) -
            parseInt(
              b.upvotes?.totalUpvotes?.$numberInt ||
                b.upvotes?.totalUpvotes ||
                0
            )
        );
      } else if (sortValue === 'Most Comments') {
        filteredAndSortedRequestsCopy.sort(
          (a, b) => b.comments.length - a.comments.length
        );
      } else if (sortValue === 'Least Comments') {
        filteredAndSortedRequestsCopy.sort(
          (a, b) => a.comments.length - b.comments.length
        );
      }

      setFilteredAndSortedRequests(filteredAndSortedRequestsCopy);
    }
  }, [posts, filterValue, sortValue]);

  const handleUpvote = (value, e) => {
    if (value.upvotes.users.includes(user)) {
      dispatch(
        upvoteToggle({ toggle: false, id: value._id, username: username })
      ).then(() => {
        dispatch(getAllPosts());
      });
    } else {
      dispatch(
        upvoteToggle({ toggle: true, id: value._id, username: username })
      ).then(() => {
        dispatch(getAllPosts());
      });
    }
  };

  const getCategoryNameById = categoryId => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const handleClick = (e, value) => {
    e.stopPropagation();
    handleUpvote(value);
  };

  return (
    <main className='w-screen" min-h-screen overflow-hidden bg-grey-white py-8 pb-28 md:pt-6 xl:pt-6'>
      {filteredAndSortedRequests.map(value => (
        <div
          key={value._id}
          onClick={() => {
            navigate('/feedback/' + value._id);
          }}
          className='mb-4 rounded-xl bg-white p-6 xs:mx-3 s:mx-6 md:mx-10 md:flex md:flex-row-reverse md:justify-between md:px-8 md:py-7 xl:mx-0 xl:ml-8'
        >
          <button className='absolute hidden items-center gap-1 md:relative md:flex'>
            <img className='h-4 w-5' src={comment} alt='comments' />
            <p>{value.comments.length}</p>
          </button>
          <div className='md:flex md:flex-row-reverse md:gap-10'>
            <div>
              <p className='px13 mb-2 font-bold tracking-[-0.18px] text-blue md:text-lg'>
                {value.title}
              </p>
              <p className='px13 mb-2 font-normal text-grey md:text-base'>
                {value.description}
              </p>
              <div className='mb-4 flex h-[1.875rem] w-[6.938rem] items-center justify-center rounded-xl bg-grey-white text-sm'>
                <p className='px13 font-semibold text-strong-blue'>
                  {getCategoryNameById(value.category)}
                </p>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='flex justify-between'>
                <button
                  onClick={e => handleClick(e, value)}
                  className={
                    value.upvotes.users.includes(user)
                      ? 'flex h-[2rem] w-[4.313rem] items-center gap-2 rounded-xl bg-strong-blue pl-4 text-white hover:bg-hover-blue md:h-12 md:w-10 md:flex-col md:p-2'
                      : 'flex h-[2rem] w-[4.313rem] items-center gap-2 rounded-xl bg-grey-white pl-4 text-blue hover:bg-hover-blue md:h-12 md:w-10 md:flex-col md:p-2'
                  }
                >
                  <img
                    className='h-1 w-2'
                    src={
                      value.upvotes.users.includes(user)
                        ? whitearrowup
                        : arrowup
                    }
                    alt='arrowup'
                  />
                  <p
                    className={
                      value.upvotes.users.includes(user)
                        ? 'px13 ml-2 font-bold tracking-[-0.18px] text-white md:ml-0'
                        : 'px13 ml-2 font-bold tracking-[-0.18px] text-blue md:ml-0'
                    }
                  >
                    {value.upvotes.totalUpvotes}
                  </p>
                </button>
              </div>
              <button className='flex items-center gap-2 md:hidden'>
                <img
                  className='h-4 w-[1.125rem]'
                  src={comment}
                  alt='comments'
                />
                <p className='px13 font-bold tracking-[-0.18px] md:text-base'>
                  {value.comments.length}
                </p>
              </button>
            </div>
          </div>
        </div>
      ))}
      {filteredAndSortedRequests.length === 0 && (
        <main className='min-h-full bg-grey-white pb-32'>
          <NoFeedback />
        </main>
      )}
    </main>
  );
}

export default FeedbackDisplay;
