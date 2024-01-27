import React, { useEffect, useRef, useState } from "react";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

const VideoCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const [videoUrl, setVideoUrl] = useState([]);

  useEffect(() => {
    const storedVideoUrls = localStorage.getItem("videoUrl");
    if (storedVideoUrls) {
      setVideoUrl(JSON.parse(storedVideoUrls));
    }
  }, []);

  useEffect(() => {
    const carouselItems = carouselRef.current.querySelectorAll(
      "[data-carousel-item]"
    );

    const showItem = (index) => {
      carouselItems.forEach((item, i) => {
        item.classList.toggle("hidden", i !== index);
      });
    };

    showItem(activeIndex);
  }, [activeIndex]);

  const handlePrev = () => {
    const carouselItems = carouselRef.current.querySelectorAll(
      "[data-carousel-item]"
    );
    const totalItems = carouselItems.length;
    setActiveIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : totalItems - 1
    );
  };

  const handleNext = () => {
    const carouselItems = carouselRef.current.querySelectorAll(
      "[data-carousel-item]"
    );
    const totalItems = carouselItems.length;
    setActiveIndex((prevIndex) =>
      prevIndex < totalItems - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <>
      <div
        ref={carouselRef}
        id="animation-carousel"
        className="flex flex-row items-center md:w-1/2"
        data-carousel="static"
      >
        <button
          type="button"
          className="z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handlePrev}
          data-carousel-prev
        >
          <div className="block bg-white shadow-lg px-1 rounded-full h-6 w-6">
            <MdArrowBackIos className="ml-1 mt-1" />
          </div>
        </button>
        {videoUrl.map((url, index) => (
          <div
            key={index}
            className={`max-w-sm my-4 rounded overflow-hidden shadow-lg ${
              activeIndex !== index ? "hidden" : ""
            }`}
            data-carousel-item
          >
            <iframe
              title={`Video-${index}`}
              width="100%"
              height="200"
              src={url}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
        <button
          type="button"
          className="z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
          onClick={handleNext}
        >
          <div className="block bg-white shadow-lg rounded-full h-6 w-6">
            <MdArrowForwardIos className="ml-1 mt-1" />
          </div>
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
