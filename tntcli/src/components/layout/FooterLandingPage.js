import React, { Component } from "react";

export default class FooterLandingPage extends Component {
  render() {
    return (
      <div>
        <footer id="main-footer" className="p-3">
          <div className="row mx-5">
            <div className="col-md-4">
              <p className="text-light">
                <i className="fa fa-cog fa-spin fa-1x"></i> About Us
              </p>
              <i className="text-light">
                We're a learning Developer, who loves building web solutions. We
                have designed product features and flows (from gathering
                requirements to prototyping) and brand websites, banners,
                posters, etc. And, we seek our creative inspiration from mother
                nature.
              </i>
            </div>
            <div className="col-md-4">
              <a
                href="#"
                data-toggle="modal"
                data-target="#developerInfo"
                className="nav-link text-light mt-n2 ml-5"
              >
                Developers Description
              </a>
            </div>
            <div className="col-md-4 ">
              <p className="text-light ml-5">
                <i className="fa fa-address-card" aria-hidden="true"></i>{" "}
                Contact Us
              </p>

              <div className="social-bar">
                <a href="#" className="social-icon">
                  <img src="img/facebook.svg" className="social-icons" />
                </a>

                <a href="#" className="social-icon">
                  <img src="img/skype.svg" className="social-icons" />
                </a>

                <a href="#" className="social-icon">
                  <img src="img/linkedin.svg" className="social-icons" />
                </a>

                <a href="#" className="social-icon">
                  <img src="img/gmail.svg" className="social-icons" />
                </a>
              </div>
            </div>
          </div>
        </footer>

        <div className="modal fade" id="developerInfo">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-dark">
                <h5 className="modal-title text-light" id="contactModalLabel">
                  Developed By
                </h5>
                <button type="button" className="close" data-dismiss="modal">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <img
                    className="img-responsive  rounded mx-auto d-block"
                    src="img/modal1.jpg"
                    alt="Developer image"
                  />
                  <h5 className="text-light  text-center text-muted">
                    Prateek Dubey
                  </h5>
                </div>
              </div>
              <div className="modal-footer bg-dark">
                <p className="text-light mx-auto d-block">
                  Thank you for Visiting...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
