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

    const timer = setTimeout(() => {
      const alertShown = localStorage.getItem("alertShown");
      if (!alertShown) {
        alert("Hi! Welcome to my project created by Teodor Jenkler. The project is in its early stages, and at the moment, I haven't implemented full user authentication. Only the creator of a post can edit or delete it, so please refrain from altering posts that aren't yours. Have fun, and I would greatly appreciate any feedback, either on my LinkedIn profile (https://www.linkedin.com/in/tedjenklerwebdeveloper/) or the Frontend Mentor forum.");
        localStorage.setItem("alertShown", "true");
      }
    }, 2000);

    return () => clearTimeout(timer);

  }, [dispatch]);

  return (
    <div className="md:pt-14 w-screen xl:gap-[2.08%] min-h-full bg-grey-white xl:flex xl:w-screen xl:h-screen xl:justify-center overflow-x-hidden">
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
