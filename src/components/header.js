import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoIosSearch, IoMdShare } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";

const Header = () => {
  return (
    <>
      <header className="text-gray-600 body-font border-b-2">
        <div className="mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex title-font font-bold justify-between items-center text-gray-900 mb-4 md:mb-0">
            <div className="flex md:hidden items-center mr-16">
              <IoChevronBackOutline className="text-3xl" />
              <span className="md:ml-3 text-xl">Chapter Name</span>
            </div>
            <div className="flex md:hidden items-center space-x-6">
              <IoIosSearch className="text-2xl" />
              <MdOutlineFileDownload className="text-2xl" />
              <IoMdShare className="text-2xl" />
            </div>
            <IoChevronBackOutline className="max-md:hidden text-3xl" />
            <span className="md:ml-3 max-md:hidden text-xl">Chapter Name</span>
          </div>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap font-semibold  items-center text-base justify-center">
            <div className="mr-5 py-4 text-black relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-blue-700 after:w-full after:mt-3">
              Teach
            </div>
            <div className="mr-5 text-gray-400">Worksheet</div>
            <div className="mr-5 text-gray-400">Mind-Map</div>
          </nav>
          <div className="flex max-md:hidden items-center space-x-6">
            <IoIosSearch className="text-2xl" />
            <MdOutlineFileDownload className="text-2xl" />
            <IoMdShare className="text-2xl" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
