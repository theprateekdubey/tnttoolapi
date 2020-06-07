import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import { Provider } from "react-redux";
import store from "./store";
import LoginForm from "./components/layout/login/forms/LoginForm";
import TeamLeadDashboard from "./components/TeamLeadDashboard";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/loginForm" component={LoginForm} />
        <Route exact path="/TeamLeadDashboard" component={TeamLeadDashboard} />
      </Router>
    </Provider>
  );
}

export default App;
