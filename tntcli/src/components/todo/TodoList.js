import React, { Component } from "react";
import { Link } from "react-router-dom";
import ViewTodoDetails from "./ViewTodoDetails";

class TodoList extends Component {
  render() {
    return (
      <div className="todo-list  container mt-5">
        <div class="todo-list-content card text-white  mb-3 w-25 ">
          <div class="card-header">
            TODO : name<p>Status : </p>
          </div>
          <div class="card-body">
            <p class="card-title font-italic">Assigned To : person</p>
            <p class="card-title font-italic">Due Date and Time : </p>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>

            <ViewTodoDetails />
          </div>
        </div>
      </div>
    );
  }
}
export default TodoList;
