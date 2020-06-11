import React, { Component } from "react";
import { Link } from "react-router-dom";

class BackToTeamMemberDashBoard extends Component {
  render() {
    const { teamCode, userCode } = this.props;
    return (
      <div>
        <Link
          to={`/teamMemberDashboard/${teamCode}/${userCode}`}
          type="button"
          className="btn btn-outline-dark ml-3 mt-n3 rounded-circle"
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </Link>
      </div>
    );
  }
}

export default BackToTeamMemberDashBoard;
