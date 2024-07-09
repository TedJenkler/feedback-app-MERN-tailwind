import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import whitearrow from "../assets/whitearrow.png";
import LinkButton from './LinkButton';
import DisplayRoadmapMobile from './DisplayRoadmapMobile';

function MobileRoadmap() {
    const [selectedRoadmap, setSelectedRoadmap] = useState("in-progress");

    return (
        <main>
            <nav className='xs:px-3 s:px-6 flex justify-between bg-blue text-white h-[6.25rem] px-6 py-6 items-center'>
                <div>
                    <Link className='mb-1 flex items-center gap-2' to="/feedback-app-tailwind-vite/">
                        <img src={whitearrow} alt='back btn' />
                        <p className='px13 font-bold'>Go Back</p>
                    </Link>
                    <h1 className='text-lg tracking-[-0.25px] font-bold'>Roadmap</h1>
                </div>
                <Link to="/addfeedback" className='flex items-center justify-center bg-purple px13 font-bold text-white rounded-[0.625rem] w-[8.375rem] h-10'>+ Add Feedback</Link>
            </nav>
            <LinkButton selectedRoadmap={selectedRoadmap} setSelectedRoadmap={setSelectedRoadmap} />
            <DisplayRoadmapMobile selectedRoadmap={selectedRoadmap} />
        </main>
    );
}

export default MobileRoadmap;