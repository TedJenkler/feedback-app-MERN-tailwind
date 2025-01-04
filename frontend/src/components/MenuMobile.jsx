import React, { useEffect, useState } from 'react';
import Filter from "../components/Filter";
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
        <div className={`absolute h-full bg-grey-white2 top-[4.5rem] w-[72.27%] right-0 z-50 transition-transform duration-700 ease-in-out transform md:hidden ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
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