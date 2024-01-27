import React from "react";
import Header from "../components/header";
import Content from "./content";
import { Excalidraw } from "@excalidraw/excalidraw";
import AddVideo from "./addVideo";
import VideoCarousel from "../components/videoCarousel";

const Home = () => {
  return (
    <>
      <div className="md:px-6 md:w-full w-[89%]">
        <Header />
        <div className="px-1">
        <div className="flex rounded-lg mt-4 justify-between px-6 items-center bg-teal-500">
          <AddVideo />
          <VideoCarousel />
        </div>
        </div>
        <div className="flex items-center mt-6 justify-between">
          <div className="md:w-[700px] w-full md:border-r-2 md:h-[370px] md:border-gray-400">
            <Content />
          </div>
          <div className="md:w-full hidden md:block h-[370px]">
            <Excalidraw />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
