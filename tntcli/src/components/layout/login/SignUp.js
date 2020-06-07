import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SignUp extends Component {
  render() {
    return (
      <div>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/register">
            Sign Up
          </Link>
        </li>
      </div>
    );
  }
}
