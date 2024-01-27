import React, { useEffect, useRef, useState } from "react";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { Document, Page, pdfjs } from 'react-pdf'
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfCarousel = ({ selectedTopic, content }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function onDocumentLoadError(error) {
    console.error("Error loading PDF:", error);
    // setLoading(false);
  }

  useEffect(() => {
    setActiveIndex(0);
  }, [selectedTopic]);

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
        {content.map((item, index) => (
          <div
            key={index}
            className={`max-w-sm ${
              index === activeIndex ? "" : "hidden"
            } rounded my-4 overflow-hidden h-24 shadow-lg`}
            data-carousel-item
          >
            {item.pdfFile ? (
              <Document
                file={item.pdfFile}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            ) : (
              <p>No PDF file available for this item</p>
            )}
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

export default PdfCarousel;
