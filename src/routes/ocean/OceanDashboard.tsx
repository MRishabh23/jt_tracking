import React from "react";
import { Link } from "react-router-dom";
import { useCheckAuth } from "../../api/auth";

const OceanDashboard: React.FC = () => {
  useCheckAuth();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full p-3">
        <div className="flex items-center justify-center">
          <h2 className="text-3xl font-bold">OCEAN DASHBOARD</h2>
        </div>
        <div className="flex items-center justify-center mt-10">
          <Link to="/ocean/latency" className="hover:text-gray-200">
            <div className="px-10 py-6 text-white transition duration-500 ease-in-out rounded-lg bg-amber-300 border-[1px] border-amber-500 hover:bg-amber-300/90 hover:border-[1px] hover:border-amber-500 hover:scale-105 hover:shadow-2xl">
              <span className="text-xl">Latency List</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center mt-10">
          <Link to="/reference/list" className="hover:text-gray-200">
            <div className="px-10 py-6 text-white transition duration-500 ease-in-out rounded-lg bg-amber-300 border-[1px] border-amber-500 hover:bg-amber-300/90 hover:border-[1px] hover:border-amber-500 hover:scale-105 hover:shadow-2xl">
              <span className="text-xl">Reference List</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center mt-10">
          <Link to="/reference/history" className="hover:text-gray-200">
            <div className="px-10 py-6 text-white transition duration-500 ease-in-out rounded-lg bg-amber-300 border-[1px] border-amber-500 hover:bg-amber-300/90 hover:border-[1px] hover:border-amber-500 hover:scale-105 hover:shadow-2xl">
              <span className="text-xl">Crawl History</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default React.memo(OceanDashboard);
