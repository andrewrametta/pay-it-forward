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
            <form className="register form">
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
              <div>
                <label className="label" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="address"
                />
              </div>
              <div>
                <label className="label" htmlFor="city">
                  City
                </label>
                <input type="text" name="city" id="city" placeholder="city" />
              </div>
              <div>
                <label className="label" htmlFor="ST">
                  ST
                </label>
                <input type="text" name="ST" id="ST" placeholder="ST" />
              </div>
              <div>
                <label className="label" htmlFor="zipcode">
                  zipcode
                </label>
                <input
                  type="text"
                  name="zipcode"
                  id="zipcode"
                  placeholder="zipcode"
                  pattern="[0-9]{5}"
                  title="Five digit zip code"
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
