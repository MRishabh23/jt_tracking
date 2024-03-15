import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Landing page import
import Landing from "./routes/main/landing";

// Air Dashboard imports
import AirDashboard from "./routes/air/AirDashboard";
import AirSummary from "./routes/air/AirSummary";

// Ocean Dashboard imports
import OceanLatency from "./routes/ocean/OceanLatency";
import OceanList from "./routes/ocean/OceanList";
import OceanHistory from "./routes/ocean/OceanHistory";
import OceanSummary from "./routes/ocean/OceanSummary";
import OceanDashboard from "./routes/ocean/OceanDashboard";
import OceanLatencyChart from "./routes/ocean/OceanLatencyChart";

// other imports
import Login from "./routes/auth/login";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { useSelector } from "react-redux";

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
          {/* <div className="flex items-center justify-center h-full text-3xl font-bold tracking-wider text-gray-500 uppercase text-primary1-">
            Under Maintenance...
          </div> */}
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
            {/* AIR ROUTES LOGIC */}
            <Route path="/air">
              <Route index element={<AirDashboard />} />
              <Route path="summary" element={<AirSummary />} />
            </Route>
            {/* OCEAN ROUTES LOGIC */}
            <Route path="/ocean">
              <Route index element={<OceanDashboard />} />
              <Route path="latency" element={<OceanLatency />} />
              <Route path="reference" element={<OceanList />} />
              <Route path="history" element={<OceanHistory />} />
              <Route path="summary" element={<OceanSummary />} />
              <Route path="induced-latency" element={<OceanLatencyChart />} />
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
