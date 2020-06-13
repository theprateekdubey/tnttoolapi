import React, { Component } from "react";
import { Link } from "react-router-dom";

class AddandListButton extends Component {
  render() {
    const { teamCode, userCode } = this.props;
    return (
      <div className="mx-5 d-flex justify-content-end mt-n2">
        <Link
          type="button"
          className="rounded btn btn-success px-3 ml-3"
          to={`/addTodo/${teamCode}/${userCode}`}
        >
          <i className="fa fa-plus" aria-hidden="true"></i> Add TODO
        </Link>
        <Link
          type="button"
          className="rounded btn btn-warning px-3 ml-3"
          to={`/teamMember/${teamCode}/${userCode}`}
        >
          <i className="fa fa-list" aria-hidden="true"></i> List Team Members
        </Link>
      </div>
    );
  }
}
export default AddandListButton;
