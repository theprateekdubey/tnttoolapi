import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import classnames from "classnames";
import BackToDashboardButton from "./../user/BackToDashboardButton";
import { getTodo, updateTodo } from "./../../actions/todoAction";
import { getUser } from "./../../actions/userActions";
import Header from "../layout/Header";

class UpdateTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      detail: "",
      assignedTo: "",
      dueDateAndTime: "",
      priority: "",
      status: "",
      comment: "",
      userCode: "",
      teamCode: "",
      taskIdentifier: "",
      role: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    const { teamCode, userCode } = this.props.match.params;
    event.preventDefault();
    const updateTodo = {
      id: this.state.id,
      name: this.state.name,
      detail: this.state.detail,
      assignedTo: this.state.assignedTo,
      dueDateAndTime: this.state.dueDateAndTime,
      priority: this.state.priority,
      status: this.state.status,
      comment: this.state.comment,
      userCode: this.state.userCode,
      teamCode: this.state.teamCode,
      taskIdentifier: this.state.taskIdentifier,
    };
    window.confirm("Are you sure you want to update this TODO?") &&
      this.props.updateTodo(
        teamCode,
        this.state.userCode,
        userCode,
        updateTodo,
        this.state.role,
        this.props.history
      );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      id,
      name,
      detail,
      assignedTo,
      dueDateAndTime,
      priority,
      status,
      comment,
      userCode,
      teamCode,
      taskIdentifier,
    } = nextProps.todo;
    this.setState({
      id,
      name,
      detail,
      assignedTo,
      dueDateAndTime,
      priority,
      status,
      comment,
      userCode,
      teamCode,
      taskIdentifier,
    });
    const { role } = nextProps.user;
    this.setState({
      role,
    });
  }
  componentDidMount() {
    const { teamCode, userCode, taskIdentifier } = this.props.match.params;
    this.props.getTodo(teamCode, userCode, taskIdentifier, this.props.history);
    this.props.getUser(teamCode, userCode, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { teamCode, userCode } = this.props.match.params;

    return (
      <div className="add-todo">
        <Header teamCode={teamCode} userCode={userCode} />
        <BackToDashboardButton teamCode={teamCode} userCode={userCode} />
        <div className="add-todo-form container">
          <div className="d-flex justify-content-center h-100">
            <div className="card">
              <div className="card-body">
                <h5 className="display-6 text-center text-light">
                  Update TODO Form
                </h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="input-group form-group">
                    <input
                      data-toggle="tooltip"
                      title="Update TODO name here"
                      type="text"
                      className={classnames("form-control ", {
                        "is-invalid": errors.name,
                      })}
                      placeholder="Todo Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="input-group form-group">
                    <textarea
                      data-toggle="tooltip"
                      title="Update TODO details here"
                      className={classnames("form-control ", {
                        "is-invalid": errors.detail,
                      })}
                      rows="3"
                      placeholder="Detail"
                      name="detail"
                      value={this.state.detail}
                      onChange={this.onChange}
                    ></textarea>
                    {errors.detail && (
                      <div className="invalid-feedback">{errors.detail}</div>
                    )}
                  </div>
                  <div className="input-group form-group">
                    <input
                      type="name"
                      className="form-control"
                      name="assignedTo"
                      value={this.state.assignedTo}
                    />
                  </div>
                  <div className="input-group form-group">
                    <select
                      data-toggle="tooltip"
                      title="Update TODO priority here"
                      className="form-control"
                      name="priority"
                      value={this.state.priority}
                      onChange={this.onChange}
                    >
                      <option value={0}>Select Priority</option>
                      <option value={1}>High</option>
                      <option value={2}>Medium</option>
                      <option value={3}>Low</option>
                    </select>
                  </div>
                  <div className="input-group form-group">
                    <select
                      data-toggle="tooltip"
                      title="Update TODO status here"
                      className="form-control"
                      name="status"
                      value={this.state.status}
                      onChange={this.onChange}
                    >
                      <option>Select Status</option>
                      <option value="TODO">TODO</option>
                      <option value="In-Progress">In-Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className="input-group form-group">
                    <input
                      data-toggle="tooltip"
                      title="Update due date here"
                      type="date"
                      className="form-control"
                      name="dueDateAndTime"
                      value={this.state.dueDateAndTime}
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div className="input-group form-group">
                    <textarea
                      data-toggle="tooltip"
                      title="Update comments here"
                      className={classnames("form-control ", {
                        "is-invalid": errors.comment,
                      })}
                      rows="3"
                      placeholder="Comment"
                      name="comment"
                      value={this.state.comment}
                      onChange={this.onChange}
                    ></textarea>
                    {errors.comment && (
                      <div className="invalid-feedback">{errors.comment}</div>
                    )}
                  </div>

                  <input type="submit" className="btn float-right login_btn" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
UpdateTodoForm.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getTodo: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.users.user,
  errors: state.errors,
  todo: state.todos.todo,
});
export default connect(mapStateToProps, {
  getUser,
  updateTodo,
  getTodo,
})(UpdateTodoForm);
