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
    if (Token === null) {
      IsLoggedIn = false;
    }
    this.state = {
      search: "",
      IsLoggedIn,
    };
  }
  componentDidMount() {
    const { teamCode } = this.props.match.params;
    this.props.getUsers(teamCode, this.props.history);
  }
  updateSearch(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    if (this.state.IsLoggedIn === false) {
      return <Redirect to="/login" />;
    }
    const { users } = this.props.users;
    let filteredUsers = users.filter((user) => {
      return (
        user.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    const { teamCode, userCode } = this.props.match.params;
    return (
      <div>
        <Header teamCode={teamCode} userCode={userCode} />
        <BackToTeamMemberDashBoard teamCode={teamCode} userCode={userCode} />
        <div id="all_team-member-search">
          <form action="" autocomplete="on">
            <input
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
              id="search"
              name="search"
              type="text"
              placeholder="Search..."
            />
            <input type="search" />
          </form>
        </div>
        {filteredUsers.map((user) => (
          <div className="container list-team-peer">
            <div className="card card-body list-peer mb-3">
              <div className="row">
                <div className="list-peer-detail px-3">
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

ListPeers.propTypes = {
  user: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateToProps, { getUsers })(ListPeers);
