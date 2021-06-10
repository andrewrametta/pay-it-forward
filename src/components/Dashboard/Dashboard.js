import React, { useContext, useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import AppContext from "../../AppContext";
import { Link } from "react-router-dom";
import AuthAPIService from "../../services/auth-api-service";
import "./Dashboard.css";

export default function Dashboard(props) {
  const [error, setError] = useState("");
  const { items, setItems, setChatOn } = useContext(AppContext);

  useEffect(() => {
    setChatOn(null);
    AuthAPIService.getItems()
      .then((donations) => {
        setItems(donations);
      })
      .catch((error) => {
        setError(error);
      });
  }, [setItems, setError, setChatOn]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Donations Available</h1>
        <h2 className="click-donation">Click a donation for more info</h2>
      </div>
      <div className="dashboard-item-container">
        {error && <h2 className="error-message">{error}</h2>}
        <ul className="dashboard-items">
          {items
            .sort((a, b) => a.id - b.id)
            .map((item, indx) => (
              <Link key={indx} to={`donation/${item.id}`}>
                <li key={indx} className="dashboard-items-div-container">
                  <div className="donation-dashboard-img">
                    {item.item_url ? (
                      <Image
                        className="img-donation"
                        cloudName="hq1rpt94r"
                        publicId={`${item.item_url}`}
                        width="275"
                        height="275"
                        crop="fill"
                        alt={`${item.title} image`}
                      />
                    ) : null}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.status}</p>
                  <p className="p-citystate">
                    {item.city}, {item.state}
                  </p>
                </li>
              </Link>
            ))}
        </ul>
      </div>
    </div>
  );
}
