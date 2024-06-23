import FeedbackDisplay from "./components/FeedbackDisplay"
import Sort from "./components/Sort"
import Nav from "./components/Nav"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getAllPosts, getAllCategories } from "./features/social/socialSlice"

function App() {
  const dispatch = useDispatch()
  const [toggleMenu, setToggleMenu] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState(0)

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllPosts())
  }, [])

  return (
    <div className="md:pt-14 md:w-screen bg-grey-white xl:flex xl:w-full overflow-scroll xl:h-screen xl:justify-center">
      <div className="xl:w-1/3">
      <Nav toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      </div>
      <div className={toggleMenu === true ? "brightness-50 xl:w-2/3" : "xl:w-2/3 xl:mr-40"}>
        <Sort />
        <FeedbackDisplay selectedFeedback={selectedFeedback} setSelectedFeedback={setSelectedFeedback} />
      </div>
    </div>
  )
}

export default App
