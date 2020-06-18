import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import Header from "./../layout/Header";
import { Link } from "react-router-dom";
import { getUser } from "../../actions/userActions";
import { createTeam } from "./../../actions/adminAction";

class AddTeamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      projectName: "",
      teamCode: "",
      role: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { teamCode, userCode } = this.props.match.params;
    this.props.getUser(teamCode, userCode, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const { role } = nextProps.user;
    this.setState({ role });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { teamCode, userCode } = this.props.match.params;
    const newTeam = {
      name: this.state.name,
      projectName: this.state.projectName,
      teamCode: this.state.teamCode,
    };
    window.confirm("Are you sure you want to Add team ?") &&
      this.props.createTeam(
        teamCode,
        userCode,
        this.state.role,
        newTeam,
        this.props.history
      );
  }

  render() {
    const { errors } = this.state;
    const { teamCode, userCode } = this.props.match.params;
    return (
      <div className="add-user">
        <Header teamCode={teamCode} userCode={userCode} />
        <Link
          to={`/adminDashboard/${teamCode}/${userCode}`}
          type="button"
          className="btn btn-outline-light ml-3 mt-n3 rounded-circle"
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </Link>
        <div className="add-user-form container">
          <div className="d-flex justify-content-center h-100">
            <div className="card">
              <div className="card-body">
                <h5 className="display-5 text-center text-light">Add Team</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="input-group form-group">
                    <input
                      type="text"
                      className={classnames("form-control", {
                        "is-invalid": errors.name,
                      })}
                      placeholder="Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="input-group form-group">
                    <input
                      type="text"
                      className={classnames("form-control", {
                        "is-invalid": errors.teamCode,
                      })}
                      placeholder="teamCode"
                      name="teamCode"
                      value={this.state.teamCode}
                      onChange={this.onChange}
                    />
                    {errors.teamCode && (
                      <div className="invalid-feedback">{errors.teamCode}</div>
                    )}
                  </div>

                  <div className="input-group form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Project Name"
                      name="projectName"
                      value={this.state.projectName}
                      onChange={this.onChange}
                    />
                  </div>
                  <input type="submit" className="btn float-right login_btn" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddTeamForm.propTypes = {
  createTeam: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.users.user,
  errors: state.errors,
});
export default connect(mapStateToProps, { createTeam, getUser })(AddTeamForm);
