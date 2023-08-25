import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Truck from "../../assets/truck.avif";
import Air from "../../assets/Air.avif";
import Ocean from "../../assets/Ocean.avif";
import { Avatar, Dropdown } from "antd";

interface props {}

const Landing: React.FC<props> = () => {
  const imageList = [
    {
      image: `${Ocean}`,
      content: "OCEAN",
      route: "ocean",
      onHover: false,
    },
    {
      image: `${Air}`,
      content: "AIR",
      route: "air",
      onHover: false,
    },
    {
      image: `${Truck}`,
      content: "LTL",
      route: "ltl",
      onHover: false,
    },
  ];

  const [hover, setHover] = useState(imageList);
  const [user, setUser] = useState("")

  const navigate = useNavigate()

  const handleHover = (content: string) => {
    const updatedHover = hover.map((item) => {
      if (item.content == content) {
        item.onHover = !item.onHover;
      }
      return item;
    });
    setHover(updatedHover);
  };

  const handleSignOut = () => {
    localStorage.setItem("UserName", "")
    navigate("/");
    window.location.reload();
  }

  useEffect(() => {
    const controller = new AbortController();
    const u: any = localStorage.getItem("UserName")
    if(u != ""){
      setUser(u);
    }
    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen bg-stone-50">
        <header className="flex-[1_1_0%] flex justify-between items-center bg-primary1 px-3 xl:px-8 2xl:px-14">
          <h1 className="text-2xl font-semibold tracking-wider text-white xxs:text-3xl xs:text-4xl">
            SHIPMENT TRACKING
          </h1>
          <div>
            <Dropdown
              trigger={["click"]}
              dropdownRender={() => (
                <div className="p-6 bg-white rounded-md shadow-2xl">
                  <p className="mb-2 text-lg font-medium">Welcome, <span className="uppercase text-amber-400">{user}</span></p>
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
                {user !== null && user !== "" && user.includes("fk") ? "FK" :user !== null && user !== "" && user.includes("jt") ? "JT" : "U"}
              </Avatar>
            </Dropdown>
          </div>
        </header>
        <main className="flex-[10_10_0%] flex justify-center items-center">
          <div className="flex flex-wrap items-center justify-center gap-10 p-10">
            {hover.map((item, index) => (
              <Link key={index} to={`/dashboard/${item.route}/`}>
                <div
                  onMouseEnter={() => handleHover(item.content)}
                  onMouseLeave={() => handleHover(item.content)}
                  className="relative transition duration-500 ease-in-out cursor-pointer w-72 md:w-80 lg:w-96 hover:shadow-lg hover:scale-105"
                >
                  <img
                    loading="lazy"
                    className="w-full h-full rounded-lg"
                    src={item.image}
                    alt="ocean"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-xl font-medium text-white rounded-lg hover:bg-black/25">
                    {item.onHover ? item.content : ""}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
        <footer className="flex-[1_1_0%] flex justify-center items-center">
          <span>©2023 Justransform - All Rights Reserved.</span>
        </footer>
      </div>
    </>
  );
};

export default React.memo(Landing);
