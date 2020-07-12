import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getUser } from "./../../actions/userActions";
import { message } from "antd";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  componentDidMount() {
    const { teamCode, userCode } = this.props;
    this.props.getUser(teamCode, userCode, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    const { name } = nextProps.user;
    this.setState({ name });
  }
  logOutMessage = () => {
    const key = "updatable";
    setTimeout(() => {
      message.success({
        content: "  Logged Out",
        className: "custom-class",
        style: {
          position: "relative",
          margin: "-48% 0 10% 43%",
          width: "max-content",
          padding: "6px",
          color: "#00ff66",
          background: "#323131b3",
          borderRadius: "15px",
          padding: "15px",
          border: "solid gray 1px",
        },
        top: 100,
        key,
        duration: 2,
      });
    }, 1000);
  };
  render() {
    const { teamCode, userCode } = this.props;
    return (
      <div id="main-header">
        <nav className=" navbar navbar-expand-sm  mb-4 mx-5">
          <a className="navbar-brand text-light mt-n1">
            Team & TODO Management Tool
          </a>
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
              {/*<li className="nav-item text-light mt-2 mr-5 font-weight-light font-italic">
                Welcome, {this.state.name}!
    </li>*/}
              <li>
                <a
                  className="nav-link dropdown-toggle text-light"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-user mt-n1" aria-hidden="true"></i>
                </a>
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
                    to="/"
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
