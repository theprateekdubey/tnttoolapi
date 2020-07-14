import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./layout/Header";
import { getUserTodos } from "../actions/todoAction";
import TodoListMember from "./todo/TodoListMember";

class TeamMemberDashboard extends Component {
  componentDidMount() {
    const { teamCode, userCode } = this.props.match.params;
    this.props.getUserTodos(teamCode, userCode, this.props.history);
  }
  render() {
    const { todos } = this.props.todos;
    const { teamCode, userCode } = this.props.match.params;
    return (
      <div className="teamMemberDash ">
        <Header teamCode={teamCode} userCode={userCode} />
        <div className="mx-5 d-flex justify-content-end mt-n2">
          <Link
            type="button"
            className="rounded btn btn-warning px-3 ml-3"
            to={`/listPeers/${teamCode}/${userCode}`}
          >
            <i className="fas fa-users"></i> List Members
          </Link>
        </div>
        <div className="todo-list-member ml-5">
          {todos.map((todo) => (
            <TodoListMember key={todo.id} todo={todo} userCode={userCode} />
          ))}
        </div>
      </div>
    );
  }
}
TeamMemberDashboard.propTypes = {
  todo: PropTypes.object.isRequired,
  getUserTodos: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  todos: state.todos,
});
export default connect(mapStateToProps, { getUserTodos })(TeamMemberDashboard);
