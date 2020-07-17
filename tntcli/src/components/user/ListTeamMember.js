import React, { Component } from "react";
import { getUsers } from "./../../actions/userActions";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Header from "./../layout/Header";
import UserItem from "./UserItem";
import { Link } from "react-router-dom";
import BackToDashboardButton from "./BackToDashboardButton";

class ListTeamMember extends Component {
  componentDidMount() {
    const { teamCode } = this.props.match.params;
    this.props.getUsers(teamCode, this.props.history);
  }
  render() {
    const { users } = this.props.users;
    const { teamCode, userCode } = this.props.match.params;
    return (
      <div>
        <Header teamCode={teamCode} userCode={userCode} />
        <BackToDashboardButton teamCode={teamCode} userCode={userCode} />
        <div className="d-flex justify-content-end mt-n2">
          <Link
            type="button"
            className="add-member-btn rounded  btn btn-success px-3 mt-n4 mr-5"
            to={`/addTeamMember/${teamCode}/${userCode}`}
          >
            <i className="fas fa-user-plus"></i> Add Member
          </Link>
        </div>
        <p>
          {users.map((user) => (
            <span>
              <UserItem key={user.id} user={user} userCode={userCode} />
            </span>
          ))}
        </p>
      </div>
    );
  }
}

ListTeamMember.propTypes = {
  getUsers: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateToProps, { getUsers })(ListTeamMember);
