import React, { useState, useContext } from "react";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";
import AppContext from "../../AppContext";
import Spinner from "../Spinner/Spinner";
import "./Login.css";

function Login(props) {
  const [error, setError] = useState(null);
  const [loggedInState, setLoggedInState] = useState(null);
  const {
    setType,
    setIsLogged,
    setUserId,
    setUsername,
    setUserUrl,
  } = useContext(AppContext);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoggedInState(true);
    const { username, password } = e.target;
    const user = { username: username.value, password: password.value };
    setError(null);
    AuthApiService.loginUser(user)
      .then((loginResponse) => {
        // store auth token in local storage
        TokenService.saveAuthToken(loginResponse.authToken);
        setIsLogged(loginResponse.authToken);
        const jwt = TokenService.readJwtToken(loginResponse);
        setType(jwt.user_type);
        setUserId(jwt.user_id);
        setUsername(jwt.username);
        setIsLogged(true);
        setUserUrl(jwt.user_url);
        TokenService.saveUserURL(jwt.user_url);
        TokenService.saveUserName(jwt.username);
        TokenService.saveUserType(jwt.user_type);
        TokenService.saveUserId(jwt.user_id);
        props.history.push("/dashboard");
      })
      .catch((res) => {
        setError(res.error);
        setLoggedInState(null);
      });
  };

  return (
    <div className="login-wrapper">
      <section className="login-section">
        {loggedInState && <Spinner />}
        <h1>Login</h1>
        <p>Use the user or organization demo login to test out our app.</p>
        <p className="demo-credentials">Demo username: Demo</p>
        <p className="demo-credentials">Demo password: Password123$</p>
        <p className="demo-credentials">Demo organization: The Demo Org</p>
        <p className="demo-credentials">Demo password: Password123$</p>
        <article>
          {error !== null && <h3 className="error-message">error</h3>}
          <div>
            <form
              className="login-form"
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
                  placeholder="username"
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
                  placeholder="password"
                />
              </div>
              <div className="submit-button">
                <button className="form-btn" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Login;
