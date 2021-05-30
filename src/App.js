import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NewDonation from "./components/NewDonation/NewDonation";
import Messages from "./components/Messages/Messages";
import About from "./components/About/About";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import AppContext from "./AppContext";
import Donation from "./components/Donation/Donation";
import TokenService from "./services/token-service";
import YourDonations from "./components/YourDonations/YourDonations";
import EditDonation from "./components/EditDonation/EditDonation";
import OrgProfile from "./components/OrgProfile/OrgProfile";

function App() {
  const [userId, setUserId] = useState(TokenService.hasUserId());
  const [yourItems, setYourItems] = useState([]);
  const [username, setUsername] = useState(TokenService.hasUserName());
  const [type, setType] = useState(TokenService.hasUserType());
  const [isLogged, setIsLogged] = useState(false);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [items, setItems] = useState([]);
  const contextValue = {
    type,
    setType,
    isLogged,
    setIsLogged,
    items,
    setItems,
    userId,
    setUserId,
    messages,
    setMessages,
    conversations,
    setConversations,
    username,
    setUsername,
    yourItems,
    setYourItems,
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
          <Route exact path="/donation/:donationId" component={Donation} />
          <Route exact path="/edit/:item_id" component={EditDonation} />
          <Route path="/yourdonations" component={YourDonations} />
          <Route path="/messages" component={Messages} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/about" component={About} />
        </main>
        <footer>Built by Andrew Rametta</footer>
      </div>
    </AppContext.Provider>
  );
}

export default App;
