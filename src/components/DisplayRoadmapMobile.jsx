import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import arrowup from "../assets/arrowup.png";
import comment from "../assets/comment.png";

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

  useEffect(() => {
    FilterRoadmapFunction()
  },[selectedRoadmap])
  return (
    <main className='bg-grey-white2 p-6'>
      <h1>In-Progress (3)</h1>
      <p>Features currently being developed</p>
      {roadmap.map((feedback) => {
        console.log(feedback)
        return (
          <div className='bg-white mb-6 p-6 rounded-xl border-t-8 border-purple'>
            <h2>{feedback.title}</h2>
            <p>{feedback.description}</p>
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