import React, { useContext } from "react";
import AppContext from "../../AppContext";

function Donation(props) {
  const id = props.match.params.donationId;
  const { items, type } = useContext(AppContext);
  const donationArray = items.filter((item) => item.id === parseInt(id));
  const donationItem = donationArray.length > 0 ? donationArray[0] : null;
  console.log(donationArray);
  return (
    <div>
      <h2>This is a donation</h2>
      <img src={donationItem.item_url}></img>
      <h3>{donationItem.title}</h3>
      <p>{donationItem.description}</p>
      {type === "user" ? (
        <>
          <button>Delete</button>
          <button>Edit</button>
        </>
      ) : (
        <button>Request</button>
      )}
    </div>
  );
}

export default Donation;
