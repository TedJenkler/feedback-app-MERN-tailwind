import React from 'react'
import { useSelector } from 'react-redux';

function LinkButton( {setSelectedRoadmap} ) {
    const state = useSelector((state) => state.state.data.productRequests)
    const plannedCount = state.reduce((acc, currentValue) => {
        if (currentValue.status === "planned") {
            return acc + 1;
        }
        return acc;
    }, 0);

    const inProgressCount = state.reduce((acc, currentValue) => {
        if (currentValue.status === "in-progress") {
            return acc + 1;
        }
        return acc;
    }, 0);

    const liveCount = state.reduce((acc, currentValue) => {
        if (currentValue.status === "live") {
            return acc + 1;
        }
        return acc;
    }, 0);
  return (
    <div className='flex items-center justify-between'>
        <button onClick={(e) => setSelectedRoadmap("planned")} className='py-4 w-1/3 border-b border-grey/25'>Planned ({plannedCount})</button>
        <button onClick={(e) => setSelectedRoadmap("in-progress")} className='py-4 w-1/3 border-b border-grey/25'>In-Progress ({inProgressCount})</button>
        <button onClick={(e) => setSelectedRoadmap("live")} className='py-4 w-1/3 border-b border-grey/25'>Live ({liveCount})</button>
    </div>
  )
}

export default LinkButton