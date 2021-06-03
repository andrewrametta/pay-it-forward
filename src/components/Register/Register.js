import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { FaUserPlus, FaBuilding } from "react-icons/fa";

function Register() {
  return (
    <div className="register-container">
      <h1>Register</h1>
      <div className="register-item">
        <Link to="/registeruser">
          <button>
            <FaUserPlus color="#692fd3" size="2em" /> Join as User
          </button>
        </Link>
      </div>
      <div className="register-item">
        <Link to="/registerorg">
          <button>
            <FaBuilding color="#692fd3" size="2em" /> Join as Organization
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Register;
