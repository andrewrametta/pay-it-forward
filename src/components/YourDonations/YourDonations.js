import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import AppContext from "../../AppContext";
import AuthAPIService from "../../services/auth-api-service";
import "./YourDonations.css";

export default function YourDonations(props) {
  const [error, setError] = useState("");
  const { items, setItems, userId } = useContext(AppContext);

  useEffect(() => {
    AuthAPIService.getItems()
      .then((donations) => {
        setItems(donations);
      })
      .catch((error) => {
        setError(error);
      });
  }, [setItems, setError]);

  const yourDonations = items.filter(
    (item) =>
      item.user_id === parseInt(userId) && item.cur_status === "available"
  );

  return (
    <div className="yourdonations-container">
      <div className="yourdonations-header">
        <h1>Available Donations</h1>
        <p>Click a donation to manage</p>
      </div>
      {error && <h2>error</h2>}
      <div className="your-items-container">
        <ul className="yourdonations-items">
          {yourDonations.length > 0 ? (
            yourDonations
              .sort((a, b) => a.id - b.id)
              .map((filteredItem, indx) => (
                <Link key={indx} to={`donation/${filteredItem.id}`}>
                  <li key={indx} className="your-items-div-container">
                    <div className="your-item-img">
                      {filteredItem.item_url ? (
                        <Image
                          className="img-yourdonation"
                          cloudName="hq1rpt94r"
                          publicId={`${filteredItem.item_url}`}
                          width="250"
                          height="250"
                          crop="fill"
                        />
                      ) : null}
                    </div>
                    <h3>{filteredItem.title}</h3>
                    <p>{filteredItem.description}</p>
                  </li>
                </Link>
              ))
          ) : (
            <h3>Looks like you have no donations posted...</h3>
          )}
        </ul>
      </div>
    </div>
  );
}
