import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import AuthAPIService from "../../services/auth-api-service";
import { Image, Transformation } from "cloudinary-react";
import "./Donation.css";

function Donation(props) {
  const id = props.match.params.donationId;
  const [error, setError] = useState(null);
  const [updatedItem, setUpdatedItem] = useState("");
  const [showDelete, setShowDelete] = useState(null);
  const [itemSelected, setItemSelected] = useState("");
  const {
    items,
    type,
    userId,
    conversations,
    setConversations,
    setItems,
  } = useContext(AppContext);

  useEffect(() => {
    setShowDelete(null);
    AuthAPIService.getItemById(id)
      .then((item) => {
        setItemSelected(item);
      })
      .catch((err) => console.log(err));
  }, [id, setItemSelected]);

  const handleConversation = (e) => {
    e.preventDefault();
    AuthAPIService.postConversation({
      user_id: userId,
      user2_id: itemSelected.user_id,
      user_url: "",
      user2_url: itemSelected.user_url,
    })
      .then((conversation) => {
        props.history.push(`/messages/${conversation.id}`);
        setConversations([...conversations, conversation]);
      })
      .catch((error) => {
        setError(error);
      });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    AuthAPIService.deleteItem(id)
      .then(() => {
        props.history.push("/yourdonations");
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleDeleteButton = () => {
    setShowDelete(true);
  };
  const handleCancel = () => {
    setShowDelete(null);
  };

  const handleDonation = (e) => {
    e.preventDefault();
    setError(null);
    const item = {
      title: itemSelected.title,
      description: itemSelected.description,
      cur_status: "claimed",
    };
    AuthAPIService.editItem(id, item)
      .then((responseData) => {
        setUpdatedItem(responseData);
        updateItems(updatedItem);
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
    <div className="donation-wrapper">
      <section className="donation-section">
        <div className="donation-item-container">
          <div className="donation-img-container">
            {itemSelected.item_url ? (
              <Image
                className="donation-image"
                cloudName="hq1rpt94r"
                publicId={`${itemSelected.item_url}`}
                width="350"
                height="350"
                crop="fill"
                alt={`${itemSelected.title}`}
              />
            ) : null}
          </div>
          {error !== null && <h3>error</h3>}
          <div className="item-container-details">
            <h3>{itemSelected.title}</h3>
            <p>{itemSelected.description}</p>
            <p>
              {itemSelected.city}, {itemSelected.state}
            </p>
            <div className="button-container">
              {type === "org" && (
                <button className="donation-btn" onClick={handleConversation}>
                  Request
                </button>
              )}
              {parseInt(userId) === itemSelected.user_id && (
                <>
                  {showDelete === null ? (
                    <button
                      onClick={handleDeleteButton}
                      className="donation-btn"
                    >
                      Delete
                    </button>
                  ) : (
                    <>
                      <p className="cancel-message">
                        Are you sure you want to delete?
                      </p>
                      <button className="donation-btn" onClick={handleCancel}>
                        No
                      </button>
                      <button className="donation-btn" onClick={handleDelete}>
                        Yes
                      </button>
                    </>
                  )}
                  <button className="donation-btn">
                    <Link to={`/edit/${props.match.params.donationId}`}>
                      Edit
                    </Link>
                  </button>
                  <button className="donation-btn" onClick={handleDonation}>
                    Mark as donated
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="user-container-details">
          <p>Donated By</p>
          {itemSelected.user_url ? (
            <Image
              cloudName="hq1rpt94r"
              publicId={`${itemSelected.user_url}`}
              alt={`${itemSelected.username}`}
            >
              <Transformation
                gravity="face"
                height="200"
                width="200"
                crop="crop"
              />
              <Transformation radius="max" />
              <Transformation width="100" crop="scale" />
            </Image>
          ) : null}
          <h4>{itemSelected.username}</h4>
        </div>
      </section>
    </div>
  );
}

export default Donation;
