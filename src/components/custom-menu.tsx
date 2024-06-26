import React from "react";
import { Link } from "react-router-dom";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

interface props {
  name: string;
  child: Array<string>;
  open: boolean;
  setOpen: Function;
  drawer: boolean;
  setDrawer: Function;
}

const CustomMenu: React.FC<props> = ({
  name,
  child,
  open,
  setOpen,
  drawer,
  setDrawer,
}) => {
  let refStr = "";
  let sumStr = "queue=NORMAL";
  if (name === "Air") {
    refStr = "carriers=atlasair&active=yes&referenceType=AWB";
  } else if (name === "Ocean") {
    refStr = "carriers=acl&active=yes&referenceType=BOOKING";
  }

  return (
    <div>
      <div className="flex items-center justify-between cursor-pointer">
        <Link
          to={`/${name.toLowerCase()}`}
          className="hover:text-black/70"
          onClick={() => setDrawer(!drawer)}
        >
          <p className="text-xl">{name}</p>
        </Link>
        <span>
          <BiChevronDown
            onClick={() => setOpen(!open)}
            className={`text-xl ${open ? "hidden" : "block"}`}
          />
          <BiChevronUp
            onClick={() => setOpen(!open)}
            className={`text-xl ${open ? "block" : "hidden"}`}
          />
        </span>
      </div>
      <div
        className={
          open ? `block transition duration-400 ease-in-out` : `hidden`
        }
      >
        {child.map((c: any, index) =>
          c === "Summary" ? (
            <Link
              key={index}
              to={`/${name.toLowerCase()}/${c.toLowerCase()}?${sumStr}`}
              onClick={() => setDrawer(!drawer)}
            >
              <p className="ml-4 text-lg">{c}</p>
            </Link>
          ) : c === "Reference" ? (
            <Link
              key={index}
              to={`/${name.toLowerCase()}/${c.toLowerCase()}?${refStr}`}
              onClick={() => setDrawer(!drawer)}
            >
              <p className="ml-4 text-lg">{c}</p>
            </Link>
          ) : (
            <Link
              key={index}
              to={`/${name.toLowerCase()}/${c.toLowerCase()}`}
              onClick={() => setDrawer(!drawer)}
            >
              <p className="ml-4 text-lg">{c}</p>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default React.memo(CustomMenu);
