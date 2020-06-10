import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import classnames from "classnames";
import BackToDashboardButton from "./../user/BackToDashboardButton";
import { getTodo } from "./../../actions/todoAction";
import { getUsers } from "./../../actions/userActions";
import { createTodo } from "./../../actions/todoAction";
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
      todoIdentifier: "",
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
    };
    this.props.createTodo(
      teamCode,
      this.state.userCode,
      userCode,
      updateTodo,
      this.props.history
    );
  }
  componentWillReceiveProps(nextProps) {
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
      todoIdentifier,
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
      todoIdentifier,
    });
  }
  componentDidMount() {
    const { teamCode, userCode, taskIdentifier } = this.props.match.params;
    this.props.getTodo(teamCode, userCode, taskIdentifier, this.props.history);
    this.props.getUsers(teamCode, this.props.history);
  }
  render() {
    const { errors } = this.state;
    const { users } = this.props.users;
    const { teamCode, userCode } = this.props.match.params;

    return (
      <div className="add-todo">
        <Header />
        <BackToDashboardButton teamCode={teamCode} userCode={userCode} />
        <div className="add-todo-form container">
          <div className="d-flex justify-content-center h-100">
            <div className="card">
              <div className="card-body">
                <h5 className="display-5 text-center text-light">
                  Update TODO Form
                </h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="input-group form-group">
                    <input
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
                      className={classnames("form-control ", {
                        "is-invalid": errors.detail,
                      })}
                      rows="3"
                      placeholder="Detail"
                      name="detail"
                      value={this.state.detail}
                      onChange={this.onChange}
                    ></textarea>
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="input-group form-group">
                    <select
                      className="form-control"
                      name="userCode"
                      value={this.state.userCode}
                      onChange={this.onChange}
                      required
                    >
                      <option value={this.state.userCode}>
                        {this.state.assignedTo}
                      </option>
                      {users.map((user) => (
                        <option value={user.userCode}>{user.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group form-group">
                    <select
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
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Todo status"
                      name="status"
                      value={this.state.status}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="input-group form-group">
                    <input
                      type="date"
                      className="form-control"
                      name="dueDateAndTime"
                      value={this.state.dueDateAndTime}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="input-group form-group">
                    <textarea
                      className={classnames("form-control ", {
                        "is-invalid": errors.comment,
                      })}
                      rows="3"
                      placeholder="Comment"
                      name="comment"
                      value={this.state.comment}
                      onChange={this.onChange}
                    ></textarea>
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
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
  user: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  createTodo: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getTodo: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.users,
  errors: state.errors,
  todo: state.todos.todo,
});
export default connect(mapStateToProps, { getUsers, createTodo, getTodo })(
  UpdateTodoForm
);
