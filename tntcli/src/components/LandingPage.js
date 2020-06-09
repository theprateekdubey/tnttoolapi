import React, { Component } from "react";
import HeaderLandingPage from "./layout/HeaderLandingPage";
import FooterLandingPage from "./layout/FooterLandingPage";

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <div>
          <HeaderLandingPage />
        </div>
        <div className="container">
          <div className="landing-page-content"></div>
        </div>
        <div>
          <FooterLandingPage />
        </div>
      </div>
    );
  }
}
export default LandingPage;
