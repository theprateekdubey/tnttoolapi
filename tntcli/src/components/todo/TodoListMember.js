import React, { Component } from "react";
import { Link } from "react-router-dom";

class TodoListMember extends Component {
  render() {
    const { todo } = this.props;
    const { userCode } = this.props;
    return (
      <div>
        {(() => {
          switch (todo.status) {
            case "Completed":
              return (
                <div className="todo-list-content card  ml-3 mb-3 border border-success">
                  <div className="card-body">
                    <p>
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
                    <p className="card-text text-light font-italic text-justify">
                      {todo.comment}
                    </p>
                  </div>
                  <span className="surface"></span>
                  <p className="todo-detail-member text-justify ">
                    {todo.detail}
                  </p>
                  <Link
                    data-toggle="tooltip"
                    title="Edit TODO"
                    to={`/updateUserTodo/${todo.teamCode}/${userCode}/${todo.taskIdentifier}`}
                  >
                    <i className="fa fa-edit icons"></i>
                  </Link>
                </div>
              );

            case "In-Progress":
              return (
                <div className="todo-list-content card  ml-3 mb-3 border border-warning">
                  <div className="card-body">
                    <p>
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
                    <p className="card-text text-light font-italic">
                      {todo.comment}
                    </p>
                  </div>
                  <span className="surface"></span>
                  <p className="todo-detail-member text-justify ">
                    {todo.detail}
                  </p>
                  <Link
                    data-toggle="tooltip"
                    title="Edit TODO"
                    to={`/updateUserTodo/${todo.teamCode}/${userCode}/${todo.taskIdentifier}`}
                  >
                    <i className="fa fa-edit icons"></i>
                  </Link>
                </div>
              );

            default:
              return (
                <div className="todo-list-content card  ml-3 mb-3 border border-secondary">
                  <div className="card-body">
                    <p>
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
                    <p className="card-text text-light font-italic">
                      {todo.comment}
                    </p>
                  </div>
                  <span className="surface"></span>
                  <p className="todo-detail-member text-justify ">
                    {todo.detail}
                  </p>
                  <Link
                    data-toggle="tooltip"
                    title="Edit TODO"
                    to={`/updateUserTodo/${todo.teamCode}/${userCode}/${todo.taskIdentifier}`}
                  >
                    <i className="fa fa-edit icons"></i>
                  </Link>
                </div>
              );
          }
        })()}
      </div>
    );
  }
}
export default TodoListMember;
