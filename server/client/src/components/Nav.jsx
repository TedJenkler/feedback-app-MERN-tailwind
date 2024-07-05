import React from 'react';
import hamburger from '../assets/hamburger.svg';
import MenuMobile from './MenuMobile';
import x from "../assets/x.svg";
import Filter from './Filter';
import Roadmap from './Roadmap';

function Nav({ toggleMenu, setToggleMenu }) {
    return (
        <>
            <nav className='hidden absolute md:flex md:h-[11.125rem] md:relative md:mx-10 md:mb-10 gap-[0.625rem] xl:flex xl:flex-col xl:pr-0 xl:pt-24 xl:gap-6 xl:mr-0'>
                <div className='w-1/3 h-[11.125rem] bg-gradient-to-tr from-gradient-blue via-gradient-purple to-gradient-red pt-24 px-6 rounded-xl lg:w-1/3 lg:mr-0 xl:w-full xl:min-w-64 xl:p-6 xl:pt-16'>
                    <p className='text-white tracking-[-0.25px] font-bold text-xl'>Frontend Mentor</p>
                    <p className='text-white font-medium text-base opacity-75 md:px15'>Feedback Board</p>
                </div>
                <Filter />
                <Roadmap />
            </nav>
            <nav className='flex justify-between px-6 h-[4.5rem] items-center bg-gradient-to-tr from-gradient-blue via-gradient-purple to-gradient-red md:hidden md:absolute overflow-x-hidden'>
                <div className='flex flex-col text-white'>
                    <p className='px15 font-bold tracking-[-0.19px]'>Frontend Mentor</p>
                    <p className='px13 font-medium opacity-75'>Feedback Board</p>
                </div>
                <img onClick={(e) => { setToggleMenu(!toggleMenu) }} className='h-4 w-4 cursor-pointer md:hidden' src={toggleMenu === false ? hamburger : x} alt='mobilemenu' />
                <MenuMobile toggleMenu={toggleMenu} />
            </nav>
        </>
    );
}

export default Nav;

