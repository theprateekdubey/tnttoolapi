import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div id="main-header">
        <nav className=" navbar navbar-expand-sm  mb-4 ml-5 mr-5">
          <a className="navbar-brand text-light">
            Team and TODO Management Tool
          </a>
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
              <li className="nav-item">
                <Link className="nav-link text-light " to="/">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
