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
import { upvote } from '../features/state/stateSlice';
import whitearrowup from "../assets/whitearrowup.png";

function DesktopRoadmap() {
  // Selecting product requests and upvotes from Redux state
  const productRequests = useSelector((state) => state.state.data.productRequests);
  const upvotes = useSelector((state) => state.state.isUpvoted);

  // Redux dispatch
  const dispatch = useDispatch();

  // State to manage active upvote
  const [activeUpvote, setActiveUpvote] = useState();

  // Effect to dispatch upvote action when activeUpvote changes
  useEffect(() => {
    if (activeUpvote) {
      dispatch(upvote({ id: activeUpvote }));
    }
  }, [activeUpvote, dispatch]);

  // Handle upvote button click
  const handleUpvoteClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event propagation
    setActiveUpvote(id); // Set the active upvote
  };

  return (
    <main className='bg-grey-white2 px-10 pt-14 pb-24'>
      {/* Navigation */}
      <nav className='flex justify-between bg-blue text-white p-6 items-center rounded-xl mb-8 xl:mx-40'>
        <div>
          {/* Link to go back */}
          <Link className='mb-1 flex items-center gap-2' to="/">
            <img src={whiteArrow} alt='back btn' />
            <p className='text-sm font-bold'>Go Back</p>
          </Link>
          {/* Roadmap title */}
          <h1 className='text-lg font-bold md:text-2xl'>Roadmap</h1>
        </div>
        {/* Link to add feedback */}
        <Link to="/addfeedback" className='bg-purple text-sm font-bold text-white rounded-xl py-2 px-4 hover:bg-hover-purple'>+ Add Feedback</Link>
      </nav>

      <div className='flex gap-3 xl:mx-40'>
        {/* Render Planned Requests */}
        <div className='w-1/3'>
          <h2 className='text-blue text-sm font-bold mb-1'>Planned ({productRequests.filter(request => request.status === "planned").length})</h2>
          <p className='text-sm text-grey font-normal mb-6'>Ideas prioritized for research</p>
          {/* Map through planned requests */}
          {productRequests.filter(request => request.status === "planned").map((feedback) => (
            <Link to={`/feedback/${feedback.id}`} key={uuidv4()}>
              <div className='flex flex-col bg-white mb-6 p-6 rounded-xl border-t-8 border-orange h-72 justify-between items-start'>
                {/* Display status */}
                <div className='flex items-center gap-2 mb-4'><img className='h-2 w-2' src={orange} alt="orange oval" /><p>Planned</p></div>
                {/* Display feedback title */}
                <h2 className='text-sm font-bold text-blue mb-2 hover:text-strong-blue cursor-pointer'>{feedback.title}</h2>
                {/* Display feedback description */}
                <p className='text-grey text-sm font-normal mb-2'>{feedback.description}</p>
                {/* Display category */}
                <div className='items-center justify-center bg-grey-white py-1 px-4 rounded-xl text-sm inline-block mb-4'>
                  <p className='text-strong-blue font-semibold'>{feedback.category[0].toLocaleUpperCase() + feedback.category.substr(1)}</p>
                </div>
                {/* Upvote and comment buttons */}
                <div onClick={(e) => handleUpvoteClick(e, feedback.id)} className='flex justify-between w-full'>
                  <button className={upvotes.includes(feedback.id) ? 'flex bg-strong-blue text-white items-center gap-2 py-2 px-3 rounded-xl hover:bg-hover-blue' : 'flex bg-grey-white items-center gap-2 py-2 px-3 rounded-xl hover:bg-hover-blue'}>
                    <img className='w-2 h-1' src={upvotes.includes(feedback.id) ? whitearrowup : arrowUp} alt='arrowup' />
                    <p className={upvotes.includes(feedback.id) ? 'text-sm text-white font-bold' : 'text-sm text-blue font-bold' }>{feedback.upvotes}</p>
                  </button>
                  <button className='flex items-center gap-1'>
                    <img className='h-4 w-5' src={commentIcon} alt='comments' />
                    <p className='text-sm text-blue font-bold'>{feedback.comments ? feedback.comments.length : 0}</p>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Render In Progress Requests */}
        <div className='w-1/3'>
          <h2 className='text-blue text-sm font-bold mb-1'>In Progress ({productRequests.filter(request => request.status === "in-progress").length})</h2>
          <p className='text-sm text-grey font-normal mb-6'>Ideas being actively worked on</p>
          {/* Map through in-progress requests */}
          {productRequests.filter(request => request.status === "in-progress").map((feedback) => (
            <Link to={`/feedback/${feedback.id}`} key={uuidv4()}>
              <div className='flex flex-col bg-white mb-6 p-6 rounded-xl border-t-8 border-purple h-72 justify-between items-start'>
                {/* Display status */}
                <div className='flex items-center gap-2 mb-4'><img className='h-2 w-2' src={purple} alt="purple oval" /><p>Progress</p></div>
                {/* Display feedback title */}
                <h2 className='text-sm font-bold text-blue mb-2 hover:text-strong-blue cursor-pointer'>{feedback.title}</h2>
                {/* Display feedback description */}
                <p className='text-grey text-sm font-normal mb-2'>{feedback.description}</p>
                {/* Display category */}
                <div className='items-center justify-center bg-grey-white py-1 px-4 rounded-xl text-sm inline-block mb-4'>
                  <p className='text-strong-blue font-semibold'>{feedback.category[0].toLocaleUpperCase() + feedback.category.substr(1)}</p>
                </div>
                {/* Upvote and comment buttons */}
                <div onClick={(e) => handleUpvoteClick(e, feedback.id)} className='flex justify-between w-full'>
                  <button className={upvotes.includes(feedback.id) ? 'flex bg-strong-blue text-white items-center gap-2 py-2 px-3 rounded-xl hover:bg-hover-blue' : 'flex bg-grey-white items-center gap-2 py-2 px-3 rounded-xl hover:bg-hover-blue'}>
                    <img className='w-2 h-1' src={upvotes.includes(feedback.id) ? whitearrowup : arrowUp} alt='arrowup' />
                    <p className={upvotes.includes(feedback.id) ? 'text-sm text-white font-bold' : 'text-sm text-blue font-bold' }>{feedback.upvotes}</p>
                  </button>
                  <button className='flex items-center gap-1'>
                    <img className='h-4 w-5' src={commentIcon} alt='comments' />
                    <p className='text-sm text-blue font-bold'>{feedback.comments ? feedback.comments.length : 0}</p>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Render Live Requests */}
        <div className='w-1/3'>
          <h2 className='text-blue text-sm font-bold mb-1'>Live ({productRequests.filter(request => request.status === "live").length})</h2>
          <p className='text-sm text-grey font-normal mb-6'>Ideas currently implemented</p>
          {/* Map through live requests */}
          {productRequests.filter(request => request.status === "live").map((feedback) => (
            <Link to={`/feedback/${feedback.id}`} key={uuidv4()}>
              <div className='flex flex-col  items-start bg-white mb-6 p-6 rounded-xl border-t-8 border-light-blue h-72 justify-between'>
                {/* Display status */}
                <div className='flex items-center gap-2 mb-4'><img className='h-2 w-2' src={blue} alt="blue oval" /><p>Live</p></div>
                {/* Display feedback title */}
                <h2 className='text-sm font-bold text-blue mb-2 hover:text-strong-blue cursor-pointer'>{feedback.title}</h2>
                {/* Display feedback description */}
                <p className='text-grey text-sm font-normal mb-2'>{feedback.description}</p>
                {/* Display category */}
                <div className='items-center justify-center bg-grey-white py-1 px-4 rounded-xl text-sm inline-block mb-4'>
                  <p className='text-strong-blue font-semibold'>{feedback.category[0].toLocaleUpperCase() + feedback.category.substr(1)}</p>
                </div>
                {/* Upvote and comment buttons */}
                <div onClick={(e) => handleUpvoteClick(e, feedback.id)} className='flex justify-between w-full'>
                  <button className={upvotes.includes(feedback.id) ? 'flex bg-strong-blue text-white items-center gap-2 py-2 px-3 rounded-xl hover:bg-hover-blue' : 'flex bg-grey-white items-center gap-2 py-2 px-3 rounded-xl hover:bg-hover-blue'}>
                    <img className='w-2 h-1' src={upvotes.includes(feedback.id) ? whitearrowup : arrowUp} alt='arrowup' />
                    <p className={upvotes.includes(feedback.id) ? 'text-sm text-white font-bold' : 'text-sm text-blue font-bold' }>{feedback.upvotes}</p>
                  </button>
                  <button className='flex items-center gap-1'>
                    <img className='h-4 w-5' src={commentIcon} alt='comments' />
                    <p className='text-sm text-blue font-bold'>{feedback.comments ? feedback.comments.length : 0}</p>
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

