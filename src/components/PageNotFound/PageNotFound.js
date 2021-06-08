import React from "react";
import "./PageNotFound.css";

function PageNotFound() {
  return (
    <div className="page-not-found-container">
      <h1 className="error-message">404</h1>
      <h2 className="error-message">Page Not Found</h2>
      <img
        src="https://memegenerator.net/img/images/12175150.jpg"
        alt="sad-puppy"
      />
    </div>
  );
}

export default PageNotFound;
