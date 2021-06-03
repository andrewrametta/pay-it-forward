import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import AppContext from "../../AppContext";
import AuthAPIService from "../../services/auth-api-service";

export default function YourDonations(props) {
  const [error, setError] = useState("");
  const { items, setItems, userId } = useContext(AppContext);

  useEffect(() => {
    AuthAPIService.getItems()
      .then((donations) => {
        console.log(donations);
        setItems(donations);
      })
      .catch((res) => {
        setError(error);
      });
  }, []);

  const yourDonations = items.filter((item) => item.user_id === userId);
  console.log(yourDonations);

  return (
    <div className="dashboard-container">
      <h1>Available Donations</h1>
      <div className="dashboard-item-container">
        <ul className="ul-items">
          {yourDonations.length > 0 ? (
            yourDonations
              .sort((a, b) => a.id - b.id)
              .map((filteredItem, indx) => (
                <li key={indx} className="items-div-container">
                  <Link to={`donation/${filteredItem.id}`}>
                    <Image
                      cloudName="hq1rpt94r"
                      publicId={`${filteredItem.item_url}`}
                      width="150"
                      height="200"
                      crop="fill"
                    />
                    <h3>{filteredItem.title}</h3>
                    <p>{filteredItem.description}</p>
                  </Link>
                </li>
              ))
          ) : (
            <h3>Looks like you have no donations posted...</h3>
          )}
        </ul>
      </div>
    </div>
  );
}
