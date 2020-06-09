import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserItem extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="container list-team-member">
        <div className="card card-body  list-member mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto"></span>
            </div>
            <div className="col-lg-6 col-md-4 col-8 text-light">
              <h3>{user.name}</h3>
              <p>description</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <Link
                type="button"
                className="rounded-pill btn btn-warning px-5 mt-3"
                to={`/UpdateTeamMember/${user.teamCode}/${user.userCode}`}
              >
                <i class="fa fa-edit"></i>
              </Link>

              <Link
                type="button"
                className="rounded-pill btn btn-danger px-5 ml-2 mt-3"
                to={`/RemoveTeamMember/${user.teamCode}/${user.userCode}`}
              >
                <i class="fa fa-trash"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UserItem;
