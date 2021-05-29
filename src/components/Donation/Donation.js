import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import AuthAPIService from "../../services/auth-api-service";
import { Image, Transformation } from "cloudinary-react";

function Donation(props) {
  const id = props.match.params.donationId;
  console.log(props.match.params);
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
      .then((item) => setItemSelected(item))
      .catch((err) => console.log(err));
  }, []);

  const donationArray = items.filter((item) => item.id === parseInt(id));
  const donationItem = donationArray.length > 0 ? donationArray[0] : null;

  const handleConversation = (e) => {
    e.preventDefault();
    AuthAPIService.postConversation({
      user_id: userId,
      user2_id: donationItem.user_id,
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

  return (
    <div>
      <h2>This is a donation</h2>
      <Image
        cloudName="hq1rpt94r"
        publicId={`${itemSelected.item_url}`}
        width="350"
        height="350"
        crop="fill"
      />
      <div className="div item-container details">
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

            <button>Mark as donated</button>
          </>
        )}
      </div>
      <div className="div user-container details">
        <Image cloudName="hq1rpt94r" publicId={`${itemSelected.item_url}`}>
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
