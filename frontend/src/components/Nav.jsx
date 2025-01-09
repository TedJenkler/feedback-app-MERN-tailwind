import React from 'react';
import hamburger from '../assets/hamburger.svg';
import MenuMobile from './MenuMobile';
import x from '../assets/x.svg';
import Filter from './Filter';
import Roadmap from './Roadmap';

function Nav({ toggleMenu, setToggleMenu }) {
  return (
    <>
      <nav className='absolute hidden gap-[0.625rem] md:relative md:mx-10 md:mb-10 md:flex md:h-[11.125rem] xl:mr-0 xl:flex xl:flex-col xl:gap-6 xl:pr-0 xl:pt-24'>
        <div className='h-[11.125rem] w-1/3 rounded-xl bg-gradient-to-tr from-gradient-blue via-gradient-purple to-gradient-red px-6 pt-24 lg:mr-0 lg:w-1/3 xl:w-full xl:min-w-64 xl:p-6 xl:pt-16'>
          <p className='text-xl font-bold tracking-[-0.25px] text-white'>
            Frontend Mentor
          </p>
          <p className='md:px15 text-base font-medium text-white opacity-75'>
            Feedback Board
          </p>
        </div>
        <Filter />
        <Roadmap />
      </nav>
      <nav className='flex h-[4.5rem] items-center justify-between overflow-x-hidden bg-gradient-to-tr from-gradient-blue via-gradient-purple to-gradient-red xs:px-4 s:px-6 md:absolute md:hidden'>
        <div className='flex flex-col text-white'>
          <p className='px15 font-bold tracking-[-0.19px]'>Frontend Mentor</p>
          <p className='px13 font-medium opacity-75'>Feedback Board</p>
        </div>
        <img
          onClick={e => {
            setToggleMenu(!toggleMenu);
          }}
          className='h-4 w-4 cursor-pointer md:hidden'
          src={toggleMenu === false ? hamburger : x}
          alt='mobilemenu'
        />
        <MenuMobile toggleMenu={toggleMenu} />
      </nav>
    </>
  );
}

export default Nav;
