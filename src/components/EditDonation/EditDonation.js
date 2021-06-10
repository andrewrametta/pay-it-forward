import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../AppContext";
import { Image } from "cloudinary-react";
import AuthAPIService from "../../services/auth-api-service";
import Spinner from "../Spinner/Spinner";
import "./EditDonation.css";

function EditDonation(props) {
  const id = props.match.params.item_id;
  const [updatedItem, setUpdatedItem] = useState("");
  const [loggedInState, setLoggedInState] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [img, setImg] = useState("");
  const [error, setError] = useState(null);
  const { items, setItems } = useContext(AppContext);

  useEffect(() => {
    setError(null);
    AuthAPIService.getItemById(id)
      .then((item) => {
        setImg(item.item_url);
        setTitle(item.title);
        setDescription(item.description);
      })
      .catch((err) => console.log(err));
  }, [
    props.match.params.item_id,
    id,
    setError,
    setImg,
    setTitle,
    setDescription,
  ]);
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedInState(true);
    setError(null);
    const item_id = props.match.params.item_id;
    const { title, description } = e.target;
    const item = {
      title: title.value,
      description: description.value,
      cur_status: "available",
    };
    AuthAPIService.editItem(item_id, item)
      .then((responseData) => {
        setUpdatedItem(responseData);
        updateItems(updatedItem);
        props.history.push("/yourdonations");
      })
      .catch((res) => {
        setError(error);
        setLoggedInState(null);
      });
  };
  const updateItems = (updatedItem) => {
    const newItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(newItems);
  };

  return (
    <div className="editdonation-wrapper">
      {loggedInState && <Spinner />}
      <section className="editdonation-section">
        <h1>Edit Donation</h1>
        <article>
          <p className="error-message">{error}</p>
          <div className="editdonation-image">
            {img ? (
              <Image
                className="edit-image"
                cloudName="hq1rpt94r"
                publicId={`${img}`}
                width="350"
                height="350"
                crop="fill"
              />
            ) : null}
          </div>
          <div>
            <form className="edonation-form" onSubmit={handleSubmit}>
              <div>
                <label className="label" htmlFor="donation">
                  Donation Name
                </label>
                <input
                  className="edit-input"
                  type="text"
                  name="title"
                  id="donation"
                  value={title}
                  onChange={handleChangeTitle}
                />
              </div>
              <div>
                <label className="label" htmlFor="description">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="5"
                  value={description}
                  onChange={handleChangeDescription}
                />
              </div>
              <div className="submit-button">
                <button className="form-btn" type="form-submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </article>
      </section>
    </div>
  );
}

export default EditDonation;
