import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './app/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RoadmapPage from './RoadmapPage.jsx';
import AddNewFeedback from './components/AddNewFeedback.jsx';
import EditFeedback from './components/EditFeedback.jsx';
import SelectedFeedback from './components/SelectedFeedback.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/roadmap',
    element: <RoadmapPage />,
  },
  {
    path: '/addfeedback',
    element: <AddNewFeedback />,
  },
  {
    path: '/editfeedback/:id',
    element: <EditFeedback />,
  },
  {
    path: '/feedback/:id',
    element: <SelectedFeedback />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
