import React, { Component } from "react";
import Header from "./../layout/Header";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getTeams } from "../../actions/adminAction";
import TeamList from "./TeamList";

class AdminDashboard extends Component {
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
    this.props.getTeams(this.props.history);
  }
  updateSearch(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    console.log("---isloggedIn -" + this.state.IsLoggedIn);
    if (this.state.IsLoggedIn === false) {
      return <Redirect to="/login" />;
    }
    const { teams } = this.props.teams;
    let filteredTeams = teams.filter((team) => {
      return (
        team.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    const { teamCode, userCode } = this.props.match.params;

    return (
      <div className="adminDash ">
        <Header teamCode={teamCode} userCode={userCode} />
        <div className="admin-menu">
          <Link
            className="nav-link  btn btn-outline-dark rounded-circle "
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            to=""
          >
            <i
              className="fa fa-ellipsis-v mt-n1 text-light"
              aria-hidden="true"
            ></i>
          </Link>
          <div
            className="dropdown-menu admin-menu-content"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <Link
              className="dropdown-item"
              to={`/addTeamForm/${teamCode}/${userCode}`}
            >
              <i className="fa fa-plus-circle"></i> Add Team
            </Link>
            <Link
              className="dropdown-item"
              to={`/listAllEmployees/${teamCode}/${userCode}`}
            >
              <i className="fas fa-users"></i> All Employees
            </Link>
          </div>
        </div>
        <div className="team-list ml-5 ">
          <div id="team-search">
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
          {filteredTeams.map((team) => (
            <TeamList
              key={team.id}
              team={team}
              userCode={userCode}
              teamCode={teamCode}
            />
          ))}
        </div>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  getTeams: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  teams: state.teams,
});
export default connect(mapStateToProps, { getTeams })(AdminDashboard);
