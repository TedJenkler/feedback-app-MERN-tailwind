import React, { useEffect } from 'react';
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
      <nav className='flex justify-between bg-blue text-white px-8 py-7 items-center h-[7.063rem] rounded-xl mb-8 xl:mx-40'>
        <div>
          <Link className='mb-1 flex items-center gap-2' to="/">
            <img src={whiteArrow} alt='back btn' />
            <p className='text-sm font-bold hover:underline'>Go Back</p>
          </Link>
          <h1 className='text-lg font-bold md:text-2xl tracking-[-0.33px]'>Roadmap</h1>
        </div>
        <Link to="/addfeedback" className='flex items-center justify-center bg-purple text-sm font-bold text-white rounded-xl w-[9.875rem] h-[2.75rem] hover:bg-hover-purple'>+ Add Feedback</Link>
      </nav>

      <div className='flex gap-3 xl:mx-40 xl:gap-8'>
        <div className='w-1/3'>
          <h2 className='text-blue text-sm font-bold mb-1 tracking-[-0.19px]'>
            Planned ({posts.filter(request => request.status.toLowerCase() === "planned").length})
          </h2>
          <p className='text-sm text-grey font-normal mb-6'>Ideas prioritized for research</p>
          {posts.filter(request => request.status.toLowerCase() === "planned").map((feedback) => (
            <Link to={`/feedback/${feedback._id}`} key={uuidv4()}>
              <div className={`flex flex-col bg-white mb-4 p-5 pb-6 rounded-xl border-t-[0.375rem] border-orange justify-between items-start h-[15.688rem]`}>
                <div className='flex items-center gap-2 mb-[0.875rem]'>
                  <img className='h-2 w-2' src={orange} alt="orange oval" />
                  <p className='px13 text-grey'>Planned</p>
                </div>
                <h2 className='font-bold text-blue mb-2 hover:text-strong-blue cursor-pointer px13 tracking-[-0.18px]'>{feedback.title}</h2>
                <p className='text-grey h-[2.375rem] overflow-hidden px13 font-normal mb-6'>{feedback.description}</p>
                <div className='flex items-center justify-center bg-grey-white h-[1.875rem] w-[6.938rem] rounded-xl text-sm mb-4'>
                  <p className='text-strong-blue font-semibold px13'>{getCategoryLabel(feedback.category)}</p>
                </div>
                <div onClick={(e) => handleUpvoteClick(e, feedback._id)} className='flex justify-between w-full'>
                  <button className={`flex items-center gap-2 w-[4.313rem] h-[2rem] rounded-xl ${feedback.upvotes.users.includes(user) ? 'bg-strong-blue text-white hover:bg-hover-blue' : 'bg-grey-white hover:bg-hover-blue'}`}>
                    <img className='w-2 h-1 ml-4' src={feedback.upvotes.users.includes(user) ? whitearrowup : arrowUp} alt='arrowup' />
                    <p className={`px13 tracking-[-0.18px] ml-2 ${feedback.upvotes.users.includes(user) ? 'text-white font-bold' : 'text-blue font-bold'}`}>{feedback.upvotes.totalUpvotes}</p>
                  </button>
                  <button className='flex items-center gap-2'>
                    <img className='h-4 w-5' src={commentIcon} alt='comments' />
                    <p className='px13 tracking-[-0.18px] text-blue font-bold'>{feedback.comments ? feedback.comments.length : 0}</p>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className='w-1/3'>
          <h2 className='text-blue text-sm tracking-[-0.19px] font-bold mb-1'>
            In Progress ({posts.filter(request => request.status.toLowerCase() === "in-progress").length})
          </h2>
          <p className='text-sm text-grey font-normal mb-6'>Ideas being actively worked on</p>
          {posts.filter(request => request.status.toLowerCase() === "in-progress").map((feedback) => (
            <Link to={`/feedback/${feedback._id}`} key={uuidv4()}>
              <div className={`flex flex-col bg-white mb-4 p-5 pb-6 rounded-xl border-t-[0.375rem] border-purple justify-between items-start h-[15.688rem]`}>
                <div className='flex items-center gap-2 mb-4'>
                  <img className='h-2 w-2' src={purple} alt="purple oval" />
                  <p className='px13'>Progress</p>
                </div>
                <h2 className='px13 tracking-[-0.18px] font-bold text-blue mb-2 hover:text-strong-blue cursor-pointer'>{feedback.title}</h2>
                <p className='text-grey px13 h-[2.375rem] overflow-hidden font-normal mb-6'>{feedback.description}</p>
                <div className='flex items-center justify-center bg-grey-white h-[1.875rem] w-[6.938rem] rounded-xl text-sm mb-4'>
                  <p className='px13 text-strong-blue font-semibold'>{getCategoryLabel(feedback.category)}</p>
                </div>
                <div onClick={(e) => handleUpvoteClick(e, feedback._id)} className='flex justify-between w-full'>
                  <button className={`flex items-center gap-2 w-[4.313rem] h-[2rem] rounded-xl ${feedback.upvotes.users.includes(user) ? 'bg-strong-blue text-white hover:bg-hover-blue' : 'bg-grey-white hover:bg-hover-blue'}`}>
                    <img className='w-2 h-1 ml-4' src={feedback.upvotes.users.includes(user) ? whitearrowup : arrowUp} alt='arrowup' />
                    <p className={`px13 tracking-[-0.18px] ml-2 ${feedback.upvotes.users.includes(user) ? 'text-white font-bold' : 'text-blue font-bold'}`}>{feedback.upvotes.totalUpvotes}</p>
                  </button>
                  <button className='flex items-center gap-2'>
                    <img className='h-4 w-5' src={commentIcon} alt='comments' />
                    <p className='px13 tracking-[-0.18px] text-blue font-bold'>{feedback.comments ? feedback.comments.length : 0}</p>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className='w-1/3'>
          <h2 className='text-blue text-sm tracking-[-0.19px] font-bold mb-1'>
            Live ({posts.filter(request => request.status.toLowerCase() === "live").length})
          </h2>
          <p className='text-sm text-grey font-normal mb-6'>Ideas currently implemented</p>
          {posts.filter(request => request.status.toLowerCase() === "live").map((feedback) => (
            <Link to={`/feedback/${feedback._id}`} key={uuidv4()}>
              <div className={`flex flex-col items-start bg-white mb-4 p-5 pb-6 rounded-xl border-t-[0.375rem] border-light-blue h-[15.688rem] justify-between`}>
                <div className='flex items-center gap-2 mb-4'>
                  <img className='h-2 w-2' src={blue} alt="blue oval" />
                  <p>Live</p>
                </div>
                <h2 className='px13 tracking-[-0.18px] font-bold text-blue mb-2 hover:text-strong-blue cursor-pointer'>{feedback.title}</h2>
                <p className='text-grey px13 font-normal h-[2.375rem] overflow-hidden mb-6'>{feedback.description}</p>
                <div className='flex items-center justify-center bg-grey-white h-[1.875rem] w-[6.938rem] rounded-xl text-sm mb-4'>
                  <p className='px13 text-strong-blue font-semibold'>{getCategoryLabel(feedback.category)}</p>
                </div>
                <div onClick={(e) => handleUpvoteClick(e, feedback._id)} className='flex justify-between w-full'>
                  <button className={`flex items-center gap-2 w-[4.313rem] h-[2rem] rounded-xl ${feedback.upvotes.users.includes(user) ? 'bg-strong-blue text-white hover:bg-hover-blue' : 'bg-grey-white hover:bg-hover-blue'}`}>
                    <img className='w-2 h-1 ml-4' src={feedback.upvotes.users.includes(user) ? whitearrowup : arrowUp} alt='arrowup' />
                    <p className={`px13 tracking-[-0.18px] ml-2 ${feedback.upvotes.users.includes(user) ? 'text-white font-bold' : 'text-blue font-bold'}`}>{feedback.upvotes.totalUpvotes}</p>
                  </button>
                  <button className='flex items-center gap-2'>
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