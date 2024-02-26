import FeedbackDisplay from "./components/FeedbackDisplay"
import Sort from "./components/Sort"
import Nav from "./components/Nav"
import { useState } from "react"
import SelectedFeedback from "./components/SelectedFeedback"

function App() {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [toggleAdd, setToggleAdd] = useState(false)
  const [toggleView, setToggleView] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState(0)
  console.log(toggleView)
  console.log(selectedFeedback)
  return (
    <div className="md:pt-14 bg-grey-white xl:flex xl:w-full overflow-hidden xl:h-full">
      <Nav toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      <div className={toggleMenu === true ? "brightness-50" : null}>
        <Sort toggleAdd={toggleAdd} setToggleAdd={setToggleAdd} />
        {toggleAdd === true || toggleView === true ? null : <FeedbackDisplay toggleView={toggleView} setToggleView={setToggleView} selectedFeedback={selectedFeedback} setSelectedFeedback={setSelectedFeedback} />}
        {toggleView === true ? <SelectedFeedback toggleView={toggleView} setToggleView={setToggleView} selectedFeedback={selectedFeedback} /> : null}
      </div>
    </div>
  )
}

export default App

