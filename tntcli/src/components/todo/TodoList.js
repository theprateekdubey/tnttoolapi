import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteTodo } from "../../actions/todoAction";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { message } from "antd";

class TodoList extends Component {
  onDeleteClick = (userId, taskId) => {
    window.confirm("Are you sure you want to delete the TODO?") &&
      this.props.deleteTodo(userId, taskId) &&
      this.openMessage();
  };
  openMessage = () => {
    const { todo } = this.props;
    const key = "updatable";
    setTimeout(() => {
      message.success({
        content: "  TODO ' " + todo.name + " ' deleted succesfully",
        className: "custom-class",
        style: {
          position: "relative",
          marginTop: "-4%",
          marginLeft: "37%",
          width: "max-content",
          marginBottom: "10%",
          padding: "6px",
          color: "green",
          background: "whitesmoke",
        },
        top: 100,
        key,
        duration: 2,
      });
    }, 1000);
  };
  render() {
    const { todo } = this.props;
    const { userCode } = this.props;
    return (
      <div>
        {(() => {
          switch (todo.status) {
            case "Completed":
              return;
            case "In-Progress":
              return (
                <div className="todo-list-content card ml-3 mb-3 border border-warning">
                  <div className="card-body">
                    <p className="mr-5">
                      TODO : <span>{todo.name}</span>
                    </p>

                    <p>
                      Status : <span>{todo.status}</span>
                    </p>
                    <p className="card-title">
                      Assigned To : <span>{todo.assignedTo}</span>
                    </p>
                    <p className="card-title ">
                      Due Date : <span>{todo.dueDateAndTime}</span>
                    </p>
                    <p className="card-text text-light font-italic">
                      {todo.comment}
                    </p>
                  </div>
                  <span className="surface"></span>
                  <p className="todo-detail text-justify ">{todo.detail}</p>
                  <Link
                    data-toggle="tooltip"
                    title="Edit TODO"
                    to={`/updateTodo/${todo.teamCode}/${userCode}/${todo.taskIdentifier}`}
                  >
                    <i className="fa fa-edit icons"></i>
                  </Link>

                  <div
                    data-toggle="tooltip"
                    title="Delete TODO"
                    onClick={this.onDeleteClick.bind(
                      this,
                      todo.userCode,
                      todo.taskIdentifier
                    )}
                  >
                    <i className="fa fa-trash icons"></i>
                  </div>
                </div>
              );
            default:
              return (
                <div className="todo-list-content card ml-3 mb-3 border border-secondary">
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
                      Due Date : <span>{todo.dueDateAndTime}</span>
                    </p>
                    <p className="card-text text-light font-italic">
                      {todo.comment}
                    </p>
                  </div>
                  <span className="surface"></span>
                  <p className="todo-detail text-justify ">{todo.detail}</p>
                  <Link
                    data-toggle="tooltip"
                    title="Edit TODO"
                    to={`/updateTodo/${todo.teamCode}/${userCode}/${todo.taskIdentifier}`}
                  >
                    <i className="fa fa-edit icons"></i>
                  </Link>

                  <div
                    data-toggle="tooltip"
                    title="Delete TODO"
                    onClick={this.onDeleteClick.bind(
                      this,
                      todo.userCode,
                      todo.taskIdentifier
                    )}
                  >
                    <i className="fa fa-trash icons"></i>
                  </div>
                </div>
              );
          }
        })()}
      </div>
    );
  }
}
TodoList.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
};
export default connect(null, { deleteTodo })(TodoList);
