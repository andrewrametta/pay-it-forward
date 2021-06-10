import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import AppContext from "../../AppContext";
import "./Navbar.css";

function Navbar(props) {
  const { type, setType, setIsLogged, setUserId, setChatOn } = useContext(
    AppContext
  );

  const logout = () => {
    TokenService.clearAuthToken();
    TokenService.clearUserType();
    TokenService.clearUserId();
    TokenService.clearUserName();
    TokenService.clearUserURL();
    setIsLogged(null);
    setType(null);
    setUserId(null);
    setIsLogged(false);
    setChatOn(null);
    props.history.push("/");
  };

  useEffect(() => {
    const navToggle = document.querySelector(".nav-toggle");
    navToggle.addEventListener("click", handler);
    const navLinks = document.querySelectorAll(".nav-item");
    navLinks.forEach((link) => {
      link.addEventListener("click", handlerClose);
    });
    return () => {
      navToggle.removeEventListener("click", handler);
    };
  });

  const handlerClose = () => {
    document.body.classList.remove("nav-open");
  };

  const handler = () => {
    document.body.classList.toggle("nav-open");
  };

  const handleClick = () => {
    setChatOn(null);
  };

  const handleMessageClick = () => {
    setChatOn(true);
  };

  const handleLogoClick = () => {
    setChatOn(null);
  };

  return (
    <header>
      <div className="logo">
        <Link className="logo" to="/">
          <img
            onClick={handleLogoClick}
            className="logo-image"
            src="/logo.svg"
            alt="Pay it Forward"
          />
        </Link>
      </div>
      <button
        onClick={handleClick}
        className="nav-toggle"
        aria-label="toggle navigation"
      >
        <span className="hamburger"></span>
      </button>
      <nav className="nav">
        <ul className="nav-list">
          {TokenService.hasAuthToken() ? (
            <>
              <li className="nav-item" onClick={handleClick}>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              {type === "user" ? (
                <>
                  <li className="nav-item" onClick={handleClick}>
                    <Link to="/newdonation">New Donation</Link>
                  </li>
                  <li className="nav-item" onClick={handleClick}>
                    <Link to="/yourdonations">Your Donations</Link>
                  </li>
                </>
              ) : null}
              <li className="nav-item" onClick={handleMessageClick}>
                <Link to="/messages">Messages</Link>
              </li>
              <li className="nav-item" onClick={handleClick}>
                <button
                  className="button"
                  aria-label="logout-button"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item" onClick={handleClick}>
                <Link to="/register">Register</Link>
              </li>
              <li className="nav-item" onClick={handleClick}>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
