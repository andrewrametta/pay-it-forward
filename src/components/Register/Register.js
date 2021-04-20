import React from "react";
import "./Register.css";

function Register() {
  return (
    <div className="register-wrapper">
      <section className="register-section">
        <header className="register-header">
          <h1>Register</h1>
        </header>
        <article>
          <div>
            <label className="label" htmlFor="usertype">
              User Type
            </label>
            <select id="usertype" name="usertype">
              <option value="donor">Donor</option>
              <option value="organization">Organization</option>
            </select>
          </div>
          <div>
            <form className="register form">
              <div>
                <label className="label" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                />
              </div>
              <div>
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                />
              </div>
              <div>
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  placeholder="password"
                />
              </div>
              <div className="register-button">
                <button>Register</button>
              </div>
            </form>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Register;
