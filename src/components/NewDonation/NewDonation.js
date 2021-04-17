import React from "react";
import "./NewDonation.css";

function NewDonation() {
  return (
    <div className="newdonation-wrapper">
      <section className="newdonation-section">
        <header className="newdonation-header">
          <h1>New Donation</h1>
        </header>
        <article>
          <div>
            <form className="newdonation form">
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
                  type="description"
                  name="description"
                  id="description"
                  defaultValue="a brown leather couch"
                />
              </div>
              <div>
                <label className="label" htmlFor="image">
                  Image
                </label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  defaultValue="couch image"
                />
              </div>
            </form>
          </div>
        </article>
      </section>
    </div>
  );
}

export default NewDonation;
