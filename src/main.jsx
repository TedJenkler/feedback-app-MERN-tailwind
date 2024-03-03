import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { store } from './app/store.jsx';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'; // Import Route
import RoadmapPage from './RoadmapPage.jsx';
import AddNewFeedback from './components/AddNewFeedback.jsx';
import EditFeedback from './components/EditFeedback.jsx';
import SelectedFeedback from './components/SelectedFeedback.jsx'; // Import SelectedFeedback component

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/roadmap",
    element: <RoadmapPage />,
  },
  {
    path: "/addfeedback",
    element: <AddNewFeedback />,
  },
  {
    path: "/feedback/:id/editfeedback/:id",
    element: <EditFeedback/>,
  },
  {
    // Dynamic route for selected feedback item
    path: "/feedback/:id",
    element: <SelectedFeedback />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)