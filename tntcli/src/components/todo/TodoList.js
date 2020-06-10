import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteTodo } from "../../actions/todoAction";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

class TodoList extends Component {
  onDeleteClick = (userId, taskId) => {
    console.log("-------> delete method called.");
    this.props.deleteTodo(userId, taskId);
  };
  render() {
    const { todo } = this.props;
    const { userCode } = this.props;
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
            Due Date and Time : <span>{todo.dueDateAndTime}</span>
          </p>
          <p class="card-text text-light font-italic">{todo.comment}</p>
        </div>
        <span class="surface"></span>
        <p class="todo-detail text-justify ">{todo.detail}</p>
        <Link
          to={`/updateTodo/${todo.teamCode}/${userCode}/${todo.taskIdentifier}`}
        >
          <i class="fa fa-edit icons"></i>
        </Link>

        <div
          onClick={this.onDeleteClick.bind(
            this,
            todo.userCode,
            todo.taskIdentifier
          )}
        >
          <i class="fa fa-trash icons"></i>
        </div>
      </div>
    );
  }
}
TodoList.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
};
export default connect(null, { deleteTodo })(TodoList);
