import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createUserViaAdmin } from "../../actions/userActions";
import classnames from "classnames";
import Header from "./../layout/Header";
import { Link, Redirect } from "react-router-dom";

class AddTeamMemberAdmin extends Component {
  constructor(props) {
    const { userId } = props.match.params;
    super(props);
    const Token = sessionStorage.getItem(userId + "Token");
    let IsLoggedIn = true;
    console.log(" --token --- " + Token);
    if (Token === null) {
      IsLoggedIn = false;
    }
    this.state = {
      IsLoggedIn,
      name: "",
      username: "",
      password: "password",
      role: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    const { teamId, userId, teamCode } = this.props.match.params;
    event.preventDefault();
    const updateUser = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
    };

    window.confirm("Are you sure you want to add this member ?") &&
      this.props.createUserViaAdmin(
        teamId,
        userId,
        updateUser,
        teamCode,
        this.props.history
      );
  }
  render() {
    if (this.state.IsLoggedIn === false) {
      return <Redirect to="/login" />;
    }
    const { teamId, userId, teamCode } = this.props.match.params;
    const { errors } = this.state;
    return (
      <div className="add-user">
        <Header teamCode={teamId} userCode={userId} />
        <Link
          to={`/listTeamMember/${teamId}/${userId}/${teamCode}`}
          type="button"
          className="btn btn-outline-light ml-3 mt-n3 rounded-circle"
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </Link>
        <div className="add-user-form container">
          <div className="d-flex justify-content-center h-100">
            <div className="card">
              <div className="card-body">
                <h5 className="display-6 text-center text-light">
                  Add Team Member
                </h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="input-group form-group">
                    <input
                      data-toggle="tooltip"
                      title="Enter name here"
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
                      data-toggle="tooltip"
                      title="Enter username here"
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
                    {(() => {
                      switch (teamCode) {
                        case "A01":
                          return (
                            <select
                              data-toggle="tooltip"
                              title="Select role here"
                              className="form-control"
                              name="role"
                              value={this.state.role}
                              onChange={this.onChange}
                              required
                            >
                              <option value="">Select role</option>
                              <option value={3}>Admin</option>
                            </select>
                          );

                        default:
                          return (
                            <select
                              data-toggle="tooltip"
                              title="Select role here"
                              className="form-control"
                              name="role"
                              value={this.state.role}
                              onChange={this.onChange}
                              required
                            >
                              <option value="">Select role</option>
                              <option value={1}>Team Member</option>
                              <option value={2}>Team Lead</option>
                            </select>
                          );
                      }
                    })()}
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

AddTeamMemberAdmin.propTypes = {
  createUserViaAdmin: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, { createUserViaAdmin })(
  AddTeamMemberAdmin
);
