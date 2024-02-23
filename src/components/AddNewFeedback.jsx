import React from 'react'
import arrowleft from "../assets/arrowleft.png"

function AddNewFeedback( {setToggleAdd, toggleAdd} ) {
  return (
    <main className='absolute h-full w-full bg-grey-white2 top-0 bottom-0 left-0 right-0 px-6 py-10'>
    <button onClick={(e) => setToggleAdd(!toggleAdd)} className='flex items-center gap-1'>
        <img className='w-1 h-2' src={arrowleft} alt='arrowback' />
        <p className='text-grey text-sm font-bold'>Go Back</p>
    </button>
    </main>
  )
}

export default AddNewFeedback