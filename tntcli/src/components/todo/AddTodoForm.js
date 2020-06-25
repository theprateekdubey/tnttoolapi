import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getUsers, getUser } from "./../../actions/userActions";
import { createTodo } from "./../../actions/todoAction";
import Header from "../layout/Header";
import classnames from "classnames";
import BackToDashboardButton from "./../user/BackToDashboardButton";

class AddTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      detail: "",
      assignedTo: "",
      dueDateAndTime: "",
      priority: "",
      status: "",
      comment: "",
      userCode: "",
      role: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { teamCode, userCode } = this.props.match.params;
    this.props.getUsers(teamCode, this.props.history);
    this.props.getUser(teamCode, userCode, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const { role } = nextProps.user;
    this.setState({
      role,
    });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    const { teamCode, userCode } = this.props.match.params;
    event.preventDefault();
    const newTodo = {
      name: this.state.name,
      detail: this.state.detail,
      assignedTo: this.state.assignedTo,
      dueDateAndTime: this.state.dueDateAndTime,
      priority: this.state.priority,
      status: this.state.status,
      comment: this.state.comment,
    };
    window.confirm("Are you sure you want to add this TODO?") &&
      this.props.createTodo(
        teamCode,
        this.state.userCode,
        userCode,
        newTodo,
        this.state.role,
        this.props.history
      );
  }

  render() {
    const { errors } = this.state;
    const { users } = this.props.users;
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
                  Create TODO Form
                </h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="input-group form-group">
                    <input
                      data-toggle="tooltip"
                      title="Enter TODO name here"
                      type="text"
                      className={classnames("form-control ", {
                        "is-invalid": errors.name,
                      })}
                      placeholder="Todo Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      required
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="input-group form-group">
                    <textarea
                      data-toggle="tooltip"
                      title="Write TODO details here"
                      className={classnames("form-control ", {
                        "is-invalid": errors.detail,
                      })}
                      rows="3"
                      placeholder="Detail"
                      name="detail"
                      value={this.state.detail}
                      onChange={this.onChange}
                      required
                    ></textarea>
                    {errors.detail && (
                      <div className="invalid-feedback">{errors.detail}</div>
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
                      <option value="">
                        Select a Team Member to assign the Todo Task
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
                    <select
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
                      title="Enter due date here"
                      type="date"
                      className={classnames("form-control ", {
                        "is-invalid": errors.dueDateAndTime,
                      })}
                      name="dueDateAndTime"
                      value={this.state.dueDateAndTime}
                      onChange={this.onChange}
                      required
                    />
                    {errors.dueDateAndTime && (
                      <div className="invalid-feedback">
                        {errors.dueDateAndTime}
                      </div>
                    )}
                  </div>
                  <div className="input-group form-group">
                    <textarea
                      data-toggle="tooltip"
                      title="Write comments here"
                      className={classnames("form-control ", {
                        "is-invalid": errors.comment,
                      })}
                      rows="3"
                      placeholder="Comment"
                      name="comment"
                      value={this.state.comment}
                      onChange={this.onChange}
                      required
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
AddTodoForm.propTypes = {
  user: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  createTodo: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.users,
  user: state.users.user,
  errors: state.errors,
});
export default connect(mapStateToProps, { getUsers, createTodo, getUser })(
  AddTodoForm
);
