import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { deleteUser } from "../../actions/userActions";

class UserItemAdmin extends Component {
  onDeleteClick = (teamCode, userCode) => {
    window.confirm("Are you sure you want to remove this member?") &&
      this.props.deleteUser(teamCode, userCode);
  };
  render() {
    const { user } = this.props;
    const { userCode, teamCode } = this.props;
    return (
      <div className="container list-team-member">
        <div className="card card-body  list-member mb-3 p-3">
          <div className="row">
            <div className="col-lg-8 col-md-6 col-10 pl-4 list-team-detail">
              <h3>
                <span>
                  {user.name}
                  <span className="font-italic h6">
                    {" "}
                    ({user.username}){" "}
                    {(() => {
                      switch (user.role) {
                        case 2:
                          return (
                            <span>
                              -{" "}
                              <span className="text-danger">
                                Team Lead <br />
                              </span>
                            </span>
                          );

                        default:
                          return;
                      }
                    })()}
                  </span>
                </span>
              </h3>

              <small>
                User Id : <span>{user.userCode}</span>
              </small>
            </div>
            <div className="col-lg-4 col-md-6 col-2 d-flex justify-content-end mt-n2 mb-3">
              <Link
                data-toggle="tooltip"
                title="Edit Team Member"
                type="button"
                className="rounded btn btn-warning px-3 py-2 mt-3 mr-2"
                to={`/updateTeamMemberAdmin/${teamCode}/${userCode}/${user.teamCode}/${user.userCode}`}
              >
                <i className="fas fa-user-edit"></i>
              </Link>
              <div
                data-toggle="tooltip"
                title="Delete Team Member"
                onClick={this.onDeleteClick.bind(
                  this,
                  user.teamCode,
                  user.userCode
                )}
                type="button"
                className="rounded btn btn-danger px-3 py-2  ml-2 mt-3 mr-2"
              >
                <i class="fas fa-trash-alt"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
UserItemAdmin.propTypes = {
  deleteUser: PropTypes.func.isRequired,
};
export default connect(null, { deleteUser })(UserItemAdmin);
