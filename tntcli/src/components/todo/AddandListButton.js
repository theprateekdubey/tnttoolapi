import React, { Component } from "react";
import { Link } from "react-router-dom";

class AddandListButton extends Component {
  render() {
    const { teamCode, userCode } = this.props;
    return (
      <div className="mx-5 d-flex justify-content-end mt-2">
        <Link
          type="button"
          className="rounded btn btn-success px-3 ml-3 "
          to={`/addTodo/${teamCode}/${userCode}`}
        >
          <i className="fa fa-plus-circle"></i> Add TODO
        </Link>
        <Link
          type="button"
          className="rounded btn btn-info px-3 ml-3"
          to={`/completedTodo/${teamCode}/${userCode}`}
        >
          <i className="fa fa-check-circle"></i> Completed TODO{"   "}
          <span className="badge bg-dark"></span>
        </Link>
        <Link
          type="button"
          className="rounded btn btn-warning px-3 ml-3"
          to={`/teamMember/${teamCode}/${userCode}`}
        >
          <i className="fas fa-users"></i> List Members
        </Link>
      </div>
    );
  }
}
export default AddandListButton;
