import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import classnames from "classnames";
import Header from "../layout/Header";
import { updateUser, getUser } from "./../../actions/userActions";
import BackToTeamMemberDashBoard from "./BackToTeamMemberDashBoard";
import BackToDashboardButton from "./BackToDashboardButton";
import { Link } from "react-router-dom";

class UpdateUserCredentials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      username: "",
      confirmPassword: "",
      password: "",
      currentPassword: "",
      newPassword: "",
      role: "",
      errorMessage: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const { id, name, username, password, role, userCode } = nextProps.user;
    this.setState({
      id,
      name,
      username,
      password,
      role,
      userCode,
    });
  }
  componentDidMount() {
    const { teamCode, userId } = this.props.match.params;
    this.props.getUser(teamCode, userId, this.props.history);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    const { teamCode, userCode } = this.props.match.params;
    if (this.state.password == this.state.currentPassword) {
      if (this.state.newPassword && this.state.confirmPassword != "") {
        if (this.state.newPassword == this.state.confirmPassword) {
          const updatedUser = {
            id: this.state.id,
            name: this.state.name,
            username: this.state.username,
            password: this.state.confirmPassword,
            role: this.state.role,
          };
          window.confirm("Are you sure you want to delete the TODO?") &&
            this.props.updateUser(
              teamCode,
              userCode,
              updatedUser,
              this.props.history
            );
        } else {
          this.setState({ errorMessage: "Your password did not match" });
          this.setState({ confirmPassword: "" });
          this.setState({ newPassword: "" });
        }
      } else {
        this.setState({
          errorMessage: "Password can not be blank",
        });
      }
    } else {
      this.setState({
        errorMessage: "Your password did not match with the current password",
      });
      this.setState({ confirmPassword: "" });
      this.setState({ newPassword: "" });
      this.setState({ currentPassword: "" });
    }
  }
  render() {
    const { user } = this.props;
    const { errors } = this.state;
    const { teamCode, userCode } = this.props.match.params;
    return (
      <div className="add-user-credentials">
        <Header teamCode={teamCode} userCode={userCode} />
        {(() => {
          switch (user.role) {
            case 1:
              return (
                <div>
                  <BackToTeamMemberDashBoard
                    teamCode={teamCode}
                    userCode={userCode}
                  />
                </div>
              );
            case 2:
              return (
                <div>
                  <BackToDashboardButton
                    teamCode={teamCode}
                    userCode={userCode}
                  />
                </div>
              );
            case 3:
              return (
                <Link
                  to={`/adminDashboard/${teamCode}/${userCode}`}
                  type="button"
                  className="btn btn-outline-light ml-3 mt-n3 rounded-circle"
                >
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </Link>
              );
            default:
              return "";
          }
        })()}
        <div className="add-user-form container">
          <div className="d-flex justify-content-center h-100">
            <div className="card">
              <div className="card-body">
                <h5 className="display-5 text-center text-light">
                  Update Credentials
                </h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="input-group form-group text-secondary border border-white p-2 rounded">
                    {this.state.name}
                  </div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-warning border border-warning">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                    <input
                      data-toggle="tooltip"
                      title="Update username here"
                      type="text"
                      className={classnames("form-control", {
                        "is-invalid": errors.username,
                      })}
                      placeholder="Username"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChange}
                    />
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-warning border border-warning">
                        <i className="fa fa-lock"></i>
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Current Password"
                      name="currentPassword"
                      value={this.state.currentPassword}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-warning border border-warning">
                        <i className="fas fa-key"></i>
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter New Password"
                      name="newPassword"
                      value={this.state.newPassword}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-warning border border-warning">
                        <i className="fas fa-key"></i>
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Re-Enter New Password"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="text-danger">{this.state.errorMessage}</div>
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
UpdateUserCredentials.propTypes = {
  updateUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.errors,
  user: state.users.user,
});
export default connect(mapStateToProps, { updateUser, getUser })(
  UpdateUserCredentials
);
