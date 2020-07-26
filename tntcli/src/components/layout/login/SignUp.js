import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createTeam } from "./../../../actions/adminAction";
import { createUserViaAdmin } from "./../../../actions/userActions";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCode: "",
      teamId: "A01",
      name: "Admin",
      projectName: "Adminstration",
      username: "admin",
      password: "admin2020",
      role: "3",
      teamCode: "",
      errors: {},
    };
  }

  onRegisterClick = () => {
    const newTeam = {
      name: this.state.name,
      projectName: this.state.projectName,
      teamCode: this.state.teamId,
    };

    this.props.createTeam(
      this.state.teamId,
      this.state.userCode,
      0,
      newTeam,
      this.props.history
    );
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onClickCreateUser = () => {
    const adminUser = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
    };

    this.props.createUserViaAdmin(
      this.state.teamId,
      this.state.userCode,
      adminUser,
      this.state.teamId,
      this.props.history
    );
  };

  render() {
    return (
      <div>
        <li className="nav-item">
          <Link
            data-toggle="modal"
            data-target="#myModal"
            className="nav-link text-light "
            onClick={this.onRegisterClick.bind()}
          >
            Register Project
          </Link>
          <div
            data-backdrop="static"
            data-keyboard="false"
            className="modal fade"
            id="myModal"
            aria-labelledby="exampleModalLabel"
          >
            <div
              className="modal-dialog modal-dialog-centered"
              data-dismiss="modal"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Admin Registered Successfully , Login Credentials !
                  </h5>
                </div>
                <div className="modal-body">
                  <span className="text-secondary font-italic">Name : </span>
                  Admin
                  <br />
                  <span className="text-secondary font-italic">
                    Username :{" "}
                  </span>
                  admin
                  <br />
                  <span className="text-secondary font-italic">
                    Password :{" "}
                  </span>
                  admin2020
                  <p className="text-success font-weight-bold">
                    After clicking on 'OK', click on Sign In and enter above
                    credentials.
                  </p>
                </div>
                <div className="modal-footer">
                  <Link
                    to="/login"
                    type="button"
                    className="btn btn-primary"
                    onClick={this.onClickCreateUser.bind()}
                  >
                    Ok
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </li>
      </div>
    );
  }
}

SignUp.propTypes = {
  createTeam: PropTypes.func.isRequired,
  createUserViaAdmin: PropTypes.func.isRequired,
};
export default connect(null, {
  createTeam,
  createUserViaAdmin,
})(SignUp);
