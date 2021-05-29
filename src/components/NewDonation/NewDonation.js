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
        <header className="newdonation-header">
          <h1>New Donation</h1>
        </header>
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
                <div>
                  <label className="label" htmlFor="donation">
                    Donation Type
                  </label>
                  <input
                    type="text"
                    name="donation"
                    id="donation"
                    defaultValue="furniture"
                  />
                </div>
                <div>
                  <label className="label" htmlFor="description">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    defaultValue="a brown leather couch"
                  />
                </div>
                <div className="submit-button">
                  <button type="submit">Submit</button>
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
