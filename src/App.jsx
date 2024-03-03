import FeedbackDisplay from "./components/FeedbackDisplay"
import Sort from "./components/Sort"
import Nav from "./components/Nav"
import { useState } from "react"

function App() {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState(0)
  return (
    <div className="md:pt-14 md:w-screen bg-grey-white xl:flex xl:w-full overflow-hidden xl:h-full">
      <Nav toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      <div className={toggleMenu === true ? "brightness-50" : null}>
        <Sort />
        <FeedbackDisplay selectedFeedback={selectedFeedback} setSelectedFeedback={setSelectedFeedback} />
      </div>
    </div>
  )
}

export default App

