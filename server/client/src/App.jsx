import FeedbackDisplay from "./components/FeedbackDisplay";
import Sort from "./components/Sort";
import Nav from "./components/Nav";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts, getAllCategories } from "./features/social/socialSlice";

function App() {
  const dispatch = useDispatch();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(0);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllPosts());
  }, []);

  return (
    <div className="md:pt-14 md:w-screen xl:gap-[2.08%] bg-grey-white xl:flex xl:w-screen overflow-scroll xl:h-screen xl:justify-center">
      <div className="xl:w-[18.33%]">
        <Nav toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      </div>
      <div className={`xl:w-[57.29%] ${toggleMenu ? "brightness-50" : ""}`}>
        <Sort />
        <FeedbackDisplay selectedFeedback={selectedFeedback} setSelectedFeedback={setSelectedFeedback} />
      </div>
    </div>
  );
}

export default App;
