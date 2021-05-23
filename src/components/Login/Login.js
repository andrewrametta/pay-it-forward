import React, { useState, useContext } from "react";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";
import AppContext from "../../AppContext";
import "./Login.css";

function Login(props) {
  const [error, setError] = useState(null);
  const { setType, setIsLogged, setUserId, setUsername } = useContext(
    AppContext
  );

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = e.target;
    const user = { username: username.value, password: password.value };
    setError(null);
    AuthApiService.loginUser(user)
      .then((loginResponse) => {
        // store auth token in local storage
        TokenService.saveAuthToken(loginResponse.authToken);
        setIsLogged(loginResponse.authToken);
        console.log(loginResponse);
        const jwt = TokenService.readJwtToken(loginResponse);
        console.log(jwt.user_type);
        setType(jwt.user_type);
        setUserId(jwt.user_id);
        setUsername(jwt.username);
        setIsLogged(true);
        TokenService.saveUserName(jwt.username);
        TokenService.saveUserType(jwt.user_type);
        TokenService.saveUserId(jwt.user_id);
        props.history.push("/dashboard");
      })
      .catch((res) => {
        setError(res.error);
      });
  };

  return (
    <div className="login-wrapper">
      <section className="login-section">
        <header className="login-header">
          <h1>Login</h1>
        </header>
        <p>Use the user or organization demo login to test out our app.</p>
        <p>Demo username: Demo</p>
        <p>Demo password: Password123$</p>

        <p>Demo organization: The Demo Org</p>
        <p>Demo password: Password123$</p>
        <article>
          {error !== null && <h3>error</h3>}
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
              <button type="submit">Login</button>
            </form>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Login;
