import React, { useContext } from "react";
import AppContext from "../../AppContext";
import TokenService from "../../services/token-service";
import AuthAPIService from "../../services/auth-api-service";

function Donation(props) {
  const id = props.match.params.donationId;
  const { items, type, userId, conversations, setConversations } = useContext(
    AppContext
  );
  const donationArray = items.filter((item) => item.id === parseInt(id));
  const donationItem = donationArray.length > 0 ? donationArray[0] : null;

  const handleConversation = (e) => {
    e.preventDefault();
    AuthAPIService.postConversation({
      user_id: userId,
      user2_id: donationItem.user_id,
      item_id: donationItem.id,
    })
      .then((conversation) => {
        props.history.push("/messages");
        setConversations([...conversations, conversation]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleConversation}>
        <h2>This is a donation</h2>
        <img src={donationItem.item_url}></img>
        <h3>{donationItem.title}</h3>
        <p>{donationItem.description}</p>
        {type === "user" && userId === donationItem.user_id ? (
          <>
            <button>Delete</button>
            <button>Edit</button>
          </>
        ) : null}
        {type === "org" && <button type="submit ">Request</button>}
      </form>
    </div>
  );
}

export default Donation;
