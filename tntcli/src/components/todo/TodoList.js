import React, { Component } from "react";
import { Link } from "react-router-dom";

class TodoList extends Component {
  render() {
    const { todo } = this.props;
    return (
      <div class="todo-list-content card  ml-3 mb-3">
        <div className="card-body">
          <p className="mr-5">
            TODO : <span>{todo.name}</span>
          </p>

          <p>
            Status : <span>{todo.status}</span>
          </p>
          <p class="card-title  ">
            Assigned To : <span>{todo.assignedTo}</span>
          </p>
          <p class="card-title ">
            Due Date and Time : <span></span>
          </p>
          <p class="card-text text-light font-italic">{todo.comment}</p>
        </div>
        <span class="surface"></span>
        <p class="todo-detail text-justify ">{todo.detail}</p>
        <Link to="#">
          <i class="fa fa-edit icons"></i>
        </Link>
        <Link to="#">
          <i class="fa fa-trash icons"></i>
        </Link>
      </div>
    );
  }
}
export default TodoList;
