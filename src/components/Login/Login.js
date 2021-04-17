import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login-wrapper">
      <section className="login-section">
        <header className="login-header">
          <h1>Login</h1>
        </header>
        <article>
          <div>
            <form className="login form">
              <div>
                <label className="label" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  defaultValue="username"
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
                  defaultValue="password"
                />
              </div>
              <div className="login-button">
                <button>Login</button>
              </div>
            </form>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Login;
