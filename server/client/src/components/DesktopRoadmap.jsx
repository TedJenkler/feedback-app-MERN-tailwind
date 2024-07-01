import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import whiteArrow from "../assets/whitearrow.png";
import arrowUp from "../assets/arrowup.png";
import commentIcon from "../assets/comment.png";
import orange from "../assets/orange.png";
import purple from "../assets/purple.png";
import blue from "../assets/blue.png";
import { upvoteToggle, getAllPosts } from '../features/social/socialSlice';
import whitearrowup from "../assets/whitearrowup.png";

function DesktopRoadmap() {
  const posts = useSelector((state) => state.social.posts);
  const categories = useSelector((state) => state.social.categories);
  const upvotes = useSelector((state) => state.social.upvotes);
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

  const getCategoryLabel = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : "General";
  };

  return (
    <main className='bg-grey-white2 px-10 pt-14 pb-24'>
      <nav className='flex justify-between bg-blue text-white p-6 items-center rounded-xl mb-8 xl:mx-40'>
        <div>
          <Link className='mb-1 flex items-center gap-2' to="/">
            <img src={whiteArrow} alt='back btn' />
            <p className='text-sm font-bold hover:underline'>Go Back</p>
          </Link>
          <h1 className='text-lg font-bold md:text-2xl tracking-[-0.33px]'>Roadmap</h1>
        </div>
        <Link to="/addfeedback" className='bg-purple text-sm font-bold text-white rounded-xl py-2 px-4 hover:bg-hover-purple'>+ Add Feedback</Link>
      </nav>

      <div className='flex gap-3 xl:mx-40 xl:gap-8'>
        <div className='w-1/3'>
          <h2 className='text-blue text-sm font-bold mb-1 tracking-[-0.19px]'>Planned ({posts.filter(request => request.status === "planned").length})</h2>
          <p className='text-sm text-grey font-normal mb-6'>Ideas prioritized for research</p>
          {posts.filter(request => request.status === "planned").map((feedback) => (
            <Link to={`/feedback/${feedback._id}`} key={uuidv4()}>
              <div className='flex flex-col bg-white mb-6 p-6 rounded-xl border-t-8 border-orange h-72 justify-between items-start'>
                <div className='flex items-center gap-2 mb-4'><img className='h-2 w-2' src={orange} alt="orange oval" /><p className='px13 text-grey'>Planned</p></div>
                <h2 className='font-bold text-blue mb-2 hover:text-strong-blue cursor-pointer px13 tracking-[-0.18px]'>{feedback.title}</h2>
                <p className='text-grey px13 font-normal mb-2'>{feedback.description}</p>
                <div className='items-center justify-center bg-grey-white py-1 px-4 rounded-xl text-sm inline-block mb-4'>
                  <p className='text-strong-blue font-semibold px13'>{getCategoryLabel(feedback.category)}</p>
                </div>
                <div onClick={(e) => handleUpvoteClick(e, feedback._id)} className='flex justify-between w-full'>
                  <button className={feedback.upvotes.users.includes(user) ? 'flex bg-strong-blue text-white items-center gap-2 py-2 px-3 rounded-xl hover:bg-hover-blue' : 'flex bg-grey-white items-center gap-2 py-2 px-3 rounded-xl hover:bg-hover-blue'}>
                    <img className='w-2 h-1' src={feedback.upvotes.users.includes(user) ? whitearrowup : arrowUp} alt='arrowup' />
                    <p className={feedback.upvotes.users.includes(user) ? 'px13 tracking-[-0.18px] text-white font-bold' : 'px13 tracking-[-0.18px] text-blue font-bold'}>{feedback.upvotes.totalUpvotes}</p>
                  </button>
                  <button className='flex items-center gap-1'>
                    <img className='h-4 w-5' src={commentIcon} alt='comments' />
                    <p className='px13 tracking-[-0.18px] text-blue font-bold'>{feedback.comments ? feedback.comments.length : 0}</p>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className='w-1/3'>
          <h2 className='text-blue text-sm tracking-[-0.19px] font-bold mb-1'>In Progress ({posts.filter(request => request.status === "in-progress").length})</h2>
          <p className='text-sm text-grey font-normal mb-6'>Ideas being actively worked on</p>
          {posts.filter(request => request.status === "in-progress").map((feedback) => (
            <Link to={`/feedback/${feedback._id}`} key={uuidv4()}>
              <div className='flex flex-col bg-white mb-6 p-6 rounded-xl border-t-8 border-purple h-72 justify-between items-start'>
                <div className='flex items-center gap-2 mb-4'><img className='h-2 w-2' src={purple} alt="purple oval" /><p className='px13'>Progress</p></div>
                <h2 className='px13 tracking-[-0.18px] font-bold text-blue mb-2 hover:text-strong-blue cursor-pointer'>{feedback.title}</h2>
                <p className='text-grey px13 font-normal mb-2'>{feedback.description}</p>
                <div className='items-center justify-center bg-grey-white py-1 px-4 rounded-xl text-sm inline-block mb-4'>
                  <p className='px13 text-strong-blue font-semibold'>{getCategoryLabel(feedback.category)}</p>
                </div>
                <div onClick={(e) => handleUpvoteClick(e, feedback._id)} className='flex justify-between w-full'>
                  <button className={feedback.upvotes.users.includes(user) ? 'flex bg-strong-blue text-white items-center gap-2 py-2 px-3 rounded-xl hover:bg-hover-blue' : 'flex bg-grey-white items-center gap-2 py-2 px-3 rounded-xl hover:bg-hover-blue'}>
                    <img className='w-2 h-1' src={feedback.upvotes.users.includes(user) ? whitearrowup : arrowUp} alt='arrowup' />
                    <p className={feedback.upvotes.users.includes(user) ? 'px13 tracking-[-0.18px] text-white font-bold' : 'px13 tracking-[-0.18px] text-blue font-bold'}>{feedback.upvotes.totalUpvotes}</p>
                  </button>
                  <button className='flex items-center gap-1'>
                    <img className='h-4 w-5' src={commentIcon} alt='comments' />
                    <p className='px13 tracking-[-0.18px] text-blue font-bold'>{feedback.comments ? feedback.comments.length : 0}</p>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className='w-1/3'>
          <h2 className='text-blue text-sm tracking-[-0.19px] font-bold mb-1'>Live ({posts.filter(request => request.status === "live").length})</h2>
          <p className='text-sm text-grey font-normal mb-6'>Ideas currently implemented</p>
          {posts.filter(request => request.status === "live").map((feedback) => (
            <Link to={`/feedback/${feedback._id}`} key={uuidv4()}>
              <div className='flex flex-col  items-start bg-white mb-6 p-6 rounded-xl border-t-8 border-light-blue h-72 justify-between'>
                <div className='flex items-center gap-2 mb-4'><img className='h-2 w-2' src={blue} alt="blue oval" /><p>Live</p></div>
                <h2 className='px13 tracking-[-0.18px] font-bold text-blue mb-2 hover:text-strong-blue cursor-pointer'>{feedback.title}</h2>
                <p className='text-grey px13 font-normal mb-2'>{feedback.description}</p>
                <div className='items-center justify-center bg-grey-white py-1 px-4 rounded-xl text-sm inline-block mb-4'>
                  <p className='px13 text-strong-blue font-semibold'>{getCategoryLabel(feedback.category)}</p>
                </div>
                <div onClick={(e) => handleUpvoteClick(e, feedback._id)} className='flex justify-between w-full'>
                  <button className={feedback.upvotes.users.includes(user) ? 'flex bg-strong-blue text-white items-center gap-2 py-2 px-3 rounded-xl hover:bg-hover-blue' : 'flex bg-grey-white items-center gap-2 py-2 px-3 rounded-xl hover:bg-hover-blue'}>
                    <img className='w-2 h-1' src={feedback.upvotes.users.includes(user) ? whitearrowup : arrowUp} alt='arrowup' />
                    <p className={feedback.upvotes.users.includes(user) ? 'px13 tracking-[-0.18px] text-white font-bold' : 'px13 tracking-[-0.18px] text-blue font-bold'}>{feedback.upvotes.totalUpvotes}</p>
                  </button>
                  <button className='flex items-center gap-1'>
                    <img className='h-4 w-5' src={commentIcon} alt='comments' />
                    <p className='px13 tracking-[-0.18px] text-blue font-bold'>{feedback.comments ? feedback.comments.length : 0}</p>
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