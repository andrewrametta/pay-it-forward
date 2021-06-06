import React, { useState } from "react";
import "./NewDonation.css";
import Upload from "../Upload/Upload";
import AuthAPIService from "../../services/auth-api-service";

function NewDonation(props) {
  const [showForm, setShowForm] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const { donation, description } = e.target;
    AuthAPIService.postItem({
      cur_status: "available",
      title: donation.value,
      description: description.value,
      item_url: imgUrl,
    })
      .then((item) => {
        console.log(item);
        props.history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="newdonation-wrapper">
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
        </article>
      </section>
    </div>
  );
}

export default NewDonation;
