import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store.jsx'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RoadmapPage from './RoadmapPage.jsx'
import AddNewFeedback from './components/AddNewFeedback.jsx'
import EditFeedback from './components/EditFeedback.jsx'

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
    path: "/editfeedback/:id",
    element: <EditFeedback/>,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
