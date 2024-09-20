import React from "react";
import pageNotFoundGIF from "../data/anime.gif";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <span className="font-bold text-7xl absolute inset-y-28 ">404</span>
      <img src={pageNotFoundGIF} alt="Page Not Found GIF!" />
      <span className="font-bold text-7xl absolute inset-y-[33rem] ">
        Page Not Found
      </span>
      <button
        className="mt-[-2rem] px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
        onClick={navigateToHome}
      >
        Go Home
      </button>
    </div>
  );
};

export default PageNotFound;
