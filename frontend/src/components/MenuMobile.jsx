import React, { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import Roadmap from './Roadmap';

function MenuMobile({ toggleMenu }) {
  const [isVisible, setIsVisible] = useState(toggleMenu);

  useEffect(() => {
    setIsVisible(toggleMenu);

    if (toggleMenu) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
      }, 700);

      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [toggleMenu]);

  return (
    <div
      className={`absolute right-0 top-[4.5rem] z-50 h-full w-[72.27%] transform bg-grey-white2 transition-transform duration-700 ease-in-out md:hidden ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
    >
      {isVisible && (
        <>
          <Filter />
          <Roadmap />
        </>
      )}
    </div>
  );
}

export default MenuMobile;
