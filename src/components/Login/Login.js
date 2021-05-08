import React, { useState, useContext } from "react";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";
import AppContext from "../../AppContext";
import "./Login.css";

function Login(props) {
  const { error, setError } = useState("null");
  const context = useContext(AppContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = e.target;
    const user = { username: username.value, password: password.value };
    setError({ error: null });
    AuthApiService.loginUser(user)
      .then((loginResponse) => {
        // store auth token in local storage
        TokenService.saveAuthToken(loginResponse.authToken);
        context.setUserType(loginResponse.authToken.type);
        props.history.push("/dashboard");
      })
      .catch((res) => {
        setError({ error: res.error });
      });
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
