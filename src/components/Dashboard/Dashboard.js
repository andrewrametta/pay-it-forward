import React, { useContext } from "react";
import DonorDashboard from "../DonorDashboard/DonorDashboard";
import OrganizationDashboard from "../OrganizationDashboard/OrganizationDashboard";
import AppContext from "../../AppContext";

export default function Dashboard(props) {
  const context = useContext(AppContext);
  return (
    <div className="dashboard-container">
      {context.type === "organization" ? (
        <OrganizationDashboard />
      ) : (
        <DonorDashboard />
      )}
    </div>
  );
}
