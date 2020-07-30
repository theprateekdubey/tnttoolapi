import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import classnames from "classnames";
import Header from "../layout/Header";
import BackToMemberListboardButton from "./BackToMemberListboardButton";
import { createUser } from "./../../actions/userActions";
import { Redirect } from "react-router-dom";

class AddTeamMember extends Component {
  constructor(props) {
    const { userCode } = props.match.params;
    super(props);
    const Token = sessionStorage.getItem(userCode + "Token");
    let IsLoggedIn = true;
    if (Token === null) {
      IsLoggedIn = false;
    }
    this.state = {
      IsLoggedIn,
      name: "",
      username: "",
      password: "Password2020",
      role: "1",
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
    event.preventDefault();
    const { teamCode, userCode } = this.props.match.params;
    const newUser = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
    };
    window.confirm("Are you sure you want to add this member to the team?") &&
      this.props.createUser(teamCode, userCode, newUser, this.props.history);
  }
  render() {
    if (this.state.IsLoggedIn === false) {
      return <Redirect to="/login" />;
    }
    const { errors } = this.state;
    const { teamCode, userCode } = this.props.match.params;
    return (
      <div className="add-user">
        <Header teamCode={teamCode} userCode={userCode} />
        <BackToMemberListboardButton teamCode={teamCode} userCode={userCode} />
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
                      required
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
                      required
                    />
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
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
AddTeamMember.propTypes = {
  createUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, { createUser })(AddTeamMember);
