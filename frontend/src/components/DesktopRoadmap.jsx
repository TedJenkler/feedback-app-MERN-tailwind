import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import whiteArrow from '../assets/whitearrow.png';
import arrowUp from '../assets/arrowup.png';
import commentIcon from '../assets/comment.png';
import orange from '../assets/orange.png';
import purple from '../assets/purple.png';
import blue from '../assets/blue.png';
import { upvoteToggle, getAllPosts } from '../features/social/socialSlice';
import whitearrowup from '../assets/whitearrowup.png';

function DesktopRoadmap() {
  const posts = useSelector(state => state.social.posts);
  const categories = useSelector(state => state.social.categories);
  const dispatch = useDispatch();
  const user = localStorage.getItem('user');
  const username = localStorage.getItem('username');

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const handleUpvoteClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const feedback = posts.find(post => post._id === id);
    if (!feedback) return;

    const isUpvoted = feedback.upvotes.users.includes(user);
    dispatch(upvoteToggle({ toggle: !isUpvoted, id, username })).then(() => {
      dispatch(getAllPosts());
    });
  };

  const getCategoryLabel = categoryId => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'General';
  };

  return (
    <main className='bg-grey-white2 px-10 pb-24 pt-14'>
      <nav className='mb-8 flex h-[7.063rem] items-center justify-between rounded-xl bg-blue px-8 py-7 text-white xl:mx-40'>
        <div>
          <Link className='mb-1 flex items-center gap-2' to='/'>
            <img src={whiteArrow} alt='back btn' />
            <p className='text-sm font-bold hover:underline'>Go Back</p>
          </Link>
          <h1 className='text-lg font-bold tracking-[-0.33px] md:text-2xl'>
            Roadmap
          </h1>
        </div>
        <Link
          to='/addfeedback'
          className='flex h-[2.75rem] w-[9.875rem] items-center justify-center rounded-xl bg-purple text-sm font-bold text-white hover:bg-hover-purple'
        >
          + Add Feedback
        </Link>
      </nav>

      <div className='flex gap-3 xl:mx-40 xl:gap-8'>
        <div className='w-1/3'>
          <h2 className='mb-1 text-sm font-bold tracking-[-0.19px] text-blue'>
            Planned (
            {
              posts.filter(
                request => request.status.toLowerCase() === 'planned'
              ).length
            }
            )
          </h2>
          <p className='mb-6 text-sm font-normal text-grey'>
            Ideas prioritized for research
          </p>
          {posts
            .filter(request => request.status.toLowerCase() === 'planned')
            .map(feedback => (
              <Link to={`/feedback/${feedback._id}`} key={uuidv4()}>
                <div
                  className={`mb-4 flex h-[15.688rem] flex-col items-start justify-between rounded-xl border-t-[0.375rem] border-orange bg-white p-5 pb-6`}
                >
                  <div className='mb-[0.875rem] flex items-center gap-2'>
                    <img className='h-2 w-2' src={orange} alt='orange oval' />
                    <p className='px13 text-grey'>Planned</p>
                  </div>
                  <h2 className='px13 mb-2 cursor-pointer font-bold tracking-[-0.18px] text-blue hover:text-strong-blue'>
                    {feedback.title}
                  </h2>
                  <p className='px13 mb-6 h-[2.375rem] overflow-hidden font-normal text-grey'>
                    {feedback.description}
                  </p>
                  <div className='mb-4 flex h-[1.875rem] w-[6.938rem] items-center justify-center rounded-xl bg-grey-white text-sm'>
                    <p className='px13 font-semibold text-strong-blue'>
                      {getCategoryLabel(feedback.category)}
                    </p>
                  </div>
                  <div
                    onClick={e => handleUpvoteClick(e, feedback._id)}
                    className='flex w-full justify-between'
                  >
                    <button
                      className={`flex h-[2rem] w-[4.313rem] items-center gap-2 rounded-xl ${feedback.upvotes.users.includes(user) ? 'bg-strong-blue text-white hover:bg-hover-blue' : 'bg-grey-white hover:bg-hover-blue'}`}
                    >
                      <img
                        className='ml-4 h-1 w-2'
                        src={
                          feedback.upvotes.users.includes(user)
                            ? whitearrowup
                            : arrowUp
                        }
                        alt='arrowup'
                      />
                      <p
                        className={`px13 ml-2 tracking-[-0.18px] ${feedback.upvotes.users.includes(user) ? 'font-bold text-white' : 'font-bold text-blue'}`}
                      >
                        {feedback.upvotes.totalUpvotes}
                      </p>
                    </button>
                    <button className='flex items-center gap-2'>
                      <img
                        className='h-4 w-5'
                        src={commentIcon}
                        alt='comments'
                      />
                      <p className='px13 font-bold tracking-[-0.18px] text-blue'>
                        {feedback.comments ? feedback.comments.length : 0}
                      </p>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        <div className='w-1/3'>
          <h2 className='mb-1 text-sm font-bold tracking-[-0.19px] text-blue'>
            In Progress (
            {
              posts.filter(
                request => request.status.toLowerCase() === 'in-progress'
              ).length
            }
            )
          </h2>
          <p className='mb-6 text-sm font-normal text-grey'>
            Ideas being actively worked on
          </p>
          {posts
            .filter(request => request.status.toLowerCase() === 'in-progress')
            .map(feedback => (
              <Link to={`/feedback/${feedback._id}`} key={uuidv4()}>
                <div
                  className={`mb-4 flex h-[15.688rem] flex-col items-start justify-between rounded-xl border-t-[0.375rem] border-purple bg-white p-5 pb-6`}
                >
                  <div className='mb-4 flex items-center gap-2'>
                    <img className='h-2 w-2' src={purple} alt='purple oval' />
                    <p className='px13'>Progress</p>
                  </div>
                  <h2 className='px13 mb-2 cursor-pointer font-bold tracking-[-0.18px] text-blue hover:text-strong-blue'>
                    {feedback.title}
                  </h2>
                  <p className='px13 mb-6 h-[2.375rem] overflow-hidden font-normal text-grey'>
                    {feedback.description}
                  </p>
                  <div className='mb-4 flex h-[1.875rem] w-[6.938rem] items-center justify-center rounded-xl bg-grey-white text-sm'>
                    <p className='px13 font-semibold text-strong-blue'>
                      {getCategoryLabel(feedback.category)}
                    </p>
                  </div>
                  <div
                    onClick={e => handleUpvoteClick(e, feedback._id)}
                    className='flex w-full justify-between'
                  >
                    <button
                      className={`flex h-[2rem] w-[4.313rem] items-center gap-2 rounded-xl ${feedback.upvotes.users.includes(user) ? 'bg-strong-blue text-white hover:bg-hover-blue' : 'bg-grey-white hover:bg-hover-blue'}`}
                    >
                      <img
                        className='ml-4 h-1 w-2'
                        src={
                          feedback.upvotes.users.includes(user)
                            ? whitearrowup
                            : arrowUp
                        }
                        alt='arrowup'
                      />
                      <p
                        className={`px13 ml-2 tracking-[-0.18px] ${feedback.upvotes.users.includes(user) ? 'font-bold text-white' : 'font-bold text-blue'}`}
                      >
                        {feedback.upvotes.totalUpvotes}
                      </p>
                    </button>
                    <button className='flex items-center gap-2'>
                      <img
                        className='h-4 w-5'
                        src={commentIcon}
                        alt='comments'
                      />
                      <p className='px13 font-bold tracking-[-0.18px] text-blue'>
                        {feedback.comments ? feedback.comments.length : 0}
                      </p>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        <div className='w-1/3'>
          <h2 className='mb-1 text-sm font-bold tracking-[-0.19px] text-blue'>
            Live (
            {
              posts.filter(request => request.status.toLowerCase() === 'live')
                .length
            }
            )
          </h2>
          <p className='mb-6 text-sm font-normal text-grey'>
            Ideas currently implemented
          </p>
          {posts
            .filter(request => request.status.toLowerCase() === 'live')
            .map(feedback => (
              <Link to={`/feedback/${feedback._id}`} key={uuidv4()}>
                <div
                  className={`mb-4 flex h-[15.688rem] flex-col items-start justify-between rounded-xl border-t-[0.375rem] border-light-blue bg-white p-5 pb-6`}
                >
                  <div className='mb-4 flex items-center gap-2'>
                    <img className='h-2 w-2' src={blue} alt='blue oval' />
                    <p>Live</p>
                  </div>
                  <h2 className='px13 mb-2 cursor-pointer font-bold tracking-[-0.18px] text-blue hover:text-strong-blue'>
                    {feedback.title}
                  </h2>
                  <p className='px13 mb-6 h-[2.375rem] overflow-hidden font-normal text-grey'>
                    {feedback.description}
                  </p>
                  <div className='mb-4 flex h-[1.875rem] w-[6.938rem] items-center justify-center rounded-xl bg-grey-white text-sm'>
                    <p className='px13 font-semibold text-strong-blue'>
                      {getCategoryLabel(feedback.category)}
                    </p>
                  </div>
                  <div
                    onClick={e => handleUpvoteClick(e, feedback._id)}
                    className='flex w-full justify-between'
                  >
                    <button
                      className={`flex h-[2rem] w-[4.313rem] items-center gap-2 rounded-xl ${feedback.upvotes.users.includes(user) ? 'bg-strong-blue text-white hover:bg-hover-blue' : 'bg-grey-white hover:bg-hover-blue'}`}
                    >
                      <img
                        className='ml-4 h-1 w-2'
                        src={
                          feedback.upvotes.users.includes(user)
                            ? whitearrowup
                            : arrowUp
                        }
                        alt='arrowup'
                      />
                      <p
                        className={`px13 ml-2 tracking-[-0.18px] ${feedback.upvotes.users.includes(user) ? 'font-bold text-white' : 'font-bold text-blue'}`}
                      >
                        {feedback.upvotes.totalUpvotes}
                      </p>
                    </button>
                    <button className='flex items-center gap-2'>
                      <img
                        className='h-4 w-5'
                        src={commentIcon}
                        alt='comments'
                      />
                      <p className='px13 font-bold tracking-[-0.18px] text-blue'>
                        {feedback.comments ? feedback.comments.length : 0}
                      </p>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
}

export default DesktopRoadmap;
