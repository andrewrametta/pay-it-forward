import React, { useState } from "react";
import Upload from "../Upload/Upload";
import "./RegisterUserForm.css";
import AuthAPIService from "../../services/auth-api-service";

function RegisterUserForm(props) {
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      username,
      password,
      email,
      address,
      city,
      state,
      zipcode,
    } = e.target;
    setError(null);
    // create user
    AuthAPIService.postUser({
      username: username.value,
      password: password.value,
      email: email.value,
      user_type: "user",
      address: address.value,
      city: city.value,
      state: state.value,
      zip: zipcode.value,
      user_url: imgUrl,
    })
      .then(() => {
        props.history.push("/login");
      })
      .catch((res) => {
        setError(res.error);
      });
  };

  return (
    <div className="register-wrapper">
      <section className="register-section">
        <header className="register-header">
          <h1>User Registration</h1>
        </header>
        <article>
          <p>Start with a profile Image</p>
          <Upload
            setImgUrl={setImgUrl}
            previewSource={previewSource}
            setPreviewSource={setPreviewSource}
            setShowForm={setShowForm}
          />
          <div>
            {showForm ? (
              <form className="register-form" onSubmit={handleSubmit}>
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
                {error !== null && <p className="error">error</p>}
              </form>
            ) : null}
          </div>
        </article>
      </section>
    </div>
  );
}

export default RegisterUserForm;
