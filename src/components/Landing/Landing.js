import React from "react";
import "./Landing.css";
import { FaBoxOpen, FaPeopleCarry } from "react-icons/fa";

function Landing() {
  return (
    <div className="landing-wrapper">
      <h1 className="tagline">
        You can make a difference in the lives of others
      </h1>
      <div className="landing-container">
        <div className="landing-item">
          <div className="react-icon">
            <FaBoxOpen color="#692fd3" size="8em" />
          </div>
          <h2>Got something to donate?</h2>
          <p>
            We connect your posted donation with local nonprofits in your area.
            Just upload a picture of the item you want to donate and wait for a
            nonprofit to connect with you through our messaging service.
          </p>
        </div>
        <div className="landing-item">
          <div className="react-icon">
            <FaPeopleCarry color="#692fd3" size="8em" />
          </div>

          <h2>Join our network today!</h2>
          <p>
            We make it simple and easy for you to find a good home for the
            things that you want to give away.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
