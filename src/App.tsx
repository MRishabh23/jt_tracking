import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./routes/main/landing";
//import AirDashboard from "./routes/air/AirDashboard";
import OceanDashboard from "./routes/ocean/OceanDashboard";
//import AirLatency from "./routes/air/AirLatency";
import OceanLatency from "./routes/ocean/OceanLatency";
import OceanList from "./routes/ocean/OceanList";
import OceanHistory from "./routes/ocean/OceanHistory";
import OceanStatus from "./routes/ocean/OceanStatus";
import Login from "./routes/auth/login";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { useSelector } from "react-redux";
import OceanSummary from "./routes/ocean/OceanSummary";

interface props {}

const App: React.FC<props> = () => {
  const hasAuth = useSelector((state: any) => state.auth.hasAuth);
  window.addEventListener("storage", (e) => {
    if (e.key === "Username" && e.oldValue && !e.newValue) {
      window.location.reload();
    }
  });

  const MainPage = () => {
    if (hasAuth === true) {
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
      <div className="flex flex-col w-full h-full bg-stone-50">
        <Navbar />
        <main className="flex-1 p-4 overflow-auto">
          <Routes>
            <Route path="/" element={<MainPage />} />
            {/* <Route path="/air">
              <Route index element={<AirDashboard />} />
              <Route path="latency" element={<AirLatency />} />
            </Route> */}
            <Route path="/ocean">
              <Route index element={<OceanDashboard />} />
              <Route path="latency" element={<OceanLatency />} />
              <Route path="reference" element={<OceanList />} />
              <Route path="history" element={<OceanHistory />} />
              <Route path="summary" element={<OceanSummary />} />
              <Route path="status" element={<OceanStatus />} />
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
