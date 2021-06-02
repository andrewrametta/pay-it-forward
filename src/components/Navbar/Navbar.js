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

  return (
    <nav className="navbar-wrapper">
      <Link className="logo" to="/">
        <img className="logo-image" src="/logo.svg" alt="Pay it Forward" />
      </Link>
      <ul className="hamburger">
        <li className="line"></li>
        <li className="line"></li>
        <li className="line"></li>
      </ul>
      <ul className="link-wrapper">
        {TokenService.hasAuthToken() ? (
          <>
            <li className="nav-item">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            {type === "user" ? (
              <>
                <li className="nav-item">
                  <Link to="/newdonation">New Donation</Link>
                </li>
                <li className="nav-item">
                  <Link to="/yourdonations">Your Donations</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/orgprofile">Profile</Link>
              </li>
            )}
            <li className="nav-item">
              <Link to="/messages">Messages</Link>
            </li>
            <li className="nav-item">
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
            <li className="nav-item">
              <Link to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        <li className="nav-item">
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
