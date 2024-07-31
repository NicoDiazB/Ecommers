"use client";

import React, { useState } from "react";

const Carousel: React.FC = () => {
  const [carru, setCarru] = useState<number>(0);
  const images: string[] = [
    "/pexels-pixabay-4158.jpg",
    "/pexels-anete-lusina-4790255.jpg",
    "pexels-ingo-1682821.jpg",
  ];

  const prev = (): void => {
    setCarru((carru) => (carru === 0 ? images.length - 1 : carru - 1));
  };
  const next = (): void => {
    setCarru((carru) => (carru === images.length - 1 ? 0 : carru + 1));
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${carru * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="max-h-[440px] min-h-[20%] w-full flex-shrink-0 lg:w-[screen]"
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="rounded-full bg-secundary p-2 text-soft-letter shadow-card-shadow"
        >
          <img src="/left.svg" alt="left rrow" />
        </button>
        <button
          onClick={next}
          className="rounded-full bg-secundary p-2 text-soft-letter shadow-card-shadow"
        >
          <img src="/rigth.svg" alt="rigth arrow" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-input-bg/100 to-transparent"></div>
    </div>
  );
};

export default Carousel;
