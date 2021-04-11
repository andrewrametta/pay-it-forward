import React from "react";

function Login() {
  return (
    <div className="login-wrapper">
      <h1>Login</h1>
      <form className="login form">
        <label className="label" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          defaultValue="username"
        />
        <label className="label" htmlFor="email">
          Email
        </label>
        <input type="email" name="email" id="email" defaultValue="email" />
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          type="text"
          name="password"
          id="password"
          defaultValue="password"
        />
      </form>
    </div>
  );
}

export default Login;
