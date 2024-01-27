import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { PiHouse } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { LiaClipboardListSolid } from "react-icons/lia";
import { RxAvatar } from "react-icons/rx";
import { BsCameraVideo } from "react-icons/bs";
import { RiGroupLine } from "react-icons/ri";
import { TbMessageCircleQuestion } from "react-icons/tb";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Siderbar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div
          className={`sidebar min-h-screen ${
            collapsed ? "md:w-56" : "md:w-[3.35rem]"
          } shadow-xl shadow-slate-400 w-0 md:bg-white overflow-hidden border-r`}
        >
          <div className="flex h-screen flex-col justify-between pt-2 pb-6">
            <div>
              <div className="flex min-w-max items-center hover:text-blue-700 space-x-4 rounded-full px-4 py-3 text-gray-600">
                <RxAvatar className="text-2xl" />
                <span>School</span>
              </div>
              <ul className="mt-6 max-md:flex w-[89%] z-50 max-md:items-center max-md:justify-center max-md:fixed max-md:bottom-0 max-md:bg-white space-y-2 cursor-pointer tracking-wide">
                <li className="max-md:hidden min-w-max">
                  <div
                    onClick={handleCollapseToggle}
                    className="relative flex items-center space-x-4 px-4 py-3 hover:text-blue-700 text-gray-600"
                  >
                    {collapsed ? (
                      <IoMdClose className="text-2xl" />
                    ) : (
                      <FaArrowRightFromBracket className="text-2xl" />
                    )}
                    <span>Collapse</span>
                  </div>
                </li>
                <li className="min-w-max">
                  <div className="group flex items-center hover:text-blue-700 space-x-4 rounded-full px-4 py-3 text-gray-600">
                    <PiHouse className="text-2xl" />
                    <span className="max-md:hidden">Dashboard</span>
                  </div>
                </li>
                <li className="min-w-max">
                  <div className="group flex items-center hover:text-blue-700 space-x-4 rounded-md px-4 py-3 text-blue-700">
                    <GiTeacher className="text-2xl" />
                    <span className="max-md:hidden">Teach</span>
                  </div>
                </li>
                <li className="min-w-max">
                  <div className="group flex items-center space-x-4 rounded-md px-4 py-3 hover:text-blue-700 text-gray-600">
                    <LiaClipboardListSolid className="text-2xl" />
                    <span className="max-md:hidden">Test</span>
                  </div>
                </li>
                <li className="min-w-max">
                  <div className="group flex items-center space-x-4 rounded-md px-4 py-3 hover:text-blue-700 text-gray-600">
                    <BsCameraVideo className="text-2xl" />
                    <span className="max-md:hidden">Take Class</span>
                  </div>
                </li>
                <li className="min-w-max">
                  <div className="group flex items-center space-x-4 rounded-md px-4 py-3 hover:text-blue-700 text-gray-600">
                    <RiGroupLine className="text-2xl" />
                    <span className="max-md:hidden">Video Library</span>
                  </div>
                </li>
                <li className="min-w-max">
                  <div className="group flex items-center space-x-4 rounded-md px-4 py-3 hover:text-blue-700 text-gray-600">
                    <TbMessageCircleQuestion className="text-2xl" />
                    <span className="max-md:hidden">Doubts</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="max-md:hidden min-w-max -mb-3">
              <div className="group flex items-center space-x-4 rounded-md px-4 py-3 hover:text-blue-700 text-gray-600">
                <RxAvatar className="text-2xl" />
                <span>User</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Siderbar;
