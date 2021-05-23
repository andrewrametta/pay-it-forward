import React, { useState, useContext } from "react";
import "./Register.css";
import AuthAPIService from "../../services/auth-api-service";
import AppContext from "../../AppContext";

function Register(props) {
  const [error, setError] = useState(null);
  const context = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      username,
      password,
      email,
      usertype,
      address,
      city,
      state,
      zipcode,
    } = e.target;
    setError({ error: null });
    if (password.value) {
      // create user
      AuthAPIService.postUser({
        username: username.value,
        password: password.value,
        email: email.value,
        user_type: usertype.value,
        address: address.value,
        city: city.value,
        state: state.value,
        zip: zipcode.value,
      })
        .then((user) => {
          context.setType(usertype);
          props.history.push("/login");
        })
        .catch((res) => {
          setError({ error: res.error });
        });
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="register-wrapper">
      <section className="register-section">
        <header className="register-header">
          <h1>Register</h1>
        </header>
        <article>
          <div>
            <form className="register form" onSubmit={handleSubmit}>
              <div>
                <label className="label" htmlFor="usertype">
                  User Type
                </label>
                <select id="usertype" name="usertype">
                  <option value="user">User</option>
                  <option value="org">Organization</option>
                </select>
              </div>
              <div>
                <label className="label" htmlFor="username">
                  Username or Organization Name
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
                  type="password"
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
                <label className="label" htmlFor="state">
                  state
                </label>
                <input type="text" name="state" id="state" placeholder="ST" />
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
                <button type="submit">Register</button>
              </div>
              {error && <h3>error</h3>}
            </form>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Register;
