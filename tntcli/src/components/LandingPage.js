import React, { Component } from "react";
import HeaderLandingPage from "./layout/HeaderLandingPage";
import FooterLandingPage from "./layout/FooterLandingPage";

class LandingPage extends Component {
  render() {
    //after window is loaded completely
    window.onload = setInterval(function () {
      //hide the preloader
      document.querySelector(".loader").style.display = "none";
      document.querySelector("#overlayer").style.display = "none";
    }, 1500);
    return (
      <div className="landing-page">
        <div id="overlayer"></div>
        <div class="loader">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
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
