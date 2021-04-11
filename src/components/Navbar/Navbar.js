import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar-wrapper">
      <Link className="logo" to="/">
        <h1>PayItForward</h1>
      </Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/about">About</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/newdonation">New Donation</Link>
    </div>
  );
}

export default Navbar;
