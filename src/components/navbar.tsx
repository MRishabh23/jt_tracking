import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Drawer } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import CustomMenu from "../components/custom-menu";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction, loginAction } from "../store/actions/auth.action";

interface props {}

const Navbar: React.FC<props> = () => {
  const [open, setOpen] = useState(false);
  const hasAuth = useSelector((state: any) => state.auth.hasAuth);
  const user = useSelector((state: any) => state.auth.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    localStorage.removeItem("Username");
    dispatch(logoutAction());
    navigate("/");
  };

  const handleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      dispatch(loginAction());
    }
    return () => {
      ignore = true;
    };
  }, [user, hasAuth]);

  const SampleDrawer = () => {
    const [air, setAir] = useState(false);
    const [ocean, setOcean] = useState(false);

    return (
      <Drawer
        title={
          <Link to="/" className="text-white hover:text-gray-200">
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
            className="text-xl text-white cursor-pointer hover:text-gray-200"
            onClick={() => setOpen(!open)}
          />
        }
      >
        <div className="flex flex-col gap-3">
          <CustomMenu
            name="Air"
            child={["History", "Summary"]}
            open={air}
            setOpen={setAir}
            drawer={open}
            setDrawer={setOpen}
          />
          <CustomMenu
            name="Ocean"
            child={["Latency", "Reference", "History", "Summary","Induced-Latency"]}
            open={ocean}
            setOpen={setOcean}
            drawer={open}
            setDrawer={setOpen}
          />
        </div>
      </Drawer>
    );
  };

  return (
    <>
      <header
        className={`h-20 flex items-center bg-primary1 px-3 xl:px-8 2xl:px-14 ${
          hasAuth === true ? "justify-between" : "justify-center"
        }`}
      >
        {hasAuth === true ? (
          <>
            <div className="flex items-center justify-center gap-6">
              {/* hamburg menu */}
              <div>
                <AiOutlineMenu
                  onClick={() => handleDrawer()}
                  className="text-3xl text-white cursor-pointer"
                />
                <SampleDrawer />
              </div>
              {/* heading */}
              <Link to="/">
                <h1 className="hidden font-bold tracking-wider text-white xs:block xs:text-3xl sm:text-4xl">
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
