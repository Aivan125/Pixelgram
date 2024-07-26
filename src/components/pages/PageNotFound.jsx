import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      <div className="relative mb-8">
        <div className="absolute -inset-0.5 rounded-full bg-gray-800 blur"></div>
        <div className="relative flex items-center justify-center rounded-full bg-gray-800 p-8">
          <h1 className="text-9xl font-bold">404</h1>
          <div
            className="absolute h-2 w-2 animate-pulse rounded-full bg-red-500"
            style={{ top: "10%", right: "10%" }}
          ></div>
          <div
            className="absolute h-2 w-2 animate-pulse rounded-full bg-blue-500"
            style={{ bottom: "10%", left: "10%" }}
          ></div>
          <div
            className="absolute h-1 w-1 animate-pulse rounded-full bg-yellow-500"
            style={{ top: "50%", right: "5%" }}
          ></div>
        </div>
      </div>

      <h2 className="mb-8 text-4xl font-bold">Page Not Found</h2>

      <img
        src="/assets/icons/astronaut.svg"
        alt="Astronaut floating in space"
        className="animate-float mb-8 w-64"
      />

      <p className="mb-8 text-xl text-blue-300">
        Oops! Looks like you&apos;ve drifted into unknown space.
      </p>

      <Link
        to="/"
        className="rounded-full bg-blue-500 px-6 py-3 text-lg font-semibold transition-colors hover:bg-blue-600"
      >
        Return to Earth
      </Link>

      <div className="absolute bottom-4 right-4">
        <img src="/path-to-your-logo.png" alt="Logo" className="h-8 w-8" />
      </div>
    </div>
  );
};

export default PageNotFound;
