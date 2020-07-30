import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import classnames from "classnames";
import BackToMemberListboardButton from "./BackToMemberListboardButton";
import { getUser, updateUser } from "./../../actions/userActions";
import PlainHeader from "../layout/PlainHeader";
import { Redirect } from "react-router-dom";

class UpdateTeamMember extends Component {
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
      id: "",
      name: "",
      username: "",
      password: "Password2020",
      role: "1",
      userCode: "",
      teamCode: "",
      teamId: "",
      taskSequence: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      id,
      name,
      username,
      role,
      userCode,
      teamId,
      teamCode,
      taskSequence,
    } = nextProps.user;
    this.setState({
      id,
      name,
      username,
      role,
      userCode,
      teamId,
      teamCode,
      taskSequence,
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
    const { teamCode, userCode } = this.props.match.params;
    event.preventDefault();
    const updateUser = {
      id: this.state.id,
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
      teamId: this.state.teamId,
      userCode: this.state.userCode,
      teamCode: this.state.teamCode,
      taskSequence: this.state.taskSequence,
    };
    window.confirm(
      "Are you sure you want to update the details of this member?"
    ) &&
      this.props.updateUser(teamCode, userCode, updateUser, this.props.history);
  }
  render() {
    if (this.state.IsLoggedIn === false) {
      return <Redirect to="/login" />;
    }
    const { errors } = this.state;
    const { teamCode, userCode } = this.props.match.params;
    return (
      <div className="add-user">
        <PlainHeader />
        <BackToMemberListboardButton teamCode={teamCode} userCode={userCode} />
        <div className="add-user-form container">
          <div className="d-flex justify-content-center h-100">
            <div className="card">
              <div className="card-body">
                <h5 className="display-6 text-center text-light">
                  Update Team Member
                </h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="input-group form-group">
                    <input
                      data-toggle="tooltip"
                      title="Update name here"
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
                      title="Update username here"
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

UpdateTeamMember.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.errors,
  user: state.users.user,
});
export default connect(mapStateToProps, { getUser, updateUser })(
  UpdateTeamMember
);
