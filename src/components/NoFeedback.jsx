import React from 'react'
import empty from "../assets/empty.svg"
import { Link } from 'react-router-dom'

function NoFeedback() {
  return (
    <div className='flex flex-col bg-white px-6 py-20 mx-6 rounded-xl items-center md:mx-10 md:py-28'>
        <img className='mb-10' src={empty} alt='empty' />
        <h1 className='mb-4 text-blue font-bold text-lg md:text-2xl'>There is no feedback yet.</h1>
        <p className='mb-6 text-grey text-sm font-normal text-center md:mx-32 md:text-base'>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
        <Link to="/addfeedback" className='bg-purple rounded-xl px-4 py-2 font-bold whitespace-nowrap text-white'>+ Add Feedback</Link>
    </div>
  )
}

export default NoFeedback