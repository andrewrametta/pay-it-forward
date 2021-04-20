import React, { useState } from "react";
import TokenService from "../../services/token-service";
import "./Login.css";

function Login(props) {
  const { error, setError } = useState("null");

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = e.target;
    const user = { username: username.value, password: password.value };
    //setError({ error: null });
    TokenService.saveAuthToken("hfdjshfds027cdkjs0");
    props.history.push("/dashboard");
  };

  return (
    <div className="login-wrapper">
      <section className="login-section">
        <header className="login-header">
          <h1>Login</h1>
        </header>
        <article>
          <div>
            <form
              className="login form"
              aria-label="login-form"
              onSubmit={handleLogin}
            >
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
                  type="password"
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
