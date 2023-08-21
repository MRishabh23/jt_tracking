import React, { useState } from "react";
import { Link } from "react-router-dom";
import Truck from "../../assets/truck.avif";
import Air from "../../assets/Air.avif";
import Ocean from "../../assets/Ocean.avif";

const Landing: React.FC = () => {
  const imageList = [
    {
      "image": `${Ocean}`,
      "content": "OCEAN",
      "route": "ocean",
      "onHover": false
    },
    {
      "image": `${Air}`,
      "content": "AIR",
      "route": "air",
      "onHover": false
    },
    {
      "image": `${Truck}`,
      "content": "LTL",
      "route": "ltl",
      "onHover": false
    }
  ]
  
  const [hover, setHover] = useState(imageList);

  const handleHover = (content: string) => {
    const updatedHover = hover.map((item) => {
        if(item.content == content){
          item.onHover = !item.onHover
        }
        return item
    })
    setHover(updatedHover)
  }

  return (
    <div className="flex flex-col h-screen bg-stone-50">
      <header className="flex-[1_1_0%] flex justify-center items-center bg-primary1">
        <h1 className="text-2xl font-semibold tracking-wider text-white xxs:text-3xl xs:text-4xl">SHIPMENT TRACKING</h1>
      </header>
      <main className="flex-[10_10_0%] flex justify-center items-center">
        <div className="flex flex-wrap items-center justify-center gap-10 p-10">
          {hover.map((item, index) => ( 
              <Link key={index} to={`/dashboard/${item.route}/`}>
                <div onMouseEnter={() => handleHover(item.content)} onMouseLeave={() => handleHover(item.content)} className="relative transition duration-500 ease-in-out cursor-pointer w-72 md:w-80 lg:w-96 hover:shadow-lg hover:scale-105">
                  <img loading="lazy" className="w-full h-full rounded-lg" src={item.image} alt="ocean" />
                  <div className="absolute inset-0 flex items-center justify-center text-xl font-medium text-white rounded-lg hover:bg-black/25">
                    {item.onHover ? item.content : ""}
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      </main>
      <footer className="flex-[1_1_0%] flex justify-center items-center">
          <span>©2023 Justransform - All Rights Reserved.</span>
      </footer>
    </div>
  );
};

export default React.memo(Landing);
