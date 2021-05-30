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
        <h1>PayItForward</h1>
      </Link>
      <Link to="/about">
        <button>About</button>
      </Link>
      {TokenService.hasAuthToken() ? (
        <>
          <Link to="/dashboard">
            <button>Dashboard</button>
          </Link>
          {type === "user" ? (
            <>
              <Link to="/newdonation">
                <button>New Donation</button>
              </Link>
              <Link to="/yourdonations">
                <button>Your Donations</button>
              </Link>
            </>
          ) : (
            <Link to="/orgprofile">
              <button>Profile</button>
            </Link>
          )}

          <Link to="/messages">
            <button>Messages</button>
          </Link>

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
          <Link to="/register">
            <button>Register</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
