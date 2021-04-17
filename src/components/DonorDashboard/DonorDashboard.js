import React from "react";
import "./DonorDashboard.css";

function DonorDashboard() {
  return (
    <div className="donordashboard-wrapper">
      <h1>Donor Dashboard</h1>
      <p>Messages: 2</p>
      <p>Manage your donations</p>
      <ul>
        <li>Couch</li>
        <li>Bed</li>
        <li>TV</li>
        <li>Table</li>
      </ul>
    </div>
  );
}

export default DonorDashboard;
