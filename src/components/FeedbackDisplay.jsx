import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import arrowup from "../assets/arrowup.png";
import comment from "../assets/comment.png";
import NoFeedback from './NoFeedback';

function FeedbackDisplay({ toggleView, setToggleView, selectedFeedback, setSelectedFeedback }) {
  const feedback = useSelector((state) => state.state.data.productRequests);
  const sortValue = useSelector((state) => state.state.sortBy);
  const filterValue = useSelector((state) => state.state.filterBy);
  const productRequestsCopy = [...feedback];
  const [filteredAndSortedRequests, setFilteredAndSortedRequests] = useState([]);

  const handleListClick = (id) => {
    setSelectedFeedback(id);
    setToggleView(!toggleView);
  };

  useEffect(() => {
    let filteredAndSortedRequestsCopy = [...productRequestsCopy];

    if (filterValue !== "ALL") {
      filteredAndSortedRequestsCopy = filteredAndSortedRequestsCopy.filter(request => request.category.toLowerCase() === filterValue.toLowerCase());
    }

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
  }, [filterValue, sortValue]);

  return (
    <main className='bg-grey-white py-8 min-h-full'>
      {filteredAndSortedRequests.map((value) => (
        <div onClick={(e) => handleListClick(value.id)} className='bg-white mx-6 mb-4 rounded-xl p-6 md:mx-10 md:flex md:flex-row-reverse md:justify-between' key={value.id}>
          <button className='hidden absolute items-center gap-1 md:flex md:relative'>
            <img className='h-4 w-5' src={comment} alt='comments' />
            <p>{value.comments ? value.comments.length : 0}</p>
          </button>
          <div className='md:flex md:flex-row-reverse md:gap-10'>
            <div>
              <p className='text-sm font-bold text-blue mb-2'>{value.title}</p>
              <p className='text-grey text-sm font-normal mb-2'>{value.description}</p>
              <div className='items-center justify-center bg-grey-white py-2 px-4 rounded-xl text-sm inline-block mb-4'>
                <p className='text-strong-blue font-semibold'>{value.category[0].toLocaleUpperCase() + value.category.substr(1)}</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='flex justify-between'>
                <button className='flex bg-grey-white items-center gap-2 py-2 px-3 rounded-xl md:flex-col md:h-12 md:w-10 md:p-2'>
                  <img className='w-2 h-1' src={arrowup} alt='arrowup' />
                  <p className='text-sm text-blue font-bold'>{value.upvotes}</p>
                </button>
              </div>
              <button className='flex items-center gap-1 md:hidden'>
                <img className='h-4 w-5' src={comment} alt='comments' />
                <p>{value.comments ? value.comments.length : 0}</p>
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