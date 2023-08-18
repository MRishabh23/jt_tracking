import React, { useEffect, useState } from "react";
import { Layout, Menu, MenuProps, Drawer } from "antd";
import jtLogo from "../../assets/jtLogo.png";
import jtSoloLogo from "../../assets/jtSoloLogo.png";
import { Link, Outlet } from "react-router-dom";
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
  const [collapsed, setCollapsed] = useState(false);
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

  useEffect(() => {
    //console.log("objVal", obj)
  }, []);

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
          />
          <CustomMenu
            name="Reference"
            child={["List", "History"]}
            open={ref}
            setOpen={setRef}
          />
        </div>
      </Drawer>
    );
  };

  return (
    <>
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
            <Link to="/" className="hover:text-white/70">
              <h1 className="text-lg text-white leading-[4rem] sm:text-2xl font-semibold sm:leading-[4rem] text-center">
                SHIPMENT TRACKING
              </h1>
            </Link>
          </div>
        </Header>
        <Sider
          className="hidden lg:block"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          breakpoint="xl"
        >
          <div className="my-5">
            <Link to="/">
              <img
                className="h-8 mx-auto"
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
    </>
  );
};

export default Dashboard;
