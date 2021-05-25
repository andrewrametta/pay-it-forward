import React, { useContext, useEffect, useState } from "react";
import Donation from "../Donation/Donation";
import AppContext from "../../AppContext";
import AuthAPIService from "../../services/auth-api-service";

export default function YourDonations(props) {
  const [error, setError] = useState("");
  const { items, setItems, userId } = useContext(AppContext);

  useEffect(() => {
    AuthAPIService.getItems()
      .then((donations) => {
        setItems(donations);
      })
      .catch((res) => {
        setError(error);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Donations Available</h1>
      <div className="dashboard-item-container">
        <ul className="ul-items">
          {items
            .filter((item) => item.user_id === userId)
            .map((filteredItem, indx) => (
              <Donation
                key={indx}
                id={filteredItem.id}
                src={filteredItem.item_url}
                title={filteredItem.title}
                description={filteredItem.description}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
