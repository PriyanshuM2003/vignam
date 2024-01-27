import React, { useState } from "react";

const AddVideo = () => {
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState([]);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleVideoSubmit = (e) => {
    e.preventDefault();

    const newVideoUrl = e.target.elements.name.value.trim();

    if (!newVideoUrl) {
      alert("Please enter a valid video URL");
      return;
    }

    setVideoUrl((prevUrls) => [...prevUrls, newVideoUrl]);

    localStorage.setItem(
      "videoUrl",
      JSON.stringify([...videoUrl, newVideoUrl])
    );
    closeModal();
  };

  return (
    <>
      <div className="block py-10">
        <h1 className="md:text-2xl text-lg text-white font-semibold mb-4">
          Your Videos
        </h1>
        <p className="md:text-lg text-white font-medium mb-4">
          Lorem ipsum dolor sit amet
        </p>
        <button
          onClick={openModal}
          className="bg-transparent text-white font-semibold py-2 md:px-10 px-6 border border-white rounded"
        >
          Add
        </button>
      </div>
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          showModal ? "fixed" : "hidden"
        } top-0 right-0 left-0 flex overflow-y-auto overflow-x-hidden z-50 items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black opacity-50"
        ></div>
        <div className="relative p-4 w-full max-w-md max-h-full z-10 overflow-y-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Video
              </h3>
              <button
                onClick={closeModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={handleVideoSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    URL
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Paste URL"
                    required=""
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add Video
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVideo;
