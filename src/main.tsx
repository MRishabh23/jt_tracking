import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import OceanLatency from './routes/ocean/OceanLatency.tsx';
import AirLatency from './routes/air/AirLatency.tsx';
import ErrorPage from './routes/error/ErrorPage.tsx';
import ReferenceList from './routes/reference/ReferenceList.tsx';
import Landing from './routes/main/landing.tsx';
import ReferenceHistory from './routes/reference/ReferenceHistory.tsx';
import OceanDashboard from './routes/ocean/OceanDashboard.tsx';
import AirDashboard from './routes/air/AirDashboard.tsx';
import ReferenceDashboard from './routes/reference/ReferenceDashboard.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/dashboard",
    element: <App />,
    children: [
      {
        path: "/dashboard/air/",
        element: <AirDashboard/>
      },
      {
        path: "/dashboard/ocean/",
        element: <OceanDashboard/>
      },
      {
        path: "/dashboard/reference/",
        element: <ReferenceDashboard/>
      },
      {
        path: "/dashboard/air/latency",
        element: <AirLatency/>
      },
      {
        path: "/dashboard/ocean/latency",
        element: <OceanLatency/>
      },
      {
        path: "/dashboard/reference/list",
        element: <ReferenceList/>
      },
      {
        path: "/dashboard/reference/history",
        element: <ReferenceHistory/>
      }
    ],
    errorElement: <ErrorPage/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
