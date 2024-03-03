import React from 'react';
import { useSelector } from 'react-redux';

function LinkButton({ selectedRoadmap, setSelectedRoadmap }) {
    // Accessing product requests from Redux state
    const state = useSelector((state) => state.state.data.productRequests);

    // Counting the number of product requests in each roadmap status
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
            {/* Button for Planned roadmap */}
            <button
                onClick={(e) => setSelectedRoadmap("planned")}
                className={selectedRoadmap === "planned" ? 'py-4 w-1/3 border-b-4 border-orange' : 'py-4 w-1/3 border-b border-grey/25' }
            >
                Planned ({plannedCount})
            </button>
            {/* Button for In-Progress roadmap */}
            <button
                onClick={(e) => setSelectedRoadmap("in-progress")}
                className={selectedRoadmap === "in-progress" ? 'py-4 w-1/3 border-b-4 border-purple' : 'py-4 w-1/3 border-b border-grey/25' }
            >
                In-Progress ({inProgressCount})
            </button>
            {/* Button for Live roadmap */}
            <button
                onClick={(e) => setSelectedRoadmap("live")}
                className={selectedRoadmap === "live" ? 'py-4 w-1/3 border-b-4 border-light-blue' : 'py-4 w-1/3 border-b border-grey/25' }
            >
                Live ({liveCount})
            </button>
        </div>
    );
}

export default LinkButton;
