import React, { useEffect } from 'react';
import Filter from "../components/Filter";
import Roadmap from './Roadmap';

function MenuMobile({ toggleMenu }) {
    useEffect(() => {
        if (toggleMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [toggleMenu]);

    return (
        <div className={`absolute ${toggleMenu ? 'w-[72.27%] overflow-y-auto' : 'hidden'} h-full bg-grey-white2 top-[4.5rem] right-0 z-50`}>
            <Filter />
            <Roadmap />
        </div>
    );
}

export default MenuMobile;