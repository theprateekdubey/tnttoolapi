import React, { Component } from "react";
import HeaderLandingPage from "./layout/HeaderLandingPage";
import FooterLandingPage from "./layout/FooterLandingPage";

class LandingPage extends Component {
  componentDidMount() {
    sessionStorage.clear();
  }
  render() {
    return (
      <div className="landing-page">
        <div>
          <HeaderLandingPage />
        </div>
        <div className="container">
          <div className="landing-page-content ">
            <p className="landing-page-text"></p>
          </div>
        </div>
        <div>
          <FooterLandingPage />
        </div>
      </div>
    );
  }
}
export default LandingPage;
