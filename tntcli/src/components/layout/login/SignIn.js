import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignIn extends Component {
  render() {
    return (
      <div>
        <div>
          <li className="nav-item">
            <Link
              data-toggle="modal"
              data-target="#LoginModal"
              className="nav-link "
              to="/"
            >
              Sign In
            </Link>
          </li>
        </div>
        <div class="modal fade" id="LoginModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header bg-dark">
                <h5 class="modal-title  text-light" id="contactModalLabel">
                  Login Form
                </h5>
                <button type="button" class="close" data-dismiss="modal">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="container ">
                  <form>
                    <div class="form-group ">
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        aria-describedby="usernamelabel"
                        placeholder="Username"
                      />
                    </div>
                    <div class="form-group ">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        aria-describedby="passwordlabel"
                        placeholder="Password"
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer bg-dark">
                <button>Sign In</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SignIn;
