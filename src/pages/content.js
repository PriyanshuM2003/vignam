import React, { useState } from "react";
import { ImFileText } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import PdfCarousel from "../components/pdfCarousel";

const Content = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [topicName, setTopicName] = useState("");
  const [personalizedContent, setPersonalizedContent] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [contentDescription, setContentDescription] = useState("");

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setShowModal(false);
    setTopicName("");
    setPersonalizedContent("");
    setPdfFile(null);
  };

  const openModal2 = (e) => {
    e.preventDefault();
    setShowModal2(true);
  };

  const closeModal2 = (e) => {
    e.preventDefault();
    setShowModal2(false);
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    setPdfFile(selectedFile);
  };

  const handleDescriptionChange = (e) => {
    setContentDescription(e.target.value);
  };

  const addContent = (e) => {
    e.preventDefault();

    if (pdfFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const contentData = {
          topicName,
          personalizedContent,
          pdfFile: reader.result,
        };

        const existingContent =
          JSON.parse(localStorage.getItem("content")) || [];
        const newContent = [...existingContent, contentData];

        localStorage.setItem("content", JSON.stringify(newContent));

        setShowModal(false);
        setTopicName("");
        setPersonalizedContent("");
        setPdfFile(null);
      };

      reader.readAsDataURL(pdfFile);
    }
    window.location.reload()
  };

  const saveDescription = (e) => {
    e.preventDefault();

    setPersonalizedContent(contentDescription);

    setShowModal2(false);

    setContentDescription("");
  };

  const Content = JSON.parse(localStorage.getItem("content")) || [];
  const storedTopics = [...new Set(Content.map((item) => item.topicName))];
  const topics = storedTopics.length ? storedTopics : [];
  const initialSelectedTopic = topics.length > 0 ? topics[0] : "";
  const [selectedTopic, setSelectedTopic] = useState(initialSelectedTopic);
  const filteredContent = Content.filter(
    (item) => item.topicName === selectedTopic
  );

  const handleDeleteClick = (topic) => {
    const existingContent = JSON.parse(localStorage.getItem("content")) || [];
    const updatedContent = existingContent.filter(
      (item) => item.topicName !== topic
    );

    localStorage.setItem("content", JSON.stringify(updatedContent));
    alert(`Content for topic "${topic}" has been deleted.`);
    window.location.reload()
  };

  return (
    <>
      {Content.length > 0 ? (
        filteredContent.map((item, index) => (
          <div key={index} className="flex justify-center flex-col md:px-2">
            <div className=" flex md:justify-between items-center">
              <div className="flex items-center md:space-x-4">
                <div className="flex items-center">
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="md:ml-2 p-2 font-semibold rounded-md"
                  >
                    {topics.map((topic, index) => (
                      <option key={index} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>
                <TiEdit className="text-gray-500 text-xl cursor-pointer" />
                <MdOutlineDelete
                  onClick={() => handleDeleteClick(selectedTopic)}
                  className="text-gray-500 text-xl cursor-pointer"
                />
              </div>
              <button
                onClick={openModal}
                className="bg-transparent max-md:text-sm max-md:ml-6 flex items-center font-semibold md:py-2 md:px-4 p-2 border border-gray-500 rounded-full"
              >
                <IoMdAdd className="text-2xl" />
                Add content
              </button>
            </div>
            <div>
              <PdfCarousel
                selectedTopic={selectedTopic}
                content={filteredContent}
              />
            </div>
            <div className="md:max-h-56 md:overflow-y-auto p-4">
              <p>{item.personalizedContent}</p>
            </div>
          </div>
        ))
      ) : (
        <>
          <div className="flex flex-col items-center justify-center h-full">
            <ImFileText className="text-5xl mb-4" />
            <h1 className="text-2xl font-medium mb-4">
              Content not added yet!
            </h1>
            <button
              onClick={openModal}
              className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
            >
              Add content
            </button>
          </div>
        </>
      )}

      {/* ***************************************************************************************************************** */}
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
                Add Content
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
            <form className="p-4 md:p-5">
              <div className="mb-4">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Topic Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Topic Name"
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                    required=""
                  />
                </div>
                <div className="flex items-center mt-4 justify-center space-x-2">
                  <button
                    onClick={openModal2}
                    className="bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-14 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    Type your own Personzlized content
                  </button>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="pdfFileInput"
                  />
                  <label
                    htmlFor="pdfFileInput"
                    className="bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-14 px-6 border border-blue-500 hover:border-transparent rounded cursor-pointer"
                  >
                    Upload a pdf of your content
                  </label>
                </div>
              </div>
              <div className="flex items-center space-x-2 justify-end">
                <button
                  onClick={closeModal}
                  type="submit"
                  className="inline-flex items-center bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-white border-gray-400 border-2 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-white dark:focus:ring-white"
                >
                  Cancel
                </button>
                <button
                  onClick={addContent}
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                  Add Content
                </button>
              </div>
            </form>
          </div>
          <div
            id="crud-modal2"
            tabIndex="-1"
            aria-hidden="true"
            className={`${
              showModal2 ? "fixed" : "hidden"
            } top-0 right-0 left-0 flex overflow-y-auto overflow-x-hidden z-50 items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
          >
            <div
              onClick={closeModal2}
              className="fixed inset-0 bg-black opacity-50"
            ></div>
            <div className="relative p-4 w-full max-w-md max-h-full z-10 overflow-y-auto">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Type Content
                  </h3>
                  <button
                    onClick={closeModal2}
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
                <form className="p-4 md:p-5">
                  <div className="mb-4">
                    <div className="col-span-2">
                      <label
                        for="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Content
                      </label>
                      <textarea
                        id="description"
                        rows="15"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write product description here"
                        value={contentDescription}
                        onChange={handleDescriptionChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 justify-end">
                    <button
                      onClick={closeModal2}
                      type="submit"
                      className="inline-flex items-center bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-white border-gray-400 border-2 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-white dark:focus:ring-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveDescription}
                      type="submit"
                      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                      Save Content
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
