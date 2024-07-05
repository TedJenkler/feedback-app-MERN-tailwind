import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import arrowup from "../assets/arrowup.png";
import comment from "../assets/comment.png";
import NoFeedback from './NoFeedback';
import whitearrowup from "../assets/whitearrowup.png";
import { getAllPosts, upvoteToggle, getAllCategories } from '../features/social/socialSlice';

function FeedbackDisplay() {
  const posts = useSelector((state) => state.social.posts);
  const categories = useSelector((state) => state.social.categories);
  const navigate = useNavigate();
  const sortValue = useSelector((state) => state.state.sortBy);
  const filterValue = useSelector((state) => state.state.filterBy);
  const dispatch = useDispatch();

  const user = localStorage.getItem('user')
  const username = localStorage.getItem('username')

  const [filteredAndSortedRequests, setFilteredAndSortedRequests] = useState([]);

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    if (posts) {
        let filteredAndSortedRequestsCopy = [...posts];

        if (filterValue !== "ALL") {
          filteredAndSortedRequestsCopy = filteredAndSortedRequestsCopy.filter(request => {
              return getCategoryNameById(request.category) === filterValue;
          });
      }

        if (sortValue === "Most Upvotes") {
            filteredAndSortedRequestsCopy.sort((a, b) => parseInt(b.upvotes?.totalUpvotes?.$numberInt || b.upvotes?.totalUpvotes || 0) - parseInt(a.upvotes?.totalUpvotes?.$numberInt || a.upvotes?.totalUpvotes || 0));
        } else if (sortValue === "Least Upvotes") {
            filteredAndSortedRequestsCopy.sort((a, b) => parseInt(a.upvotes?.totalUpvotes?.$numberInt || a.upvotes?.totalUpvotes || 0) - parseInt(b.upvotes?.totalUpvotes?.$numberInt || b.upvotes?.totalUpvotes || 0));
        } else if (sortValue === "Most Comments") {
            filteredAndSortedRequestsCopy.sort((a, b) => b.comments.length - a.comments.length);
        } else if (sortValue === "Least Comments") {
            filteredAndSortedRequestsCopy.sort((a, b) => a.comments.length - b.comments.length);
        }

        setFilteredAndSortedRequests(filteredAndSortedRequestsCopy);
    }
}, [posts, filterValue, sortValue]);

  const handleUpvote = (value, e) => {
    if (value.upvotes.users.includes(user)) {
      dispatch(upvoteToggle({ toggle: false, id: value._id, username: username })).then(() => {
        dispatch(getAllPosts());
      });
    } else {
      dispatch(upvoteToggle({ toggle: true, id: value._id, username: username })).then(() => {
        dispatch(getAllPosts());
      });
    }
  };

  const getCategoryNameById = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : "Unknown";
  };

  const handleClick = (e, value) => {
    e.stopPropagation();
    handleUpvote(value);
  }

  return (
    <main className='bg-grey-white min-h-screen py-8 pb-28 md:pt-6 xl:pt-6 overflow-hidden w-screen"'>
      {filteredAndSortedRequests.map((value) => (
        <div key={value._id} onClick={() => {navigate("/feedback/" + value._id)}} className='bg-white mx-6 mb-4 rounded-xl p-6 md:mx-10 md:flex md:flex-row-reverse md:justify-between md:px-8 md:py-7 xl:mx-0 xl:ml-8'>
          <button className='hidden absolute items-center gap-1 md:flex md:relative'>
            <img className='h-4 w-5' src={comment} alt='comments' />
            <p>{value.comments.length}</p>
          </button>
          <div className='md:flex md:flex-row-reverse md:gap-10'>
            <div>
              <p className='px13 font-bold tracking-[-0.18px] text-blue mb-2 md:text-lg'>{value.title}</p>
              <p className='text-grey px13 font-normal mb-2 md:text-base'>{value.description}</p>
              <div className='flex items-center justify-center bg-grey-white w-[6.938rem] h-[1.875rem] rounded-xl text-sm mb-4'>
                <p className='text-strong-blue px13 font-semibold'>{getCategoryNameById(value.category)}</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='flex justify-between'>
                <button onClick={(e) => handleClick(e, value)} className={value.upvotes.users.includes(user) ? 'flex bg-strong-blue text-white items-center gap-2 w-[4.313rem] h-[2rem] pl-4 rounded-xl md:flex-col md:h-12 md:w-10 md:p-2 hover:bg-hover-blue' : 'flex bg-grey-white pl-4 text-blue items-center gap-2 w-[4.313rem] h-[2rem] rounded-xl md:flex-col md:h-12 md:w-10 md:p-2 hover:bg-hover-blue'}>
                  <img className='w-2 h-1' src={value.upvotes.users.includes(user) ? whitearrowup : arrowup} alt='arrowup' />
                  <p className={value.upvotes.users.includes(user) ? 'px13 tracking-[-0.18px] text-white font-bold ml-2 md:ml-0' : 'px13 tracking-[-0.18px] text-blue font-bold ml-2 md:ml-0'}>{value.upvotes.totalUpvotes}</p>
                </button>
              </div>
              <button className='flex items-center gap-2 md:hidden'>
                <img className='h-4 w-[1.125rem]' src={comment} alt='comments' />
                <p className='px13 tracking-[-0.18px] md:text-base font-bold'>{value.comments.length}</p>
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