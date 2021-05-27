import React, { useContext } from "react";
import AppContext from "../../AppContext";
import AuthAPIService from "../../services/auth-api-service";
import { Image, Transformation } from "cloudinary-react";

function Donation(props) {
  const id = props.match.params.donationId;
  const {
    items,
    type,
    userId,
    conversations,
    setConversations,
    setItems,
  } = useContext(AppContext);
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
        publicId={`${donationItem.item_url}`}
        width="350"
        height="350"
        crop="fill"
      />
      <div className="div item-container details">
        <h3>{donationItem.title}</h3>
        <p>{donationItem.description}</p>
        <p>
          {donationItem.city}, {donationItem.state}
        </p>
        {type === "org" && (
          <button onClick={handleConversation}>Request</button>
        )}
        {userId === donationItem.user_id && (
          <>
            <button onClick={handleDelete}>Delete</button>
            <button>Edit</button>
            <button>Mark as donated</button>
          </>
        )}
      </div>
      <div className="div user-container details">
        <Image cloudName="hq1rpt94r" publicId={`${donationItem.item_url}`}>
          <Transformation gravity="face" height="200" width="200" crop="crop" />
          <Transformation radius="max" />
          <Transformation width="100" crop="scale" />
        </Image>
        <h4>{donationItem.username}</h4>
      </div>
    </div>
  );
}

export default Donation;
