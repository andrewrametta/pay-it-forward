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
    AuthAPIService.getItemById(id)
      .then((item) => {
        setItemSelected(item);
        console.log(itemSelected);
      })
      .catch((err) => console.log(err));
    console.log(itemSelected);
  }, []);

  // const donationArray = items.filter((item) => item.id === parseInt(id));
  // const donationItem = donationArray.length > 0 ? donationArray[0] : null;

  const handleConversation = (e) => {
    e.preventDefault();
    AuthAPIService.postConversation({
      user_id: userId,
      user2_id: itemSelected.user_id,
    })
      .then((conversation) => {
        props.history.push(`/messages/${conversation.id}`);
        setConversations([...conversations, conversation]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    AuthAPIService.deleteItem(id)
      .then(() => {
        props.history.push("/yourdonations");
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  const handleDonation = (e) => {
    e.preventDefault();
    setError(null);
    console.log(id);
    const item = {
      title: itemSelected.title,
      description: itemSelected.description,
      cur_status: "claimed",
    };
    console.log(item);
    AuthAPIService.editItem(id, item)
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
    <div className="donation-wrapper">
      <div className="desktop-flex-view">
        <div className="donation-img">
          <Image
            className="donation-image"
            cloudName="hq1rpt94r"
            publicId={`${itemSelected.item_url}`}
            width="350"
            height="350"
            crop="fill"
          />
        </div>
        {error !== null && <h3>error</h3>}
        <div className="item-container-details">
          <h3>{itemSelected.title}</h3>
          <p>{itemSelected.description}</p>
          <p>
            {itemSelected.city}, {itemSelected.state}
          </p>
          {type === "org" && (
            <button onClick={handleConversation}>Request</button>
          )}
          {userId === itemSelected.user_id && (
            <>
              <button onClick={handleDelete}>Delete</button>
              <Link to={`/edit/${props.match.params.donationId}`}>
                <button>Edit</button>
              </Link>

              <button onClick={handleDonation}>Mark as donated</button>
            </>
          )}
        </div>
      </div>

      <div className="user-container-details">
        <p>Donationated By</p>
        <Image cloudName="hq1rpt94r" publicId={`${itemSelected.user_url}`}>
          <Transformation gravity="face" height="200" width="200" crop="crop" />
          <Transformation radius="max" />
          <Transformation width="100" crop="scale" />
        </Image>
        <h4>{itemSelected.username}</h4>
      </div>
    </div>
  );
}

export default Donation;
