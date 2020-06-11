import React, { Component } from "react";
import Header from "./layout/Header";
import TodoList from "./todo/TodoList";
import AddAndListButton from "./todo/AddAndListButton";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getTodos } from "./../actions/todoAction";

class TeamLeadDashboard extends Component {
  componentDidMount() {
    const { teamCode, userCode } = this.props.match.params;
    this.props.getTodos(teamCode, this.props.history);
  }
  render() {
    const { todos } = this.props.todos;
    const { teamCode, userCode } = this.props.match.params;
    return (
      <div className="teamLeadDash">
        <Header teamCode={teamCode} userCode={userCode} />
        <AddAndListButton teamCode={teamCode} userCode={userCode} />
        <div className="todo-list ml-5 mt-5">
          {todos.map((todo) => (
            <TodoList key={todo.id} todo={todo} userCode={userCode} />
          ))}
        </div>
      </div>
    );
  }
}
TeamLeadDashboard.propTypes = {
  todo: PropTypes.object.isRequired,
  getTodos: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  todos: state.todos,
});
export default connect(mapStateToProps, { getTodos })(TeamLeadDashboard);
