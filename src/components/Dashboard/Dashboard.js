import React from "react";
import DonorDashboard from "../DonorDashboard/DonorDashboard";
import OrganizationDashboard from "../OrganizationDashboard/OrganizationDashboard";

export default function Dashboard(props) {
  return (
    <div className="dashboard-container">
      <OrganizationDashboard />
      <DonorDashboard />
    </div>
  );
}
