import React, { Component } from "react";
import Header from "./../layout/Header";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getUsersList } from "./../../actions/userActions";

class ListAllEmployees extends Component {
  componentDidMount() {
    this.props.getUsersList(this.props.history);
  }
  render() {
    const { teamCode, userCode } = this.props.match.params;
    const { users } = this.props.users;
    return (
      <div>
        <Header teamCode={teamCode} userCode={userCode} />
        <Link
          to={`/adminDashboard/${teamCode}/${userCode}`}
          type="button"
          className="btn btn-outline-light ml-3 mt-n3 rounded-circle"
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </Link>
        {users.map((user) => (
          <div className="list-user-admin ">
            <div className="card card-body list-users  mb-3">
              <div className="row">
                <div className="list-users-details  px-5">
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
                            case 3:
                              return (
                                <span>
                                  -{" "}
                                  <span className="text-danger">
                                    Admin <br />
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

                  <small className="ml-3">
                    Team Id : <span>{user.teamCode}</span>
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

ListAllEmployees.propTypes = {
  user: PropTypes.object.isRequired,
  getUsersList: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateToProps, { getUsersList })(ListAllEmployees);
