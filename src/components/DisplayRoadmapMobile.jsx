import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import arrowup from "../assets/arrowup.png";
import comment from "../assets/comment.png";
import orange from "../assets/orange.png"
import purple from "../assets/purple.png"
import blue from "../assets/blue.png"

function DisplayRoadmapMobile( {selectedRoadmap} ) {
  const state = useSelector((state) => state.state.data.productRequests)
  let copyOfState = [...state]
  const [roadmap, setRoadmap] = useState(copyOfState.filter(request => request.status === "planned"))
  const FilterRoadmapFunction = () => {
    if(selectedRoadmap === "planned"){
      setRoadmap(copyOfState.filter(request => request.status === "planned"))
    }
    else if(selectedRoadmap === "in-progress"){
      setRoadmap(copyOfState.filter(request => request.status === "in-progress"))
    }
    else if(selectedRoadmap === "live"){
      setRoadmap(copyOfState.filter(request => request.status === "live"))
    }
  }

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

  useEffect(() => {
    FilterRoadmapFunction()
  },[selectedRoadmap])
  return (
    <main className='bg-grey-white2 p-6'>
      <h1 className='text-xl text-blue font-bold mb-1'>In-Progress ({selectedRoadmap === "planned" ? plannedCount : selectedRoadmap === "in-progress" ? inProgressCount : liveCount })</h1>
      {selectedRoadmap === "planned" ? <p className='mb-6 text-sm text-grey font-normal'>Ideas prioritized for research</p>: null}
      {selectedRoadmap === "in-progress" ? <p className='mb-6 text-sm text-grey font-normal'>Currently being developed</p>: null}
      {selectedRoadmap === "live" ? <p className='mb-6 text-sm text-grey font-normal'>Released features</p>: null}
      {roadmap.map((feedback) => {
        return (
          <div className='bg-white mb-6 p-6 rounded-xl border-t-8 border-purple'>

            {selectedRoadmap === "planned" ? <div className='flex items-center gap-2 mb-4'><img className='h-2 w-2' src={orange} alt="orange oval" /><p>Planned</p></div> : null}
            {selectedRoadmap === "in-progress" ? <div className='flex items-center gap-2 mb-4'><img className='h-2 w-2' src={purple} alt="purple oval" /><p>Progress</p></div> : null}
            {selectedRoadmap === "live" ? <div className='flex items-center gap-2 mb-4'><img className='h-2 w-2' src={blue} alt="blue oval" /><p>Live</p></div> : null}
            <h2 className='text-sm font-bold text-blue mb-2'>{feedback.title}</h2>
            <p className='text-grey text-sm font-normal mb-2'>{feedback.description}</p>
            <div className='items-center justify-center bg-grey-white py-1 px-4 rounded-xl text-sm inline-block mb-4'>
              <p className='text-strong-blue font-semibold'>{feedback.category[0].toLocaleUpperCase() + feedback.category.substr(1)}</p>
            </div>
            <div className='flex justify-between'>
              <button className='flex bg-grey-white items-center gap-2 py-1 px-2 rounded-xl'>
                <img className='w-2 h-1' src={arrowup} alt='arrowup' />
                <p className='text-sm text-blue font-bold'>{feedback.upvotes}</p>
              </button>
              <button className='flex items-center gap-1'>
                <img className='h-4 w-5' src={comment} alt='comments' />
                <p>{feedback.comments ? feedback.comments.length : 0}</p>
              </button>
            </div>
          </div>
        )
      })}
    </main>
  )
}

export default DisplayRoadmapMobile