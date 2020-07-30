import React, { Component } from "react";
import { getUsers } from "./../../actions/userActions";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Header from "./../layout/Header";
import UserItem from "./UserItem";
import { Link, Redirect } from "react-router-dom";
import BackToDashboardButton from "./BackToDashboardButton";

class ListTeamMember extends Component {
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
          <div id="team-member-search">
            <form action="" autocomplete="on">
              <input
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}
                id="search"
                name="search"
                type="text"
                placeholder="Search..."
              />
              <input type="button" />
            </form>
          </div>
          {filteredUsers.map((user) => (
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
