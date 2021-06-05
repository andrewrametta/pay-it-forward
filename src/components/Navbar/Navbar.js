import React, { useContext } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import AppContext from "../../AppContext";
import "./Navbar.css";

function Navbar(props) {
  const { type, setType, setIsLogged, setUserId } = useContext(AppContext);

  const logout = () => {
    TokenService.clearAuthToken();
    TokenService.clearUserType();
    TokenService.clearUserId();
    TokenService.clearUserName();
    setIsLogged(null);
    setType(null);
    setUserId(null);
    setIsLogged(false);
    props.history.push("/");
  };

  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links li");

  const handleClick = () => {
    navLinks.classList.toggle("open");
    links.forEach((link) => {
      link.classList.toggle("fade");
    });
  };

  return (
    <nav className="navbar-wrapper">
      <Link className="logo" to="/">
        <img className="logo-image" src="/logo.svg" alt="Pay it Forward" />
      </Link>
      <div className="hamburger" onClick={handleClick}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <ul className="nav-links">
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
            ) : (
              <li className="nav-item" onClick={handleClick}>
                <Link to="/orgprofile">Profile</Link>
              </li>
            )}
            <li className="nav-item" onClick={handleClick}>
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
  );
}

export default Navbar;
