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
          {(() => {
            switch (todo.priority) {
              case 1:
                return (
                  <p>
                    Priority : <span>High</span>
                  </p>
                );
              case 2:
                return (
                  <p>
                    Priority : <span>Medium</span>
                  </p>
                );
              case 3:
                return (
                  <p>
                    Priority : <span>Low</span>
                  </p>
                );

              default:
                return "";
            }
          })()}
          <p className="card-title ">
            Due Date : <span>{todo.dueDateAndTime}</span>
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
