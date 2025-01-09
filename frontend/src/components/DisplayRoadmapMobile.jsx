import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import arrowup from '../assets/arrowup.png';
import comment from '../assets/comment.png';
import orange from '../assets/orange.png';
import purple from '../assets/purple.png';
import blue from '../assets/blue.png';
import whitearrowup from '../assets/whitearrowup.png';
import {
  getAllCategories,
  getAllPosts,
  upvoteToggle,
} from '../features/social/socialSlice';

function DisplayRoadmapMobile({ selectedRoadmap }) {
  const posts = useSelector(state => state.social.posts);
  const categories = useSelector(state => state.social.categories);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem('user');
  const username = localStorage.getItem('username');

  const [roadmap, setRoadmap] = useState([]);

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    const filteredRoadmap = posts.filter(
      request => request.status.toLowerCase() === selectedRoadmap
    );
    setRoadmap(filteredRoadmap);
  }, [selectedRoadmap, posts]);

  const handleUpvote = (value, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (value.upvotes.users.includes(user)) {
      dispatch(upvoteToggle({ toggle: false, id: value._id, username })).then(
        () => {
          dispatch(getAllPosts());
        }
      );
    } else {
      dispatch(upvoteToggle({ toggle: true, id: value._id, username })).then(
        () => {
          dispatch(getAllPosts());
        }
      );
    }
  };

  const getCategoryLabel = categoryId => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'General';
  };

  return (
    <main className='min-h-screen bg-grey-white2 p-6 xs:px-3 s:px-6'>
      <h1 className='mb-1 text-lg font-bold tracking-[-0.25px] text-blue'>
        {selectedRoadmap === 'planned'
          ? `Planned (${roadmap.length})`
          : selectedRoadmap === 'in-progress'
            ? `In Progress (${roadmap.length})`
            : `Live (${roadmap.length})`}
      </h1>
      {selectedRoadmap === 'planned' && (
        <p className='px13 mb-6 font-normal text-grey'>
          Ideas prioritized for research
        </p>
      )}
      {selectedRoadmap === 'in-progress' && (
        <p className='px13 mb-6 font-normal text-grey'>
          Currently being developed
        </p>
      )}
      {selectedRoadmap === 'live' && (
        <p className='px13 mb-6 font-normal text-grey'>Released features</p>
      )}
      {roadmap.map(feedback => (
        <div
          key={feedback._id}
          onClick={() => {
            navigate('/feedback/' + feedback._id);
          }}
          className={`mb-4 h-[14.563rem] rounded-xl border-t-[0.375rem] bg-white p-6 pt-4 border-${selectedRoadmap === 'planned' ? 'orange' : selectedRoadmap === 'in-progress' ? 'purple' : 'light-blue'}`}
        >
          <div className='mb-4 flex items-center gap-2'>
            <img
              className='h-2 w-2'
              src={
                selectedRoadmap === 'planned'
                  ? orange
                  : selectedRoadmap === 'in-progress'
                    ? purple
                    : blue
              }
              alt={
                selectedRoadmap === 'planned'
                  ? 'orange oval'
                  : selectedRoadmap === 'in-progress'
                    ? 'purple oval'
                    : 'blue oval'
              }
            />
            <p className='px13 font-normal text-grey'>
              {selectedRoadmap === 'planned'
                ? 'Planned'
                : selectedRoadmap === 'in-progress'
                  ? 'In Progress'
                  : 'Live'}
            </p>
          </div>
          <h2 className='px13 mb-2 font-bold tracking-[-0.18px] text-blue'>
            {feedback.title}
          </h2>
          <p className='px13 mb-2 font-normal text-grey'>
            {feedback.description}
          </p>
          <div className='px13 mb-4 flex h-[1.875rem] w-[6.938rem] items-center justify-center rounded-[0.625rem] bg-grey-white'>
            <p className='font-semibold text-strong-blue'>
              {getCategoryLabel(feedback.category)}
            </p>
          </div>
          <div className='flex justify-between'>
            <button
              onClick={e => handleUpvote(feedback, e)}
              className={
                feedback.upvotes.users.includes(user)
                  ? 'flex h-8 w-[4.313rem] items-center gap-2 rounded-xl bg-strong-blue text-white'
                  : 'flex h-8 w-[4.313rem] items-center gap-2 rounded-xl bg-grey-white'
              }
            >
              <img
                className='ml-4 h-1 w-2'
                src={
                  feedback.upvotes.users.includes(user) ? whitearrowup : arrowup
                }
                alt='arrowup'
              />
              <p
                className={
                  feedback.upvotes.users.includes(user)
                    ? 'px13 ml-2 font-bold tracking-[-0.18px] text-white'
                    : 'px13 ml-2 font-bold tracking-[-0.18px] text-blue'
                }
              >
                {feedback.upvotes.totalUpvotes}
              </p>
            </button>
            <button className='flex items-center gap-2'>
              <img className='h-4 w-5' src={comment} alt='comments' />
              <p className='px13 font-bold tracking-[-0.18px] text-blue'>
                {feedback.comments ? feedback.comments.length : 0}
              </p>
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}

export default DisplayRoadmapMobile;
