import React from "react";
import { Link } from "react-router-dom";
import { useCheckAuth } from "../../api/auth";

const OceanDashboard: React.FC = () => {
  useCheckAuth();
  const oceanDashMap = [
    {
      route: "LATENCY",
      param: "queue=NORMAL"
    },
    {
      route: "REFERENCE",
      param: "carriers=acl&active=yes"
    },
    {
      route: "HISTORY",
      param: "",
    },
    {
      route: "SUMMARY",
      param: "queue=NORMAL"
    },
    {
      route: "STATUS",
      param: "",
    },
  ];
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full p-3">
        <div className="flex items-center justify-center mb-5">
          <h2 className="text-3xl font-bold">OCEAN DASHBOARD</h2>
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {oceanDashMap.map((item) => (
            <div key={item.route} className="flex items-center justify-center">
              <Link
                to={{
                  pathname: `/ocean/${item.route.toLowerCase()}`,
                  search: item.param
                }}
                className="hover:text-gray-200"
              >
                <div className="px-8 py-4 text-white transition duration-500 ease-in-out rounded-lg bg-amber-400 border-[1px] border-amber-500 hover:bg-amber-400/90 hover:border-[1px] hover:border-amber-500 hover:scale-105 hover:shadow-2xl">
                  <span className="text-2xl font-semibold tracking-wider">
                    {item.route}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default React.memo(OceanDashboard);
