import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "./../../actions/userActions";

var memberCount = 0;
class TeamMemberCount extends Component {
  componentDidMount() {
    const { teamCode } = this.props;
    this.props.getUsers(teamCode, this.props.history);
  }
  componentWillUnmount() {
    memberCount = 0;
  }
  increment() {
    memberCount = memberCount + 1;
  }
  render() {
    const { users } = this.props.users;
    return (
      <div>
        <p>
          {users.map((user) => (
            <span>{this.increment()}</span>
          ))}
        </p>
        {memberCount}
      </div>
    );
  }
}
TeamMemberCount.propTypes = {
  getUsers: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { getUsers })(TeamMemberCount);
