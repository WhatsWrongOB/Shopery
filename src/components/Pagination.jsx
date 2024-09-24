import React, { useState } from "react";

const Pagination = ({ noOfPages, curPage, newPage }) => {
  const [currentPage, setCurrentPage] = useState(curPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= noOfPages) {
      setCurrentPage(page);
      newPage(page);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        className={`text-sm border p-2 rounded-md transition-colors 
          ${
            currentPage === 1
              ? "bg-gray-200 cursor-not-allowed text-gray-500"
              : "bg-white hover:bg-blue-100 hover:text-blue-600 shadow-sm"
          }
        `}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <div className="flex space-x-2">
        {Array.from({ length: noOfPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`text-sm border p-2 px-4 rounded-md transition-all
              ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white shadow-lg scale-110"
                  : "bg-white hover:bg-blue-100 hover:text-blue-600 shadow-sm"
              }
            `}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        className={`text-sm border p-2 rounded-md transition-colors 
          ${
            currentPage === noOfPages
              ? "bg-gray-200 cursor-not-allowed text-gray-500"
              : "bg-white hover:bg-blue-100 hover:text-blue-600 shadow-sm"
          }
        `}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === noOfPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
