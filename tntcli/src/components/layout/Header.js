import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getUser } from "./../../actions/userActions";

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
  render() {
    const { teamCode, userCode } = this.props;
    return (
      <div id="main-header">
        <nav className=" navbar navbar-expand-sm  mb-4 mx-5">
          <a className="navbar-brand text-light mt-n1">
            Team & TODO Management Tool
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item text-light mt-2 mr-5 font-weight-light font-italic">
                Welcome, {this.state.name}!
              </li>
              <a
                class="nav-link dropdown-toggle text-light"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fa fa-user mt-n1" aria-hidden="true"></i>
              </a>
              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link
                  class="dropdown-item"
                  to={`/updateUserCredentials/${teamCode}/${userCode}`}
                >
                  Edit Credentials <i className="fa fa-edit icons"></i>
                </Link>
                <Link className="nav-link text-dark ml-3" to="/">
                  Sign Out <i class="fas fa-sign-out-alt"></i>
                </Link>
              </div>
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
