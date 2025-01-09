import React from 'react';
import { useSelector } from 'react-redux';

function LinkButton({ selectedRoadmap, setSelectedRoadmap }) {
  const state = useSelector(state => state.social.posts);

  const plannedCount = state.reduce((acc, currentValue) => {
    if (currentValue.status.toLowerCase() === 'planned') {
      return acc + 1;
    }
    return acc;
  }, 0);

  const inProgressCount = state.reduce((acc, currentValue) => {
    if (currentValue.status.toLowerCase() === 'in-progress') {
      return acc + 1;
    }
    return acc;
  }, 0);

  const liveCount = state.reduce((acc, currentValue) => {
    if (currentValue.status.toLowerCase() === 'live') {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div className='flex items-center justify-between'>
      <button
        onClick={() => setSelectedRoadmap('planned')}
        className={
          selectedRoadmap === 'planned'
            ? 'px13 w-1/3 border-b-[4.5px] border-orange py-4 font-bold tracking-[-0.18px] text-blue'
            : 'px13 w-1/3 border-b border-grey/25 py-4 font-bold tracking-[-0.18px] text-blue/40'
        }
      >
        Planned ({plannedCount})
      </button>
      <button
        onClick={() => setSelectedRoadmap('in-progress')}
        className={
          selectedRoadmap === 'in-progress'
            ? 'px13 w-1/3 border-b-[4.5px] border-purple py-4 font-bold tracking-[-0.18px] text-blue'
            : 'px13 w-1/3 border-b border-grey/25 py-4 font-bold tracking-[-0.18px] text-blue/40'
        }
      >
        In-Progress ({inProgressCount})
      </button>
      <button
        onClick={() => setSelectedRoadmap('live')}
        className={
          selectedRoadmap === 'live'
            ? 'px13 w-1/3 border-b-[4.5px] border-light-blue py-4 font-bold tracking-[-0.18px] text-blue'
            : 'px13 w-1/3 border-b border-grey/25 py-4 font-bold tracking-[-0.18px] text-blue/40'
        }
      >
        Live ({liveCount})
      </button>
    </div>
  );
}

export default LinkButton;
