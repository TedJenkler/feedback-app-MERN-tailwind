import React from 'react';
import MobileRoadmap from './components/MobileRoadmap';
import DesktopRoadmap from './components/DesktopRoadmap';

function RoadmapPage() {
  return (
    <>
      <div className='md:hidden md:absolute'>
        <MobileRoadmap />
      </div>
      <div className='hidden absolute md:flex md:flex-col md:relative'>
        <DesktopRoadmap />
      </div>
    </>
  )
}

export default RoadmapPage;
