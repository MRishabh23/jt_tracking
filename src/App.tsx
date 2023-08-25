import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./routes/main/landing";
import ErrorPage from "./routes/error/ErrorPage";
import AirDashboard from "./routes/air/AirDashboard";
import OceanDashboard from "./routes/ocean/OceanDashboard";
import ReferenceDashboard from "./routes/reference/ReferenceDashboard";
import AirLatency from "./routes/air/AirLatency";
import OceanLatency from "./routes/ocean/OceanLatency";
import ReferenceList from "./routes/reference/ReferenceList";
import ReferenceHistory from "./routes/reference/ReferenceHistory";
import Login from "./routes/auth/login";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

interface props {}

const App: React.FC<props> = () => {
  const [authentication, setAuthentication] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const u: any = localStorage.getItem("UserName");
    if (u !== null && u !== undefined && u !== "") {
      setAuthentication(u);
    }
    return () => controller.abort();
  }, [authentication]);

  const MainPage = () => {
    if (authentication !== "") {
      return (
        <>
          <Landing />
        </>
      );
    } else {
      return (
        <>
          <Login />
        </>
      );
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-stone-50">
        <Navbar />
        <main className="flex justify-center items-center h-[84%]">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/air">
              <Route index element={<AirDashboard />} />
              <Route path="latency" element={<AirLatency />} />
            </Route>
            <Route path="/ocean">
              <Route index element={<OceanDashboard />} />
              <Route path="latency" element={<OceanLatency />} />
            </Route>
            <Route path="/reference">
              <Route index element={<ReferenceDashboard />} />
              <Route path="list" element={<ReferenceList />} />
              <Route path="history" element={<ReferenceHistory />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default React.memo(App);
