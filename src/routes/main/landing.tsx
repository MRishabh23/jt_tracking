import React, { useState } from "react";
import { Link } from "react-router-dom";
import { imageList } from "../../data/navdata";

interface props {}

const Landing: React.FC<props> = () => {
  const [hover, setHover] = useState(imageList);

  const handleHover = (content: string) => {
    const updatedHover = hover.map((item) => {
      if (item.content == content) {
        item.onHover = !item.onHover;
      }
      return item;
    });
    setHover(updatedHover);
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-full p-3">
      <div className="flex flex-wrap items-center justify-center gap-10">
        {hover.map((item, index) => (
          <Link key={index} to={`/${item.route}`}>
            <div
              onMouseEnter={() => handleHover(item.content)}
              onMouseLeave={() => handleHover(item.content)}
              onClick={() => handleHover(item.content)}
              className="relative transition duration-500 ease-in-out cursor-pointer w-72 md:w-80 lg:w-96 hover:shadow-lg hover:scale-105"
            >
              <img
                loading="lazy"
                className="w-full h-full rounded-lg"
                src={item.image}
                alt={item.route}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xl font-medium text-white rounded-lg hover:bg-black/25">
                {item.onHover ? item.content : ""}
              </div>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </>
  );
};

export default React.memo(Landing);
