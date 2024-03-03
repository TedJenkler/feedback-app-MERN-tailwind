import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import arrowup from "../assets/arrowup.png";
import comment from "../assets/comment.png";
import orange from "../assets/orange.png";
import purple from "../assets/purple.png";
import blue from "../assets/blue.png";
import { v4 as uuidv4 } from 'uuid';
import { upvote } from '../features/state/stateSlice';
import whitearrowup from "../assets/whitearrowup.png";

function DisplayRoadmapMobile({ selectedRoadmap }) {
  const state = useSelector((state) => state.state.data.productRequests);
  const upvotes = useSelector((state) => state.state.isUpvoted);
  const dispatch = useDispatch();

  const [roadmap, setRoadmap] = useState([]);

  useEffect(() => {
    const filteredRoadmap = state.filter((request) => request.status === selectedRoadmap);
    setRoadmap(filteredRoadmap);
  }, [selectedRoadmap, state]);

  const handleUpvote = (id, e) => {
    e.preventDefault(); // Prevent the default link behavior
    e.stopPropagation(); // Stop event propagation to prevent link navigation
    dispatch(upvote({ id }));
  };

  return (
    <main className='bg-grey-white2 p-6'>
      <h1 className='text-xl text-blue font-bold mb-1'>
        {selectedRoadmap === "planned"
          ? `Planned (${roadmap.length})`
          : selectedRoadmap === "in-progress"
          ? `In Progress (${roadmap.length})`
          : `Live (${roadmap.length})`}
      </h1>
      {selectedRoadmap === "planned" && <p className='mb-6 text-sm text-grey font-normal'>Ideas prioritized for research</p>}
      {selectedRoadmap === "in-progress" && <p className='mb-6 text-sm text-grey font-normal'>Currently being developed</p>}
      {selectedRoadmap === "live" && <p className='mb-6 text-sm text-grey font-normal'>Released features</p>}
      {roadmap.map((feedback) => (
        <Link to={`/feedback/${feedback.id}`} key={uuidv4()}>
          <div className={`bg-white mb-6 p-6 rounded-xl border-t-8 border-${selectedRoadmap === "planned" ? "orange" : selectedRoadmap === "in-progress" ? "purple" : "light-blue"}`}>
            <div className='flex items-center gap-2 mb-4'>
              <img className='h-2 w-2' src={selectedRoadmap === "planned" ? orange : selectedRoadmap === "in-progress" ? purple : blue} alt={selectedRoadmap === "planned" ? "orange oval" : selectedRoadmap === "in-progress" ? "purple oval" : "blue oval"} />
              <p>{selectedRoadmap === "planned" ? "Planned" : selectedRoadmap === "in-progress" ? "Progress" : "Live"}</p>
            </div>
            <h2 className='text-sm font-bold text-blue mb-2'>{feedback.title}</h2>
            <p className='text-grey text-sm font-normal mb-2'>{feedback.description}</p>
            <div className='items-center justify-center bg-grey-white py-1 px-4 rounded-xl text-sm inline-block mb-4'>
              <p className='text-strong-blue font-semibold'>{feedback.category[0].toLocaleUpperCase() + feedback.category.substr(1)}</p>
            </div>
            <div className='flex justify-between'>
              <button onClick={(e) => handleUpvote(feedback.id, e)} className={upvotes.includes(feedback.id) ? 'flex bg-strong-blue text-white items-center gap-2 py-2 px-4 rounded-xl' : 'flex bg-grey-white items-center gap-2 py-2 px-4 rounded-xl'}>
                <img className='w-2 h-1' src={upvotes.includes(feedback.id) ? whitearrowup : arrowup} alt='arrowup' />
                <p className={upvotes.includes(feedback.id) ? 'text-sm text-white font-bold' : 'text-sm text-blue font-bold'}>{feedback.upvotes}</p>
              </button>
              <button className='flex items-center gap-1'>
                <img className='h-4 w-5' src={comment} alt='comments' />
                <p className='text-sm text-blue font-bold'>{feedback.comments ? feedback.comments.length : 0}</p>
              </button>
            </div>
          </div>
        </Link>
      ))}
    </main>
  );
}

export default DisplayRoadmapMobile;
