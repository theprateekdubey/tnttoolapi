import React, { Component } from "react";
import { Link } from "react-router-dom";

class AddandListButton extends Component {
  render() {
    const { teamCode, userCode } = this.props;
    return (
      <div className="lead-menu">
        <Link
          className="nav-link  btn btn-outline-dark rounded-circle "
          id="navbarDropdownMenuLink"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          to=""
        >
          <i
            className="fa fa-ellipsis-v mt-n1 text-light"
            aria-hidden="true"
          ></i>
        </Link>
        <div
          className="dropdown-menu lead-menu-content"
          aria-labelledby="navbarDropdownMenuLink"
        >
          <Link
            className="dropdown-item"
            to={`/addTodo/${teamCode}/${userCode}`}
          >
            <i className="fa fa-plus-circle"></i> Add TODO
          </Link>
          <Link
            className="dropdown-item"
            to={`/completedTodo/${teamCode}/${userCode}`}
          >
            <i className="fa fa-check-circle"></i> Completed TODO{"   "}
            <span className="badge bg-dark"></span>
          </Link>
          <Link
            className="dropdown-item"
            to={`/teamMember/${teamCode}/${userCode}`}
          >
            <i className="fas fa-users"></i> List Members
          </Link>
        </div>
      </div>
    );
  }
}
export default AddandListButton;
