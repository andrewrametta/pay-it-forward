import React, { useState } from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import DonorDashboard from "./components/DonorDashboard/DonorDashboard";
import OrganizationDashboard from "./components/OrganizationDashboard/OrganizationDashboard";
import NewDonation from "./components/NewDonation/NewDonation";
import Messages from "./components/Messages/Messages";
import About from "./components/About/About";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import AppContext from "./AppContext";
import TokenService from "./services/token-service";

function App() {
  const [type, setType] = useState("");
  const [isLogged, setIsLogged] = useState(TokenService.hasAuthToken());
  const contextValue = {
    type,
    setType,
    isLogged,
    setIsLogged,
  };
  return (
    <AppContext.Provider value={contextValue}>
      <div className="app-container">
        <header className="app-header">
          <Route path="/" component={Navbar} />
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/newdonation" component={NewDonation} />
          <Route path="/messages" component={Messages} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/donordashboard" component={DonorDashboard} />
          <Route
            path="/organizationdashboard"
            component={OrganizationDashboard}
          />
          <Route path="/about" component={About} />
        </main>
        <footer>Built by Andrew Rametta</footer>
      </div>
    </AppContext.Provider>
  );
}

export default App;
