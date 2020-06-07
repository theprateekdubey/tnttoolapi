import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignIn extends Component {
  render() {
    return (
      <div>
        <li className="nav-item">
          <Link className="nav-link text-light " to="/login">
            Sign In
          </Link>
        </li>
      </div>
    );
  }
}

export default SignIn;
