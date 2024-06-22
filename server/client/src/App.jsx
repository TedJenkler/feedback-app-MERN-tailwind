// Importing FeedbackDisplay component from "./components/FeedbackDisplay"
import FeedbackDisplay from "./components/FeedbackDisplay"
// Importing Sort component from "./components/Sort"
import Sort from "./components/Sort"
// Importing Nav component from "./components/Nav"
import Nav from "./components/Nav"
// Importing useState hook from React
import { useState } from "react"

// App component
function App() {
  // State for toggling the menu
  const [toggleMenu, setToggleMenu] = useState(false)
  // State for storing the selected feedback ID
  const [selectedFeedback, setSelectedFeedback] = useState(0)

  // App UI
  return (
    <div className="md:pt-14 md:w-screen bg-grey-white xl:flex xl:w-full overflow-scroll xl:h-screen xl:justify-center">
      {/* Navigation component */}
      <div className="xl:w-1/3">
      <Nav toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      </div>
      {/* If toggleMenu is true, apply brightness-50 class */}
      <div className={toggleMenu === true ? "brightness-50 xl:w-2/3" : "xl:w-2/3 xl:mr-40"}>
        {/* Sort component */}
        <Sort />
        {/* FeedbackDisplay component */}
        <FeedbackDisplay selectedFeedback={selectedFeedback} setSelectedFeedback={setSelectedFeedback} />
      </div>
    </div>
  )
}

export default App // Exporting App component
