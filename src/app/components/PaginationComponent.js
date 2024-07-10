import React from "react";

const PaginationComponent = ({ currentPage, onPageChange }) => {
  const handleDecreasePage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      console.log("Se hizo click en disminuir:", currentPage - 1);
    }
  };

  const handleIncreasePage = () => {
    onPageChange(currentPage + 1);
    console.log("Se hizo click en aumentar:", currentPage + 1);
  };

  return (
    <nav aria-label="Page navigation" className="mt-4">
      <ul className="inline-flex space-x-2">
        <li>
          <button
            className={`flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100 ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleDecreasePage}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
                console.log("Se hizo click en:", currentPage - 1);
              }
            }}
            className={`w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100 ${
              currentPage === 1 ? "bg-indigo-100" : ""
            }`}
          >
            {currentPage - 1 >= 1 ? currentPage - 1 : ""}
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              onPageChange(currentPage);
              console.log("Se hizo click en:", currentPage);
            }}
            className={`w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100 ${
              currentPage === 1 ? "bg-indigo-100" : ""
            }`}
          >
            {currentPage}
          </button>
        </li>
        <li>
          <button
            onClick={handleIncreasePage}
            className={`w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100`}
          >
            {currentPage + 1}
          </button>
        </li>
        <li>
          <button
            className={`flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100 ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleIncreasePage}
          >
            {">"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
