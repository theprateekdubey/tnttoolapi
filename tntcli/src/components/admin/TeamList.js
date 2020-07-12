import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { deleteTeam } from "../../actions/adminAction";
import { message } from "antd";

class TeamList extends Component {
  onDeleteClick = (teamId) => {
    window.confirm("Are you sure you want to delete the Team?") &&
      this.props.deleteTeam(teamId) &&
      this.openMessage();
  };
  openMessage = () => {
    const { team } = this.props;
    const key = "updatable";
    setTimeout(() => {
      message.success({
        content: "  Team ' " + team.name + " ' deleted succesfully",
        className: "custom-class",
        style: {
          position: "relative",
          margin: "-4% 0 10% 37%",
          width: "max-content",
          padding: "6px",
          color: "#00ff66",
          background: "#323131b3",
          borderRadius: "15px",
          padding: "15px",
          border: "solid gray 1px",
        },
        top: 100,
        key,
        duration: 2,
      });
    }, 1000);
  };
  render() {
    const { team } = this.props;
    const { teamCode, userCode } = this.props;
    return (
      <div className="team-list-content card ml-3 mb-3">
        <div className="card-body">
          <p className="mr-5">
            Team : <span>{team.name}</span>
          </p>

          <p>
            Project Name : <span>{team.projectName}</span>
          </p>
          <p className="card-title  ">
            Team Code : <span>{team.teamCode}</span>
          </p>

          {(() => {
            switch (team.teamCode) {
              case "A01":
                return;
              default:
                return (
                  <p className="card-title ">
                    Team Lead : <span>{team.teamLead}</span>
                  </p>
                );
            }
          })()}
        </div>
        <span className="surface"></span>

        <Link
          data-toggle="tooltip"
          title="List Team Members"
          to={`/listTeamMember/${teamCode}/${userCode}/${team.teamCode}`}
        >
          <i className="fa fa-list icons"></i>
        </Link>

        <Link
          data-toggle="tooltip"
          title="Edit Team "
          to={`/updateTeamForm/${teamCode}/${userCode}/${team.teamCode}`}
        >
          <i className="fa fa-edit icons"></i>
        </Link>

        {(() => {
          switch (team.teamCode) {
            case "A01":
              return;
            default:
              return (
                <div
                  data-toggle="tooltip"
                  title="Delete Team "
                  onClick={this.onDeleteClick.bind(this, team.teamCode)}
                >
                  <i className="fa fa-trash icons"></i>
                </div>
              );
          }
        })()}
      </div>
    );
  }
}

TeamList.propTypes = {
  deleteTeam: PropTypes.func.isRequired,
};
export default connect(null, { deleteTeam })(TeamList);
