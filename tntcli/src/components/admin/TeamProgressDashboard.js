import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from "react-circular-progressbar";
import Header from "../layout/Header";
import { Link, Redirect } from "react-router-dom";
import { getTodos } from "./../../actions/todoAction";
import TeamMemberCount from "./TeamMemberCount";

var totalCount = 0;
var todoCounter = 0;
var inProgressCounter = 0;
var completedCounter = 0;

class TeamProgressDashboard extends Component {
  constructor(props) {
    const { userId } = props.match.params;
    super(props);
    const Token = sessionStorage.getItem(userId + "Token");
    let IsLoggedIn = true;
    if (Token === null) {
      IsLoggedIn = false;
    }
    this.state = {
      IsLoggedIn,
    };
  }
  componentDidMount() {
    const { teamCode } = this.props.match.params;
    this.props.getTodos(teamCode, this.props.history);
  }
  componentWillUnmount() {
    todoCounter = 0;
    totalCount = 0;
    inProgressCounter = 0;
    completedCounter = 0;
    window.location.reload(false);
  }

  render() {
    if (this.state.IsLoggedIn === false) {
      return <Redirect to="/login" />;
    }
    const { teamId, userId, teamCode } = this.props.match.params;
    const { todos } = this.props.todos;

    return (
      <div className="team-progress-dashboard">
        <Header teamCode={teamId} userCode={userId} />
        <Link
          to={`/adminDashboard/${teamId}/${userId}`}
          type="button"
          className="btn btn-outline-light ml-3 mt-n3 rounded-circle"
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </Link>

        <div>
          {todos.map((todo) =>
            (() => {
              totalCount++;
              switch (todo.status) {
                case "Completed":
                  completedCounter++;
                  return;
                case "TODO":
                  todoCounter++;
                  return;
                case "In-Progress":
                  inProgressCounter++;
                  return;
                default:
                  return;
              }
            })()
          )}
        </div>

        <div className="card circular-complete-bar ">
          <div className="card-header h4 ml-n2 text-primary">
            Project Completed
          </div>
          <div className="card-body">
            <CircularProgressbar
              value={((completedCounter / totalCount) * 100).toFixed(2)}
              text={`${((completedCounter / totalCount) * 100).toFixed(2)}%`}
              data-toggle="tooltip"
              title={`Completed ${(
                (completedCounter / totalCount) *
                100
              ).toFixed(2)}%`}
            />
          </div>
        </div>

        <div className="team-progress-bar">
          <div>
            <span className="h4 text-primary">Progress Tracker</span>
            <hr />
          </div>
          <div>
            <span className="h6 text-dark font-weight-light ml-2">
              In-Progress
            </span>
          </div>
          <ProgressBar
            className="border border-dark"
            variant="warning"
            now={(inProgressCounter / totalCount) * 100}
            data-toggle="tooltip"
            title={`In-Progress ${(
              (inProgressCounter / totalCount) *
              100
            ).toFixed(2)}%`}
            label={`${((inProgressCounter / totalCount) * 100).toFixed(2)}%`}
          />
          <br />
          <div className="mt-n3">
            <span className="h6 text-dark font-weight-light ml-2">Todo</span>
          </div>
          <ProgressBar
            className="border border-dark"
            variant="danger"
            now={(todoCounter / totalCount) * 100}
            data-toggle="tooltip"
            title={`Todo ${((todoCounter / totalCount) * 100).toFixed(2)}%`}
            label={`${((todoCounter / totalCount) * 100).toFixed(2)}%`}
          />
        </div>

        <div className="card team-member-count">
          <div>
            <span className="h4 text-primary ">Team Size</span>
            <hr />
          </div>
          <div className="card-body p-0">
            <h5 className="card-title font-weight-light ">
              Number of Members in the team
            </h5>
            <p className="h2 card-text">
              <TeamMemberCount teamCode={teamCode} />
            </p>
          </div>
        </div>

        <div className="row card-stats">
          <div className="col-sm-3">
            <div className="card text-white bg-primary">
              <div className="card-header">Todo's</div>
              <div className="card-body">
                <h5 className="card-title  font-weight-light">
                  Total number of Todo's
                </h5>
                <p className="h2 card-text float-left"> {totalCount} </p>
                <span className="progress-svg-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-calendar"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card text-white bg-warning">
              <div className="card-header">In-progress</div>
              <div className="card-body">
                <h5 className="card-title  font-weight-light">
                  In-progress Todo's
                </h5>
                <p className="h2 card-text float-left"> {inProgressCounter} </p>
                <span className="progress-svg-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-edit-3"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card text-white bg-success">
              <div className="card-header">Completed</div>
              <div className="card-body">
                <h5 className="card-title  font-weight-light">
                  Completed Todo's
                </h5>
                <p className="h2 card-text float-left"> {completedCounter} </p>
                <span className="progress-svg-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-check-square"
                  >
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card text-white bg-danger">
              <div className="card-header">Todo</div>
              <div className="card-body">
                <h5 className="card-title  font-weight-light">
                  Todo's yet to start
                </h5>
                <p className="h2 card-text float-left"> {todoCounter} </p>
                <span className="progress-svg-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-message-circle"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
TeamProgressDashboard.propTypes = {
  getTodos: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  todos: state.todos,
});

export default connect(mapStateToProps, { getTodos })(TeamProgressDashboard);
