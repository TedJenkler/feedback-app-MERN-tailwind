import React from 'react'
import { Link } from 'react-router-dom'
import whitearrow from "../assets/whitearrow.png"

function MobileRoadmap() {
  return (
    <main>
        <nav className='flex justify-between bg-blue text-white p-6 items-center'>
            <div>
                <Link className='mb-1 flex items-center gap-2' to="/">
                    <img src={whitearrow} alt='back btn' />
                    <p className='text-sm font-bold'>Go Back</p>
                </Link>
                <h1 className='text-lg font-bold'>Roadmap</h1>
            </div>
            <button className='bg-purple text-sm font-bold text-white rounded-xl py-2 px-4'>+ Add Feedback</button>
        </nav>
    </main>
  )
}

export default MobileRoadmap