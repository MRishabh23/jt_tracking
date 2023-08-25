import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Drawer } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import CustomMenu from "../components/custom-menu";
import { IoClose } from "react-icons/io5";

interface props {}

const Navbar: React.FC<props> = () => {
  const [user, setUser] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.setItem("UserName", "");
    navigate("/");
    window.location.reload();
  };

  const handleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const controller = new AbortController();
    const u: any = localStorage.getItem("UserName");
    if (u !== null && u !== undefined && u !== "") {
      setUser(u);
    }
    return () => controller.abort();
  }, [user]);

  const SampleDrawer = () => {
    const [air, setAir] = useState(false);
    const [ocean, setOcean] = useState(false);
    const [ref, setRef] = useState(false);

    return (
      <Drawer
        title={
          <Link to="/" className="text-white hover:text-white">
            SHIPMENT TRACKING
          </Link>
        }
        placement="left"
        onClose={handleDrawer}
        open={open}
        width={260}
        closeIcon={false}
        headerStyle={{ background: "#10293B" }}
        extra={
          <IoClose
            className="text-xl text-white cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        }
      >
        <div className="flex flex-col gap-3">
          <CustomMenu
            name="Air"
            child={["Latency"]}
            open={air}
            setOpen={setAir}
            drawer={open}
            setDrawer={setOpen}
          />
          <CustomMenu
            name="Ocean"
            child={["Latency"]}
            open={ocean}
            setOpen={setOcean}
            drawer={open}
            setDrawer={setOpen}
          />
          <CustomMenu
            name="Reference"
            child={["List", "History"]}
            open={ref}
            setOpen={setRef}
            drawer={open}
            setDrawer={setOpen}
          />
        </div>
      </Drawer>
    );
  };

  return (
    <>
      <header className={`h-[8%] flex items-center bg-primary1 px-3 xl:px-8 2xl:px-14 ${user !== undefined && user !== null && user !== "" ? 'justify-between' : 'justify-center'}`}>
        {user !== undefined && user !== null && user !== "" ? (
          <>
            <div className="flex items-center justify-center gap-2">
              {/* hamburg menu */}
              <div>
                <RiMenu3Fill
                  onClick={() => handleDrawer()}
                  className="text-3xl text-white cursor-pointer"
                />
                <SampleDrawer />
              </div>
              {/* heading */}
              <Link to="/">
                <h1 className="hidden font-semibold tracking-wider text-white xs:block xs:text-3xl sm:text-4xl">
                  SHIPMENT TRACKING
                </h1>
              </Link>
            </div>
            <div>
              <Dropdown
                trigger={["click"]}
                dropdownRender={() => (
                  <div className="p-6 bg-white rounded-md shadow-2xl">
                    <p className="mb-2 text-lg font-medium">
                      Welcome,{" "}
                      <span className="uppercase text-amber-400">{user}</span>
                    </p>
                    <div className="flex justify-center">
                      <button
                        className="bg-red-600 text-white border-[1px] hover:bg-red-500 hover:border-red-600 flex justify-center rounded-md px-3 py-1"
                        type="button"
                        onClick={() => handleSignOut()}
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              >
                <Avatar
                  style={{ backgroundColor: "#fb923c" }}
                  className="flex items-center justify-center w-10 h-10 cursor-pointer"
                  shape="square"
                >
                  {user !== null && user !== "" && user.includes("fk")
                    ? "FK"
                    : user !== null && user !== "" && user.includes("jt")
                    ? "JT"
                    : "U"}
                </Avatar>
              </Dropdown>
            </div>
          </>
        ) : (
          <h1 className="text-2xl font-semibold tracking-wider text-white xxs:text-3xl xs:text-4xl">
            SHIPMENT TRACKING
          </h1>
        )}
      </header>
    </>
  );
};

export default React.memo(Navbar);