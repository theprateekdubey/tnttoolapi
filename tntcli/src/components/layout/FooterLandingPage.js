import React, { Component } from "react";

export default class FooterLandingPage extends Component {
  render() {
    return (
      <div>
        <footer id="main-footer" className="p-3">
          <div className="row">
            <div className="col-md-8">
              <p className="text-light">
                <i className="fas fa-user-circle"></i> About Us
              </p>
              <i className="text-light">
                We're a learning Developer, who loves building web solutions. We
                have designed product features and flows (from gathering
                requirements to prototyping) and brand web-applications,
                banners, posters, etc. And, we seek our creative inspiration
                from mother nature.
              </i>
            </div>

            <div className="col-md-4">
              <p className="text-light contact-us">
                <i className="fa fa-address-card" aria-hidden="true"></i>{" "}
                Contact Us
              </p>

              <div className="social-bar">
                <a
                  href="https://www.facebook.com/"
                  className=" social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="img/facebook.svg"
                    className="social-icons"
                    alt="facebook"
                  />
                </a>

                <a
                  href="https://www.instagram.com/it_marshals/"
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="img/instagram.svg"
                    className="social-icons"
                    alt="skype"
                  />
                </a>

                <a
                  href="https://www.linkedin.com/"
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="img/linkedin.svg"
                    className="social-icons"
                    alt="linkedin"
                  />
                </a>

                <a
                  href="mailto:it.marshals20@gmail.com?subject=Appreciated your work, want to connect with you&"
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="img/gmail.svg"
                    className="social-icons"
                    alt="gmail"
                  />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
