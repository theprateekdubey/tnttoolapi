import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Header from "./../layout/Header";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { getUser, updateUserViaAdmin } from "../../actions/userActions";

class UpdateTeamMemberAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      username: "",
      password: "password",
      role: "",
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
    const { teamCode, userCode } = this.props.match.params;
    this.props.getUser(teamCode, userCode, this.props.history);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    const { teamId, userId } = this.props.match.params;
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
      "Are you sure you want to Update the details of this member ?"
    ) &&
      this.props.updateUserViaAdmin(
        teamId,
        userId,
        updateUser,
        this.state.teamCode,
        this.props.history
      );
  }
  render() {
    const { errors } = this.state;
    const { userId, teamId, teamCode } = this.props.match.params;
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
                              <option value={0}>Select role</option>
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
                              <option value={0}>Select role</option>
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
UpdateTeamMemberAdmin.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  updateUserViaAdmin: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.errors,
  user: state.users.user,
});
export default connect(mapStateToProps, { getUser, updateUserViaAdmin })(
  UpdateTeamMemberAdmin
);
