import React, { useState } from 'react'
import hamburger from '../assets/hamburger.svg'
import MenuMobile from './MenuMobile'

function Nav() {
    const [toggleMenu, setToggleMenu] = useState(false)
  return (
    <nav className='flex justify-between px-6 h-20 items-center bg-gradient-to-tr from-gradient-blue via-gradient-purple to-gradient-red'>
        <div className='flex flex-col text-white'>
            <p className='font-bold text-base'>Frontend Mentor</p>
            <p className='font-medium text-sm opacity-75'>Feedback Board</p>
        </div>
        <img onClick={(e) => {setToggleMenu(!toggleMenu)}} className='h-4 w-5 cursor-pointer md:hidden' src={hamburger} alt='mobilemenu' />
        <MenuMobile toggleMenu={toggleMenu} />
    </nav>
  )
}

export default Nav