import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import arrowup from "../assets/arrowup.png";
import comment from "../assets/comment.png";
import NoFeedback from './NoFeedback';
import { upvote } from '../features/state/stateSlice';
import whitearrowup from "../assets/whitearrowup.png";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function FeedbackDisplay({ setSelectedFeedback }) {
  const feedback = useSelector((state) => state.state.data.productRequests);
  const upvotes = useSelector((state) => state.state.isUpvoted);
  const sortValue = useSelector((state) => state.state.sortBy);
  const filterValue = useSelector((state) => state.state.filterBy);
  const productRequestsCopy = [...feedback];
  const [filteredAndSortedRequests, setFilteredAndSortedRequests] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use the navigate function from useNavigate

  // Function to handle upvoting
  const handleUpvote = (id) => {
    dispatch(upvote({ id }));
  };

  // Function to handle click on a feedback item
  const handleListClick = (id) => {
    setSelectedFeedback(id);
    navigate(`/feedback/${id}`); // Navigate to the selected feedback item
  };

  useEffect(() => {
    let filteredAndSortedRequestsCopy = [...productRequestsCopy];

    // Filter requests based on the selected category
    if (filterValue !== "ALL") {
      filteredAndSortedRequestsCopy = filteredAndSortedRequestsCopy.filter(request => request.category.toLowerCase() === filterValue.toLowerCase());
    }

    // Sort requests based on the selected sorting option
    if (sortValue === "Most Upvotes") {
      filteredAndSortedRequestsCopy.sort((a, b) => b.upvotes - a.upvotes);
    } else if (sortValue === "Least Upvotes") {
      filteredAndSortedRequestsCopy.sort((a, b) => a.upvotes - b.upvotes);
    } else if (sortValue === "Most Comments") {
      filteredAndSortedRequestsCopy.sort((a, b) => (b.comments ? b.comments.length : 0) - (a.comments ? a.comments.length : 0));
    } else if (sortValue === "Least Comments") {
      filteredAndSortedRequestsCopy.sort((a, b) => (a.comments ? a.comments.length : 0) - (b.comments ? b.comments.length : 0));
    }

    setFilteredAndSortedRequests(filteredAndSortedRequestsCopy);
  }, [feedback, filterValue, sortValue]);

  return (
    <main className='bg-grey-white py-8 min-h-full pb-28 xl:pr-0'>
      {filteredAndSortedRequests.map((value) => (
        <div onClick={() => handleListClick(value.id)} className='bg-white mx-6 mb-4 rounded-xl p-6 md:mx-10 md:flex md:flex-row-reverse md:justify-between md:px-8 md:py-7 xl:mr-40 xl:w-3/4 xl:ml-8' key={value.id}>
          <button className='hidden absolute items-center gap-1 md:flex md:relative'>
            <img className='h-4 w-5' src={comment} alt='comments' />
            <p>{value.comments ? value.comments.length : 0}</p>
          </button>
          <div className='md:flex md:flex-row-reverse md:gap-10'>
            <div>
              <p className='text-sm font-bold text-blue mb-2 md:text-lg'>{value.title}</p>
              <p className='text-grey text-sm font-normal mb-2 md:text-base'>{value.description}</p>
              <div className='items-center justify-center bg-grey-white py-1 px-4 rounded-xl text-sm inline-block mb-4'>
                <p className='text-strong-blue font-semibold'>{value.category[0].toLocaleUpperCase() + value.category.substr(1)}</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='flex justify-between'>
                <button onClick={(e) => { e.stopPropagation(); handleUpvote(value.id); }} className={upvotes.includes(value.id) ? 'flex bg-strong-blue text-white items-center gap-2 py-2 px-4 rounded-xl md:flex-col md:h-12 md:w-10 md:p-2 hover:bg-hover-blue' : 'flex bg-grey-white text-blue items-center gap-2 py-2 px-4 rounded-xl md:flex-col md:h-12 md:w-10 md:p-2 hover:bg-hover-blue'}>
                  <img className='w-2 h-1' src={upvotes.includes(value.id) ? whitearrowup : arrowup} alt='arrowup' />
                  <p className={upvotes.includes(value.id) ? 'text-sm text-white font-bold' : 'text-sm text-blue font-bold'}>{value.upvotes}</p>
                </button>
              </div>
              <button className='flex items-center gap-1 md:hidden'>
                <img className='h-4 w-5' src={comment} alt='comments' />
                <p className='md:text-base font-bold'>{value.comments ? value.comments.length : 0}</p>
              </button>
            </div>
          </div>
        </div>
      ))}
      {filteredAndSortedRequests.length === 0 && <main className='bg-grey-white pb-32 min-h-full'><NoFeedback /></main>}
    </main>
  );
}

export default FeedbackDisplay;
