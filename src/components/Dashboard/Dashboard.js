import React, { useContext, useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import AppContext from "../../AppContext";
import { Link } from "react-router-dom";
import AuthAPIService from "../../services/auth-api-service";
import "./Dashboard.css";

export default function Dashboard(props) {
  const [error, setError] = useState("");
  const { items, setItems } = useContext(AppContext);

  useEffect(() => {
    AuthAPIService.getItems()
      .then((donations) => {
        console.log(donations);
        setItems(donations);
      })
      .catch((error) => {
        setError(error);
      });
  }, [setItems, setError]);

  return (
    <div className="dashboard-container">
      <h1>Donations Available</h1>
      <div className="dashboard-item-container">
        {error && <h2>error</h2>}
        <ul className="ul-items">
          {items
            .sort((a, b) => a.id - b.id)
            .map((item, indx) => (
              <Link key={indx} to={`donation/${item.id}`}>
                <li key={indx} className="items-div-container">
                  <div className="donation-dashboard-img">
                    {item.item_url ? (
                      <Image
                        className="img-donation"
                        cloudName="hq1rpt94r"
                        publicId={`${item.item_url}`}
                        width="275"
                        height="275"
                        crop="fill"
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
