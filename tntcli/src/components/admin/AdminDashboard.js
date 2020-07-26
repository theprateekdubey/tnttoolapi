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
      IsLoggedIn,
    };
  }
  componentDidMount() {
    this.props.getTeams(this.props.history);
  }

  render() {
    console.log("---isloggedIn -" + this.state.IsLoggedIn);
    if (this.state.IsLoggedIn === false) {
      return <Redirect to="/login" />;
    }
    const { teams } = this.props.teams;
    const { teamCode, userCode } = this.props.match.params;

    return (
      <div className="adminDash ">
        <Header teamCode={teamCode} userCode={userCode} />
        <div className="mx-5 d-flex justify-content-end mt-n2">
          <Link
            type="button"
            className="rounded btn btn-success px-3 ml-3"
            to={`/addTeamForm/${teamCode}/${userCode}`}
          >
            <i className="fa fa-plus-circle"></i> Add Team
          </Link>
          <Link
            type="button"
            className="rounded btn btn-warning px-3 ml-3"
            to={`/listAllEmployees/${teamCode}/${userCode}`}
          >
            <i className="fas fa-users"></i> All Employees
          </Link>
        </div>
        <div className="team-list ml-5 ">
          {teams.map((team) => (
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
