import React, { useContext, useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import AppContext from "../../AppContext";
import { Link } from "react-router-dom";
import AuthAPIService from "../../services/auth-api-service";
import "./Dashboard.css";

export default function Dashboard(props) {
  const [error, setError] = useState("");
  const { items, setItems, setConversations, setMessages, userId } = useContext(
    AppContext
  );

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

  return (
    <div className="dashboard-container">
      <h1>Donations Available</h1>
      <div className="dashboard-item-container">
        <ul className="ul-items">
          {items
            .sort((a, b) => a.id - b.id)
            .map((item, indx) => (
              <li key={indx} className="items-div-container">
                <Link to={`donation/${item.id}`}>
                  <Image
                    className="img-donation"
                    cloudName="hq1rpt94r"
                    publicId={`${item.item_url}`}
                    width="150"
                    height="150"
                    crop="fill"
                  />
                  <h3>{item.title}</h3>
                  <p>{item.status}</p>
                  <p className="p-citystate">
                    {item.city}, {item.state}
                  </p>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
