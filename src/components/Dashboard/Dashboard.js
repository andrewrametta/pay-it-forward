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
  });

  return (
    <div className="dashboard-container">
      <h1>Dashboard Test</h1>
      {type === "organization" ? <OrganizationDashboard /> : <DonorDashboard />}
    </div>
  );
}
