import React, { Component } from "react";
import { Link } from "react-router-dom";

class AddandListButton extends Component {
  render() {
    const { teamCode, userCode } = this.props;
    return (
      <div className="mx-5 d-flex justify-content-end mt-n2 gradient-buttons">
        <Link
          type="button"
          className="rounded btn btn-success px-3 ml-3 "
          to={`/addTodo/${teamCode}/${userCode}`}
        >
          <i class="fa fa-plus-circle"></i> Add TODO
        </Link>
        <Link
          type="button"
          className="rounded btn btn-info px-3 ml-3"
          to={`/completedTodo/${teamCode}/${userCode}`}
        >
          <i class="fa fa-check-circle"></i> Completed TODO{"   "}
          <span class="badge bg-dark"></span>
        </Link>
        <Link
          type="button"
          className="rounded btn btn-warning px-3 ml-3"
          to={`/teamMember/${teamCode}/${userCode}`}
        >
          <i class="fas fa-users"></i> List Members
        </Link>
      </div>
    );
  }
}
export default AddandListButton;
