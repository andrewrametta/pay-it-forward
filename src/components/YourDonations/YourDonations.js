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
            ))}
        </ul>
      </div>
    </div>
  );
}
