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
    <div className="navbar-wrapper">
      <Link className="logo" to="/">
        <img className="logo-image" src="/logo.svg" alt="Pay it Forward" />
      </Link>

      <div className="link-wrapper">
        {TokenService.hasAuthToken() ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            {type === "user" ? (
              <>
                <Link to="/newdonation">New Donation</Link>
                <Link to="/yourdonations">Your Donations</Link>
              </>
            ) : (
              <Link to="/orgprofile">Profile</Link>
            )}

            <Link to="/messages">Messages</Link>

            <button
              className="button"
              aria-label="logout-button"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
        <Link to="/about">About</Link>
      </div>
    </div>
  );
}

export default Navbar;
