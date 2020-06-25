import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignIn from "./login/SignIn";
import SignUp from "./login/SignUp";
import { getTeam } from "./../../actions/adminAction";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class HeaderLandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamId: "A01",
      teamCode: "",
    };
  }
  componentDidMount() {
    this.props.getTeam(this.state.teamId, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    console.log("----------team code-- - " + this.state.teamCode);

    const { teamCode } = nextProps.team;
    this.setState({ teamCode });
    console.log("----------team code-- - " + this.state.teamCode);
  }

  render() {
    return (
      <div>
        <nav className=" navbar navbar-expand-sm  mb-4 ml-5 mr-5">
          <Link className="navbar-brand text-light" to="/">
            Team and TODO Management Tool
          </Link>
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
              <SignIn />

              {(() => {
                switch (this.state.teamCode) {
                  case "A01":
                    return;

                  default:
                    return <SignUp />;
                }
              })()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

HeaderLandingPage.propTypes = {
  getTeam: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  team: state.teams.team,
});
export default connect(mapStateToProps, { getTeam })(HeaderLandingPage);
