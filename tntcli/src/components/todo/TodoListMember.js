import React, { Component } from "react";
import { Link } from "react-router-dom";

class TodoListMember extends Component {
  render() {
    const { todo } = this.props;
    const { userCode } = this.props;
    return (
      <div className="todo-list-content card  ml-3 mb-3">
        <div className="card-body">
          <p className="mr-5">
            TODO : <span>{todo.name}</span>
          </p>

          <p>
            Status : <span>{todo.status}</span>
          </p>
          <p className="card-title  ">
            Assigned To : <span>{todo.assignedTo}</span>
          </p>
          <p className="card-title ">
            Due Date and Time : <span>{todo.dueDateAndTime}</span>
          </p>
          <p className="card-text text-light font-italic">{todo.comment}</p>
        </div>
        <span className="surface"></span>
        <p className="todo-detail-member text-justify ">{todo.detail}</p>
        <Link
          to={`/updateUserTodo/${todo.teamCode}/${userCode}/${todo.taskIdentifier}`}
        >
          <i className="fa fa-edit icons"></i>
        </Link>
      </div>
    );
  }
}
export default TodoListMember;
