import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import BackToTeamMemberDashBoard from "./BackToTeamMemberDashBoard";
import { getUsers } from "./../../actions/userActions";
import Header from "./../layout/Header";
import { Redirect } from "react-router-dom";

class ListPeers extends Component {
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
    const { teamCode } = this.props.match.params;
    this.props.getUsers(teamCode, this.props.history);
  }

  render() {
    if (this.state.IsLoggedIn === false) {
      return <Redirect to="/login" />;
    }
    const { users } = this.props.users;
    const { teamCode, userCode } = this.props.match.params;
    return (
      <div>
        <Header teamCode={teamCode} userCode={userCode} />
        <BackToTeamMemberDashBoard teamCode={teamCode} userCode={userCode} />
        {users.map((user) => (
          <div className="container list-team-peer">
            <div className="card card-body list-peer mb-3">
              <div className="row">
                <div className="list-peer-detail px-5">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

ListPeers.propTypes = {
  user: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateToProps, { getUsers })(ListPeers);
