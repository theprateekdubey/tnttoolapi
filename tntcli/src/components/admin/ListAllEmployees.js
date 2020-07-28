import React, { Component } from "react";
import Header from "./../layout/Header";
import { Link, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getUsersList } from "./../../actions/userActions";

class ListAllEmployees extends Component {
  constructor(props) {
    const { userCode } = props.match.params;
    super(props);
    const Token = sessionStorage.getItem(userCode + "Token");
    let IsLoggedIn = true;
    console.log(" --token --- " + Token);
    if (Token === null) {
      IsLoggedIn = false;
    }
    this.state = {
      IsLoggedIn,
    };
  }
  componentDidMount() {
    this.props.getUsersList(this.props.history);
  }
  render() {
    if (this.state.IsLoggedIn === false) {
      return <Redirect to="/login" />;
    }
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
                <div className="list-users-details  px-3">
                  <h4>
                    <span>{user.name}</span>
                  </h4>
                  <small>
                    User Id : <span>{user.userCode}</span>
                  </small>{" "}
                  <small className="font-italic text-light">
                    ({user.username}){" "}
                  </small>{" "}
                  <small>
                    {(() => {
                      switch (user.role) {
                        case 2:
                          return (
                            <span>
                              -{" "}
                              <span className="text-danger">
                                <u>Team Lead</u>
                              </span>
                            </span>
                          );
                        case 3:
                          return (
                            <span>
                              -{" "}
                              <span className="text-danger">
                                <u>Admin</u>
                              </span>
                            </span>
                          );
                        default:
                          return;
                      }
                    })()}
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
  getUsersList: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateToProps, { getUsersList })(ListAllEmployees);
