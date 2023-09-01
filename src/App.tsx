import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./routes/main/landing";
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
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logoutAction } from "./store/actions/auth.action";

interface props {}

const App: React.FC<props> = () => {
  const hasAuth = useSelector((state: any) => state.auth.hasAuth);
  const dispatch = useDispatch();
  window.addEventListener("storage", (e) => {
    if (e.key === "Username" && e.oldValue && !e.newValue) {
      dispatch(logoutAction());
      window.location.reload();
    }
  });
  useEffect(() => {
    const controller = new AbortController();
    const user: any = localStorage.getItem("Username");
    if (user !== null && user !== undefined && user !== "") {
      dispatch(loginAction());
    } else {
      dispatch(logoutAction());
    }
    return () => controller.abort();
  }, [hasAuth]);

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
