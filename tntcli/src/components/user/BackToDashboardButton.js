import React, { Component } from "react";
import { Link } from "react-router-dom";

class BackToDashboardButton extends Component {
  render() {
    const { teamCode, userCode } = this.props;
    return (
      <div>
        <Link
          to={`/teamLeadDashboard/${teamCode}/${userCode}`}
          type="button"
          class="btn btn-outline-dark ml-3 mt-n3 rounded-circle"
        >
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </Link>
      </div>
    );
  }
}

export default BackToDashboardButton;
