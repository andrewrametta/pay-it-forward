import React, { useState } from "react";
import Upload from "../Upload/Upload";
import Spinner from "../Spinner/Spinner";
import "./RegisterOrgForm.css";
import AuthAPIService from "../../services/auth-api-service";

function RegisterOrgForm(props) {
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loggedInState, setLoggedInState] = useState(null);
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
    setLoggedInState(true);
    setError(null);
    // create user
    AuthAPIService.postUser({
      username: username.value,
      password: password.value,
      email: email.value,
      user_type: "org",
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
        setLoggedInState(null);
      });
  };

  return (
    <div className="register-wrapper">
      <section className="register-section">
        <h1>Organization Registration</h1>
        {loggedInState && <Spinner />}
        <article>
          <p>Start with an organization profile Image</p>
          <Upload
            setImgUrl={setImgUrl}
            previewSource={previewSource}
            setPreviewSource={setPreviewSource}
            setShowForm={setShowForm}
          />
          <div>
            {showForm ? (
              <form className="register form" onSubmit={handleSubmit}>
                <div>
                  <label className="label" htmlFor="username">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="username"
                    className="form-input"
                    required
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
                    className="form-input"
                    required
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
                    className="form-input"
                    required
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
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="label" htmlFor="city">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="city"
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="label" htmlFor="state">
                    state
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="ST"
                    className="form-input"
                    required
                  />
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
                    className="form-input"
                    required
                  />
                </div>
                <div className="submit-button">
                  <button className="form-btn" type="submit">
                    Register
                  </button>
                </div>
                {error !== null && <p className="error-message">error</p>}
              </form>
            ) : null}
          </div>
        </article>
      </section>
    </div>
  );
}

export default RegisterOrgForm;
