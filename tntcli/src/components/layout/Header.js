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
    return (
      <div id="main-header">
        <nav className=" navbar navbar-expand-sm  mb-4 mx-5">
          <a className="navbar-brand text-light mt-n3">
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
              <li className="nav-item">
                <Link className="nav-link text-light" to="/">
                  <i class="fas fa-sign-out-alt h5 mt-1"></i>
                </Link>
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
