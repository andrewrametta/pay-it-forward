import React, { useContext, useEffect, useState } from "react";
import YourDonation from "../YourDonation/YourDonation";
import AppContext from "../../AppContext";
import AuthAPIService from "../../services/auth-api-service";

export default function YourDonations(props) {
  const [error, setError] = useState("");
  const { yourItems, setYourItems, userId } = useContext(AppContext);

  useEffect(() => {
    AuthAPIService.getItems()
      .then((donations) => {
        setYourItems(donations);
        console.log(yourItems);
        console.log(userId);
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
          {yourItems
            .filter((item) => item.user_id === userId)
            .map((filteredItem, indx) => (
              <YourDonation
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
