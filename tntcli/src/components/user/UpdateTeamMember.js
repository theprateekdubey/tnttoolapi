import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import classnames from "classnames";
import Header from "../layout/Header";
import BackToMemberListboardButton from "./BackToMemberListboardButton";
import { getUser, createUser } from "./../../actions/userActions";

class UpdateTeamMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      username: "",
      password: "password",
      role: "1",
      userCode: "",
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
    const { teamCode, userCode } = this.props.match.params;
    event.preventDefault();
    const updateUser = {
      id: this.state.id,
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
    };
    this.props.createUser(teamCode, userCode, updateUser, this.props.history);
  }
  render() {
    const { errors } = this.state;
    const { teamCode, userCode } = this.props.match.params;
    return (
      <div className="add-user">
        <Header />
        <BackToMemberListboardButton teamCode={teamCode} userCode={userCode} />
        <div className="add-user-form container">
          <div className="d-flex justify-content-center h-100">
            <div className="card">
              <div className="card-body">
                <h5 className="display-5 text-center text-light">
                  Update Team Member
                </h5>
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
  // getUsers: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.errors,
  user: state.users.user,
});
export default connect(mapStateToProps, { getUser, createUser })(
  UpdateTeamMember
);
