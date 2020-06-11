import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import BackToTeamMemberDashBoard from "./BackToTeamMemberDashBoard";
import { getUsers } from "./../../actions/userActions";
import Header from "./../layout/Header";

class ListPeers extends Component {
  componentDidMount() {
    const { teamCode, userCode } = this.props.match.params;
    this.props.getUsers(teamCode, this.props.history);
  }

  render() {
    const { users } = this.props.users;
    const { teamCode, userCode } = this.props.match.params;
    return (
      <div>
        <Header teamCode={teamCode} userCode={userCode} />
        <BackToTeamMemberDashBoard teamCode={teamCode} userCode={userCode} />
        {users.map((user) => (
          <div className="container list-team-peer">
            <div className="card card-body list-peer ">
              <div className="row">
                <div className="list-peer-detail">
                  <h3>
                    Name : <span>{user.name}</span>
                  </h3>
                  <h6>
                    Username : <span>{user.username}</span>
                  </h6>
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
