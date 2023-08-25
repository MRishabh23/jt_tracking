import React from "react";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex content-center justify-center h-full bg-red-100">
      <div className="my-auto">
        <h1 className="text-5xl font-bold">Oops!</h1>
        <p className="text-xl">
          Sorry, an unexpected error has occurred.{" "}
          <Link to="/" className="text-blue-700 underline hover:text-blue-600">
            home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default React.memo(ErrorPage);