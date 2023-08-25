import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./routes/main/landing";
import ErrorPage from "./routes/error/ErrorPage";
import Dashboard from "./routes/main/dashboard";
import AirDashboard from "./routes/air/AirDashboard";
import OceanDashboard from "./routes/ocean/OceanDashboard";
import ReferenceDashboard from "./routes/reference/ReferenceDashboard";
import AirLatency from "./routes/air/AirLatency";
import OceanLatency from "./routes/ocean/OceanLatency";
import ReferenceList from "./routes/reference/ReferenceList";
import ReferenceHistory from "./routes/reference/ReferenceHistory";
import Login from "./routes/auth/login";

interface props {}

const App: React.FC<props> = () => {

  const [authentication, setAuthentication] = useState("")

  useEffect(() => {
    const controller = new AbortController();
    const u: any = localStorage.getItem("UserName")
    if(u !== null && u !== undefined && u !== ""){
      setAuthentication(u);
    }
    return () => controller.abort();
  }, [authentication])

  let router;

  if(authentication !== ""){
    router = createBrowserRouter([
      {
        path: "/",
        element: <Landing />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "/dashboard/air/",
            element: <AirDashboard />,
          },
          {
            path: "/dashboard/ocean/",
            element: <OceanDashboard />,
          },
          {
            path: "/dashboard/reference/",
            element: <ReferenceDashboard />,
          },
          {
            path: "/dashboard/air/latency",
            element: <AirLatency />,
          },
          {
            path: "/dashboard/ocean/latency",
            element: <OceanLatency />,
          },
          {
            path: "/dashboard/reference/list",
            element: <ReferenceList />,
          },
          {
            path: "/dashboard/reference/history",
            element: <ReferenceHistory />,
          },
        ],
        errorElement: <ErrorPage />,
      },
    ]);
  }else{
    router = createBrowserRouter([
      {
        path: "/",
        element: <Login />,
        errorElement: <ErrorPage />,
      }
    ]);
  } 

  return (
    <>
        <RouterProvider
          router={router}
          fallbackElement={<div>Loading......</div>}
        />
    </>
  );
};

export default React.memo(App);
