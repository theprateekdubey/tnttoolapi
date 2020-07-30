import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getUser } from "./../../actions/userActions";
import { message } from "antd";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { logginStatus: true, name: "", role: "" };
    this.events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
    ];
    this.logout = this.logout.bind(this);
    this.resetTimeout = this.resetTimeout.bind(this);

    for (var i in this.events) {
      window.addEventListener(this.events[i], this.resetTimeout);
    }

    this.setTimeout();
  }

  clearTimeout() {
    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  setTimeout() {
    this.logoutTimeout = setTimeout(this.logout, 600 * 1000);
  }

  resetTimeout() {
    this.clearTimeout();
    this.setTimeout();
  }

  logout() {
    this.redirect();
  }

  componentDidMount() {
    const { teamCode, userCode } = this.props;
    this.props.getUser(teamCode, userCode, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    const { name, role } = nextProps.user;
    this.setState({ name, role });
  }
  redirect() {
    this.logOutMessage();
  }
  logOutMessage = () => {
    const { userCode } = this.props;
    sessionStorage.removeItem(userCode + "Token");
    const key = "updatable";
    setTimeout(() => {
      message.success({
        content: "  Logged Out",
        className: "custom-class",
        style: {
          position: "relative",
          margin: "-14% 0 10% 14%",
          width: "max-content",
          color: "black",
          background: "#ffffffd1",
          borderRadius: "15px",
          padding: "15px",
          border: "solid #686464 2px",
        },
        top: 100,
        key,
        duration: 2,
      });
    }, 1000);
    window.location.reload(false);
  };
  render() {
    const { teamCode, userCode } = this.props;
    return (
      <div id="main-header">
        <nav className=" navbar navbar-expand-sm  mb-4 mx-5">
          <Link to="#" className="navbar-brand text-light mt-n1">
            Team & TODO Management Tool
          </Link>
          <button
            className="navbar-toggler bg-dark mt-n2 mx-n5 px-3"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <i className="fa fa-bars text-light"></i>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item text-light mt-2 mr-5 font-weight-light font-italic">
                Hello, {this.state.name}
              </li>
              <li>
                <Link
                  className="nav-link dropdown-toggle text-light"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  to=""
                >
                  <i className="fa fa-user mt-n1" aria-hidden="true"></i>
                </Link>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <Link
                    className="dropdown-item"
                    to={`/updateUserCredentials/${teamCode}/${userCode}`}
                  >
                    Manage Credentials{" "}
                    <i className="fa fa-cog fa-spin fa-1x"></i>
                  </Link>
                  <Link
                    className="dropdown-item"
                    onClick={this.logOutMessage.bind()}
                    to="/login"
                  >
                    Sign Out <i className="fas fa-sign-out-alt"></i>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
Header.propTypes = {
  getUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.users.user,
});
export default connect(mapStateToProps, { getUser })(Header);
