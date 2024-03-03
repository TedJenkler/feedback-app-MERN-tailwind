import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import whitearrow from "../assets/whitearrow.png";
import LinkButton from './LinkButton';
import DisplayRoadmapMobile from './DisplayRoadmapMobile';

function MobileRoadmap() {
    const [selectedRoadmap, setSelectedRoadmap] = useState("in-progress");

    return (
        <main>
            {/* Navigation bar */}
            <nav className='flex justify-between bg-blue text-white p-6 items-center'>
                <div>
                    {/* Link to go back */}
                    <Link className='mb-1 flex items-center gap-2' to="/feedback-app-tailwind-vite/">
                        <img src={whitearrow} alt='back btn' />
                        <p className='text-sm font-bold'>Go Back</p>
                    </Link>
                    <h1 className='text-lg font-bold'>Roadmap</h1>
                </div>
                {/* Link to add feedback */}
                <Link to="/addfeedback" className='bg-purple text-sm font-bold text-white rounded-xl py-2 px-4'>+ Add Feedback</Link>
            </nav>
            {/* Render the LinkButton component */}
            <LinkButton selectedRoadmap={selectedRoadmap} setSelectedRoadmap={setSelectedRoadmap} />
            {/* Render the DisplayRoadmapMobile component with selected roadmap */}
            <DisplayRoadmapMobile selectedRoadmap={selectedRoadmap} />
        </main>
    );
}

export default MobileRoadmap;