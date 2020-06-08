import React, { Component } from "react";
import { Link } from "react-router-dom";

class ViewTodoDetails extends Component {
  render() {
    return (
      <div>
        <Link to="#" class="card-link btn btn-success btn-sm mx-1">
          Edit
        </Link>
        <Link to="#" class="card-link btn btn-danger btn-sm mx-1">
          Delete
        </Link>
        <button
          type="button"
          class="btn btn-primary btn-sm mx-1"
          data-toggle="modal"
          data-target="#viewTodo"
        >
          Details
        </button>
        <div
          class="modal fade"
          id="viewTodo"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header bg-dark">
                <h5 class="modal-title text-light" id="exampleModalLongTitle">
                  Todo Name :
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body bg-dark">
                <p class="text-light">Detials</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewTodoDetails;
