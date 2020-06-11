import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { deleteUser } from "./../../actions/userActions";

class UserItem extends Component {
  onDeleteClick = (teamCode, userCode) => {
    console.log("-------> delete method called.");
    this.props.deleteUser(teamCode, userCode);
  };
  render() {
    const { user } = this.props;
    const { userCode } = this.props;
    return (
      <div className="container list-team-member">
        <div className="card card-body  list-member mb-3 p-3">
          <div className="row">
            <div className="col-lg-1 col-md-1 col-1 text-light pl-5"></div>
            <div className="col-lg-7 col-md-5 col-9 text-light pl-5">
              <h3>{user.name}</h3>
              <h6>{user.username}</h6>
              <small>{user.userCode}</small>
            </div>
            <div className="col-lg-3 col-md-5 col-1">
              <Link
                type="button"
                className="rounded-pill btn btn-warning px-5 mt-3"
                to={`/updateTeamMember/${user.teamCode}/${userCode}/${user.userCode}`}
              >
                <i className="fa fa-edit"></i>
              </Link>

              <div
                onClick={this.onDeleteClick.bind(
                  this,
                  user.teamCode,
                  user.userCode
                )}
                type="button"
                className="rounded-pill btn btn-danger px-5 ml-2 mt-3"
              >
                <i className="fa fa-trash"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
UserItem.propTypes = {
  deleteUser: PropTypes.func.isRequired,
};
export default connect(null, { deleteUser })(UserItem);
