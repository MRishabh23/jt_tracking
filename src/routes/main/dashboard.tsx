import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  MenuProps,
  Drawer,
  Popover,
  Avatar,
  Dropdown,
} from "antd";
import jtLogo from "../../assets/jtLogo.png";
import jtSoloLogo from "../../assets/jtSoloLogo.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { GiCommercialAirplane, GiCargoShip } from "react-icons/gi";
import { VscReferences } from "react-icons/vsc";
import { RiMenu3Fill } from "react-icons/ri";
import CustomMenu from "../../components/custom-menu";
import { IoClose } from "react-icons/io5";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard: React.FC = () => {
  // const [obj, setObj] = useState({
  //   breakPoint: false,
  //   collapse: false,
  //   collapseType: "",
  // });
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState("");

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const mItems: MenuItem[] = [
    getItem(
      <Link to="/dashboard/air/" className="hover:text-white">
        Air
      </Link>,
      "sub1",
      <GiCommercialAirplane />,
      [
        getItem(
          <Link to="/dashboard/air/latency">
            {!collapsed ? "Latency" : "Air Latency"}
          </Link>,
          "1"
        ),
      ]
    ),

    getItem(
      <Link to="/dashboard/ocean/" className="hover:text-white">
        Ocean
      </Link>,
      "sub2",
      <GiCargoShip />,
      [
        getItem(
          <Link to="/dashboard/ocean/latency">
            {!collapsed ? "Latency" : "Ocean Latency"}
          </Link>,
          "2"
        ),
      ]
    ),

    getItem(
      <Link to="/dashboard/reference/" className="hover:text-white">
        Reference
      </Link>,
      "sub3",
      <VscReferences />,
      [
        getItem(
          <Link to="/dashboard/reference/list">
            {!collapsed ? "List" : "Reference List"}
          </Link>,
          "3"
        ),
        getItem(
          <Link to="/dashboard/reference/history">
            {!collapsed ? "History" : "Reference History"}
          </Link>,
          "4"
        ),
      ]
    ),
  ];

  const [open, setOpen] = useState(false);
  const handleDrawer = () => {
    setOpen(!open);
  };

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

  const handleSignOut = () => {
    localStorage.setItem("UserName", "");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const controller = new AbortController();
    const u: any = localStorage.getItem("UserName");
    if (u != "") {
      setUser(u);
    }
    return () => controller.abort();
  }, []);

  return (
    <div className="h-full bg-gray-50">
      <Layout className="layoutClass" style={{ height: "100%" }}>
        <Header
          className="block lg:hidden"
          style={{ padding: 0, background: "#10293B" }}
        >
          <div className="flex items-center justify-between px-3">
            {/* hamburg menu */}
            <div>
              <RiMenu3Fill
                onClick={() => handleDrawer()}
                className="text-2xl text-white cursor-pointer"
              />
              <SampleDrawer />
            </div>
            {/* heading */}
            <Dropdown
              trigger={["click"]}
              dropdownRender={() => (
                <div className="p-6 bg-white rounded-md shadow-2xl">
                  <p className="mb-2 text-lg font-medium">
                    Welcome, <span className="text-amber-400 uppercase">{user}</span>
                  </p>
                  <div className="flex justify-center gap-2">
                    <Link
                      to="/"
                      className="bg-blue-500 text-white border-[1px] hover:text-white hover:bg-blue-400 hover:border-blue-600 flex justify-center rounded-md px-3 py-1"
                    >
                      Home
                    </Link>
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
              <h1 className="text-lg cursor-pointer text-white leading-[4rem] sm:text-2xl font-semibold sm:leading-[4rem] text-center">
                SHIPMENT TRACKING
              </h1>
            </Dropdown>
          </div>
        </Header>
        <Sider
          className="hidden lg:block"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          breakpoint="xl"
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="my-5">
                <Link to="/">
                  <img
                    className="h-8 mx-auto"
                    loading="lazy"
                    src={!collapsed ? jtLogo : jtSoloLogo}
                    alt="Justransform"
                  />
                </Link>
                {!collapsed ? (
                  <div className="mt-4 font-medium text-center text-white">
                    <p>SHIPMENT TRACKING</p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <Menu
                theme="dark"
                mode="inline"
                items={mItems}
                style={{ fontSize: 17 }}
              />
            </div>
            <div className="flex justify-center pb-4">
              {!collapsed ? (
                <Popover
                  trigger={["click"]}
                  placement="right"
                  content={() => (
                    <div className="flex justify-center">
                      <button
                        className="bg-red-600 text-white border-[1px] hover:bg-red-500 hover:border-red-600 flex justify-center rounded-md px-3 py-1"
                        type="button"
                        onClick={() => handleSignOut()}
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                >
                  <p className="text-white uppercase cursor-pointer">{user}</p>
                </Popover>
              ) : (
                <Popover
                  trigger={["click"]}
                  placement="right"
                  content={() => (
                    <div className="flex justify-center">
                      <button
                        className="bg-red-600 text-white border-[1px] hover:bg-red-500 hover:border-red-600 flex justify-center rounded-md px-3 py-1"
                        type="button"
                        onClick={() => handleSignOut()}
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                >
                  <Avatar
                    style={{ backgroundColor: "#fb923c" }}
                    className="flex items-center justify-center w-10 h-10 cursor-pointer"
                    shape="square"
                  >
                    {user.includes("fk")
                      ? "FK"
                      : user.includes("jt")
                      ? "JT"
                      : "U"}
                  </Avatar>
                </Popover>
              )}
            </div>
          </div>
        </Sider>
        <Layout className="layoutClass2">
          <Content className="p-3 sm:p-7" style={{ background: "#f5f5f4" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center", background: "#f5f5f4" }}>
            ©2023 Justransform - All Rights Reserved.
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default React.memo(Dashboard);
