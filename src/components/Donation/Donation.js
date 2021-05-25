import React, { useContext } from "react";
import AppContext from "../../AppContext";
import AuthAPIService from "../../services/auth-api-service";
import { Image } from "cloudinary-react";

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
        props.history.push("/messages");
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

  // const deleteYourItem = (item_id) => {
  //   setItems({
  //     items: items.filter((item) => item.id !== item_id),
  //   });
  //   // setItems({
  //   //   items: items.filter((item) => item.id !== item_id),
  //   // });
  // };

  return (
    <div>
      {" "}
      <h2>This is a donation</h2>
      <Image
        cloudName="hq1rpt94r"
        publicId={`${donationItem.item_url}`}
        width="150"
        height="200"
        crop="fill"
      />
      <h3>{donationItem.title}</h3>
      <p>{donationItem.description}</p>
      {type === "org" && <button onClick={handleConversation}>Request</button>}
      {userId === donationItem.user_id && (
        <button onClick={handleDelete}>Delete</button>
      )}
    </div>
  );
}

export default Donation;
