import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "./../../../../actions/userActions";
import HeaderLandingPage from "../../HeaderLandingPage";
import classnames from "classnames";
import { Link } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userCode: "",
      currentPasswordHidden: false,
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.login(userData, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  toggleShowCurrentPassword = () => {
    const { currentPasswordHidden } = this.state;
    this.setState({
      currentPasswordHidden: !currentPasswordHidden,
    });
  };
  render() {
    const { errors } = this.state;
    const { currentPasswordHidden } = this.state;
    return (
      <div className="login-form">
        <div>
          <HeaderLandingPage />
        </div>
        <div className="container">
          <div className="d-flex justify-content-center h-100">
            <div className="card">
              <div className="card-header">
                <h3 className="text-light mt-5">ACCOUNT LOGIN</h3>
                <div className="d-flex justify-content-end social_icon">
                  <span>
                    <i className="fab fa-facebook-square"></i>
                  </span>
                  <span>
                    <i className="fab fa-google-plus-square"></i>
                  </span>
                  <span>
                    <i className="fab fa-twitter-square"></i>
                  </span>
                </div>
              </div>
              <div className="card-body mt-n3">
                <form onSubmit={this.onSubmit}>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text btn">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="username"
                      className={classnames("form-control", {
                        "is-invalid": errors.userCode,
                      })}
                      placeholder="username"
                      value={this.state.username}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text btn">
                        <i className="fas fa-key"></i>
                      </span>
                    </div>
                    <div className="login-pass-field">
                      <input
                        type={currentPasswordHidden ? "text" : "password"}
                        name="password"
                        className={classnames("form-control", {
                          "is-invalid": errors.userCode,
                        })}
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.onChange}
                      />
                      {errors.userCode && (
                        <div className="invalid-feedback">
                          {errors.userCode}
                        </div>
                      )}
                    </div>
                    <div className="login-show-pass">
                      <span
                        type="button"
                        onClick={this.toggleShowCurrentPassword}
                      >
                        <i
                          className={`fa ${
                            currentPasswordHidden ? "fa-eye-slash" : "fa-eye"
                          } login-show-pass`}
                        ></i>
                      </span>
                    </div>
                  </div>

                  <input type="submit" className="btn float-right login_btn" />
                </form>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-center links text-light mb-3">
                  Forgot password?
                  <Link
                    type="button"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    to=""
                  >
                    Ask for it
                  </Link>
                </div>
                <div className="modal fade" id="exampleModalCenter">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header p-3">
                        <h5
                          className="modal-title text-primary"
                          id="exampleModalLongTitle"
                        >
                          Need Help ?
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body text-secondary font-italic text-justify">
                        If you have
                        <span className="text-danger"> forgotten </span>
                        your username or password then please, <br /> Reach out
                        to your
                        <span className="text-success">
                          {" "}
                          <u>Lead</u>{" "}
                        </span>{" "}
                        or
                        <span className="text-success">
                          {" "}
                          <u>Administration</u>{" "}
                        </span>
                        to reset it.
                      </div>
                      <div className="modal-footer p-2">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-dismiss="modal"
                        >
                          Ok
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, { login })(LoginForm);
