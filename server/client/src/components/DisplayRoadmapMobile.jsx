import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import arrowup from "../assets/arrowup.png";
import comment from "../assets/comment.png";
import orange from "../assets/orange.png";
import purple from "../assets/purple.png";
import blue from "../assets/blue.png";
import whitearrowup from "../assets/whitearrowup.png";
import { getAllCategories, getAllPosts, upvoteToggle } from '../features/social/socialSlice';

function DisplayRoadmapMobile({ selectedRoadmap }) {
  const posts = useSelector((state) => state.social.posts);
  const categories = useSelector((state) => state.social.categories);
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
    const filteredRoadmap = posts.filter((request) => request.status.toLowerCase() === selectedRoadmap);
    setRoadmap(filteredRoadmap);
  }, [selectedRoadmap, posts]);

  const handleUpvote = (value, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (value.upvotes.users.includes(user)) {
      dispatch(upvoteToggle({ toggle: false, id: value._id, username })).then(() => {
        dispatch(getAllPosts());
      });
    } else {
      dispatch(upvoteToggle({ toggle: true, id: value._id, username })).then(() => {
        dispatch(getAllPosts());
      });
    }
  };

  const getCategoryLabel = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : "General";
  };

  return (
    <main className='xs:px-3 s:px-6 bg-grey-white2 min-h-screen p-6'>
      <h1 className='text-lg tracking-[-0.25px] text-blue font-bold mb-1'>
        {selectedRoadmap === "planned"
          ? `Planned (${roadmap.length})`
          : selectedRoadmap === "in-progress"
            ? `In Progress (${roadmap.length})`
            : `Live (${roadmap.length})`}
      </h1>
      {selectedRoadmap === "planned" && <p className='mb-6 px13 text-grey font-normal'>Ideas prioritized for research</p>}
      {selectedRoadmap === "in-progress" && <p className='mb-6 px13 text-grey font-normal'>Currently being developed</p>}
      {selectedRoadmap === "live" && <p className='mb-6 px13 text-grey font-normal'>Released features</p>}
      {roadmap.map((feedback) => (
        <div key={feedback._id} onClick={() => { navigate("/feedback/" + feedback._id) }} className={`bg-white mb-4 p-6 pt-4 rounded-xl border-t-[0.375rem] h-[14.563rem] border-${selectedRoadmap === "planned" ? "orange" : selectedRoadmap === "in-progress" ? "purple" : "light-blue"}`}>
          <div className='flex items-center gap-2 mb-4'>
            <img className='h-2 w-2' src={selectedRoadmap === "planned" ? orange : selectedRoadmap === "in-progress" ? purple : blue} alt={selectedRoadmap === "planned" ? "orange oval" : selectedRoadmap === "in-progress" ? "purple oval" : "blue oval"} />
            <p className='px13 font-normal text-grey'>{selectedRoadmap === "planned" ? "Planned" : selectedRoadmap === "in-progress" ? "In Progress" : "Live"}</p>
          </div>
          <h2 className='px13 tracking-[-0.18px] font-bold text-blue mb-2'>{feedback.title}</h2>
          <p className='text-grey px13 font-normal mb-2'>{feedback.description}</p>
          <div className='flex items-center justify-center bg-grey-white w-[6.938rem] h-[1.875rem] rounded-[0.625rem] px13 mb-4'>
            <p className='text-strong-blue font-semibold'>{getCategoryLabel(feedback.category)}</p>
          </div>
          <div className='flex justify-between'>
            <button onClick={(e) => handleUpvote(feedback, e)} className={feedback.upvotes.users.includes(user) ? 'flex bg-strong-blue text-white items-center gap-2 w-[4.313rem] h-8 rounded-xl' : 'flex bg-grey-white items-center gap-2 w-[4.313rem] h-8 rounded-xl'}>
              <img className='w-2 h-1 ml-4' src={feedback.upvotes.users.includes(user) ? whitearrowup : arrowup} alt='arrowup' />
              <p className={feedback.upvotes.users.includes(user) ? 'px13 tracking-[-0.18px] text-white font-bold ml-2' : 'px13 ml-2 tracking-[-0.18px] text-blue font-bold'}>{feedback.upvotes.totalUpvotes}</p>
            </button>
            <button className='flex items-center gap-2'>
              <img className='h-4 w-5' src={comment} alt='comments' />
              <p className='px13 tracking-[-0.18px] text-blue font-bold'>{feedback.comments ? feedback.comments.length : 0}</p>
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}

export default DisplayRoadmapMobile;