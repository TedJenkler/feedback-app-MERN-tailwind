import React from 'react';
import MobileRoadmap from './components/MobileRoadmap';
import DesktopRoadmap from './components/DesktopRoadmap';

function RoadmapPage() {
  return (
    <>
      <div className='md:absolute md:hidden'>
        <MobileRoadmap />
      </div>
      <div className='absolute hidden md:relative md:flex md:flex-col'>
        <DesktopRoadmap />
      </div>
    </>
  );
}

export default RoadmapPage;
