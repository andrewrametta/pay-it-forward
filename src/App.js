import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import DonorDashboard from "./components/DonorDashboard/DonorDashboard";
import OrganizationDashboard from "./components/OrganizationDashboard/OrganizationDashboard";
import NewDonation from "./components/NewDonation/NewDonation";
import About from "./components/About/About";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <Route path="/" component={Navbar} />
      </header>
      <main>
        <Route exact path="/" component={Landing} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/newdonation" component={NewDonation} />
        <Route path="/donordashboard" component={DonorDashboard} />
        <Route
          path="/organizationdashboard"
          component={OrganizationDashboard}
        />
        <Route path="/about" component={About} />
      </main>
      <footer>Built by Andrew Rametta</footer>
    </div>
  );
}

export default App;
