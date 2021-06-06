import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../AppContext";
import { Image } from "cloudinary-react";
import AuthAPIService from "../../services/auth-api-service";
import "./EditDonation.css";

function EditDonation(props) {
  const id = props.match.params.item_id;
  console.log(props.match.params);
  const [updatedItem, setUpdatedItem] = useState("");
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
        console.log("patch worked");
        setUpdatedItem(responseData);
        console.log(updatedItem);
        updateItems(updatedItem);
        console.log(items);
        props.history.push("/yourdonations");
      })
      .catch((res) => {
        setError(error);
      });
  };
  const updateItems = (updatedItem) => {
    const newItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(newItems);
  };

  return (
    <div className="newdonation-wrapper">
      <section className="newdonation-section">
        <h1>Edit Donation</h1>

        <article>
          <p>{error}</p>
          <div className="editdonation-image">
            <Image
              className="edit-image"
              cloudName="hq1rpt94r"
              publicId={`${img}`}
              width="350"
              height="350"
              crop="fill"
            />
          </div>
          <div>
            <form className="newdonation form" onSubmit={handleSubmit}>
              <div>
                <label className="label" htmlFor="donation">
                  Donation Type
                </label>
                <input
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
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </article>
      </section>
    </div>
  );
}

export default EditDonation;
