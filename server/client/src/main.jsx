// Importing necessary dependencies
import React from 'react'; // Import React library
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering
import App from './App.jsx'; // Importing the main App component
import './index.css'; // Importing CSS styles
import { store } from './app/store.jsx'; // Importing Redux store
import { Provider } from 'react-redux'; // Importing Provider for Redux
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'; // Importing routing components
import RoadmapPage from './RoadmapPage.jsx'; // Importing RoadmapPage component
import AddNewFeedback from './components/AddNewFeedback.jsx'; // Importing AddNewFeedback component
import EditFeedback from './components/EditFeedback.jsx'; // Importing EditFeedback component
import SelectedFeedback from './components/SelectedFeedback.jsx'; // Importing SelectedFeedback component

// Creating router configuration
const router = createBrowserRouter([
  {
    path: "/feedback-app-tailwind-vite/", // Route for the main page
    element: <App />, // Render App component
  },
  {
    path: "/roadmap", // Route for the roadmap page
    element: <RoadmapPage />, // Render RoadmapPage component
  },
  {
    path: "/addfeedback", // Route for adding new feedback
    element: <AddNewFeedback />, // Render AddNewFeedback component
  },
  {
    path: "/feedback/:id/editfeedback/:id", // Route for editing feedback
    element: <EditFeedback/>, // Render EditFeedback component
  },
  {
    path: "/feedback/:id", // Dynamic route for selected feedback item
    element: <SelectedFeedback />, // Render SelectedFeedback component
  },
]);

// Rendering the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrapping the application with Redux Provider */}
    <Provider store={store}>
      {/* Providing router configuration */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
