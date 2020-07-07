import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class FooterLandingPage extends Component {
  render() {
    return (
      <div>
        <footer id="main-footer" className="p-3">
          <div className="row">
            <div className="col-md-5">
              <p className="text-light">
                <i className="fas fa-user-circle"></i> About Us
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
              <Link
                to="#"
                data-toggle="modal"
                data-target="#developerInfo"
                className="nav-link text-light mt-n2 ml-5"
              >
                Developers Description
              </Link>
            </div>
            <div className="col-md-3">
              <p className="text-light ml-5">
                <i className="fa fa-address-card" aria-hidden="true"></i>{" "}
                Contact Us
              </p>

              <div className="social-bar ml-4">
                <a
                  href="https://www.facebook.com/prateek.dubey.35513/"
                  className=" social-icon"
                  target="_blank"
                >
                  <img
                    src="img/facebook.svg"
                    className="social-icons"
                    alt="facebook"
                  />
                </a>

                <Link to="#" className="social-icon">
                  <img
                    src="img/skype.svg"
                    className="social-icons"
                    alt="skype"
                  />
                </Link>

                <a
                  href="https://www.linkedin.com/in/prateek-dubey-18201a159"
                  className="social-icon"
                  target="_blank"
                >
                  <img
                    src="img/linkedin.svg"
                    className="social-icons"
                    alt="linkedin"
                  />
                </a>

                <a
                  href="mailto:prateek.dubey98@gmail.com?subject=Appreciated your work, want to connect with you&"
                  className="social-icon"
                  target="_blank"
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

        <div className="modal fade" id="developerInfo">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <img
                    className="img-responsive  rounded mx-auto d-block"
                    src="img/modal1.jpg"
                    alt="Developer 1"
                  />
                  <h5 className="text-light  text-center text-muted">
                    Prateek Dubey
                  </h5>

                  <img
                    className="img-responsive border border-dark rounded mx-auto d-block"
                    src="img/modal2.jpg"
                    alt="Developer 2"
                  />
                  <h5 className="text-light  text-center text-muted">
                    Samay Jain
                  </h5>
                </div>
              </div>
              <div className="modal-footer">
                <p className="text-dark mx-auto d-block">
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
