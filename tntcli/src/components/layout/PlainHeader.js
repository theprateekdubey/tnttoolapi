import React, { Component } from "react";
import { Link } from "react-router-dom";

class PlainHeader extends Component {
  render() {
    return (
      <div id="main-header">
        <nav className=" navbar navbar-expand-sm  mb-4 mx-5">
          <Link to="#" className="navbar-brand text-light mt-n1 mb-1">
            Team & TODO Management Tool
          </Link>
        </nav>
      </div>
    );
  }
}
export default PlainHeader;
