import React from 'react'
import hamburger from '../assets/hamburger.svg'

function Nav() {
  return (
    <nav className='flex justify-between px-6 h-20 items-center bg-gradient-to-tr from-gradient-blue via-gradient-purple to-gradient-red'>
        <div className='flex flex-col text-white'>
            <p className='font-bold text-base'>Frontend Mentor</p>
            <p className='font-medium text-sm opacity-75'>Feedback Board</p>
        </div>
        <img className='h-4 w-5 cursor-pointer md:hidden' src={hamburger} alt='mobilemenu' />
    </nav>
  )
}

export default Nav