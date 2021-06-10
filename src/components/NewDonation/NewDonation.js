import React, { useState } from "react";
import "./NewDonation.css";
import Upload from "../Upload/Upload";
import Spinner from "../Spinner/Spinner";
import AuthAPIService from "../../services/auth-api-service";

function NewDonation(props) {
  const [showForm, setShowForm] = useState(false);
  const [loggedInState, setLoggedInState] = useState(null);
  const [error, setError] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedInState(true);
    const { donation, description } = e.target;
    AuthAPIService.postItem({
      cur_status: "available",
      title: donation.value,
      description: description.value,
      item_url: imgUrl,
    })
      .then((item) => {
        props.history.push("/dashboard");
      })
      .catch((error) => {
        setError(error);
        setLoggedInState(null);
      });
  };

  return (
    <div className="newdonation-wrapper">
      {loggedInState && <Spinner />}
      <section className="newdonation-section">
        <h1>New Donation</h1>
        <p>Start by selecting 1 image</p>
        <article>
          <Upload
            setImgUrl={setImgUrl}
            previewSource={previewSource}
            setPreviewSource={setPreviewSource}
            setShowForm={setShowForm}
          />
          <div>
            {showForm ? (
              <form className="newdonation form" onSubmit={handleSubmit}>
                <p>Next provide the donation information</p>
                <div>
                  <label className="label" htmlFor="donation">
                    Donation Name
                  </label>
                  <input
                    type="text"
                    name="donation"
                    id="donation"
                    placeholder="A brown couch"
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="label" htmlFor="description">
                    Detailed Description
                  </label>
                  <textarea
                    rows="5"
                    name="description"
                    id="description"
                    placeholder="Gently used couch ready for a new home. Leather, brown, with little sign of wear. Available for drop off only"
                    className="form-input"
                    required
                  />
                </div>
                <div className="submit-button">
                  <button className="form-btn" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            ) : null}
          </div>
          {error && <h3 className="error-message">error</h3>}
        </article>
      </section>
    </div>
  );
}

export default NewDonation;
