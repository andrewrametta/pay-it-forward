import React, { useContext, useEffect, useState } from "react";
import DonorDashboard from "../DonorDashboard/DonorDashboard";
import OrganizationDashboard from "../OrganizationDashboard/OrganizationDashboard";
import AppContext from "../../AppContext";
import AuthAPIService from "../../services/auth-api-service";

export default function Dashboard(props) {
  const [error, setError] = useState("");
  const { items, setItems, type } = useContext(AppContext);

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
      <h1>Dashboard Test</h1>
      <div className="dashboard-item-container">
        <ul className="ul-items">
          {items.map((item, indx) => (
            <li key={indx} className="items-div-container">
              <img className="item-img" src={item.item_url}></img>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {type === "organization" ? <OrganizationDashboard /> : <DonorDashboard />}
    </div>
  );
}
