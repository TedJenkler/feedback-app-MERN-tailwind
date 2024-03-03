import React from 'react'; // Importing React library
import MobileRoadmap from './components/MobileRoadmap'; // Importing MobileRoadmap component
import DesktopRoadmap from './components/DesktopRoadmap'; // Importing DesktopRoadmap component

// RoadmapPage component
function RoadmapPage() {
  // Render different roadmap components based on screen size
  return (
    <>
      {/* Render MobileRoadmap component for small screens */}
      <div className='md:hidden md:absolute'>
        <MobileRoadmap />
      </div>
      {/* Render DesktopRoadmap component for larger screens */}
      <div className='hidden absolute md:flex md:flex-col md:relative'>
        <DesktopRoadmap />
      </div>
    </>
  )
}

export default RoadmapPage; // Export RoadmapPage component
