import React, { Component } from "react";
import HeaderLandingPage from "./layout/HeaderLandingPage";
import FooterLandingPage from "./layout/FooterLandingPage";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <div>
          <HeaderLandingPage />
        </div>

        <div>
          <FooterLandingPage />
        </div>
      </div>
    );
  }
}
export default LandingPage;
