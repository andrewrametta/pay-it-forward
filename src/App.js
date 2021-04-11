import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import NewDonation from "./components/NewDonation/NewDonation";
import About from "./components/About/About";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="App-header">
        <Route path="/" component={Navbar} />
      </header>
      <Route exact path="/" component={Landing} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/newdonation" component={NewDonation} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/about" component={About} />
    </div>
  );
}

export default App;
