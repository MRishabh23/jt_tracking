//import React from "react";
import { Link } from "react-router-dom";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const CustomMenu = ({ name, child, open, setOpen, drawer, setDrawer }: any) => {
  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between cursor-pointer"
      >
        <p className="text-xl">{name}</p>
        <span>
          <BiChevronDown className={`text-xl ${open ? "hidden" : "block"}`} />
          <BiChevronUp className={`text-xl ${open ? "block" : "hidden"}`} />
        </span>
      </div>
      <div className={open ? `block transition duration-400 ease-in-out` : `hidden`}>
        {child.map((c: any) => (
          <Link to={`/dashboard/${name.toLowerCase()}/${c.toLowerCase()}`} onClick={() => setDrawer(!drawer)}>
            <p className="ml-4 text-lg">{c}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CustomMenu;
