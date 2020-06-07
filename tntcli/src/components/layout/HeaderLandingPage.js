import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignIn from "./login/SignIn";
import SignUp from "./login/SignUp";

class HeaderLandingPage extends Component {
  render() {
    return (
      <div>
        <nav className=" navbar navbar-expand-sm  mb-4 ml-5 mr-5">
          <Link className="navbar-brand text-light" to="/">
            Team and TODO Management Tool
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto">
              <SignIn />
              <SignUp />
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default HeaderLandingPage;
