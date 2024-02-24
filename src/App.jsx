import FeedbackDisplay from "./components/FeedbackDisplay"
import Sort from "./components/Sort"
import Nav from "./components/Nav"
import { useState } from "react"

function App() {
  const [toggleAdd, setToggleAdd] = useState(false)
  return (
    <>
    <Nav />
    <Sort toggleAdd={toggleAdd} setToggleAdd={setToggleAdd} />
    {toggleAdd === true ? null : <FeedbackDisplay />}
    </>
  )
}

export default App
