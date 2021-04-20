import React from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import "./Navbar.css";

function Navbar(props) {
  const logout = () => {
    TokenService.clearAuthToken();
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
          <Link to="/donordashboard">
            <button>Donor Dashboard</button>
          </Link>
          <Link to="/organizationdashboard">
            <button>OrganizationDashboard</button>
          </Link>
          <Link to="/newdonation">
            <button>New Donation</button>
          </Link>
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
