import React, { Component } from "react";
import Header from "./../layout/Header";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import CompletedTodoList from "./CompletedTodoList";
import { getTodos } from "../../actions/todoAction";
import BackToDashboardButton from "./../user/BackToDashboardButton";

class CompletedTodo extends Component {
  componentDidMount() {
    const { teamCode } = this.props.match.params;
    this.props.getTodos(teamCode, this.props.history);
  }
  render() {
    const { todos } = this.props.todos;
    const { teamCode, userCode } = this.props.match.params;

    return (
      <div className="teamLeadDash ">
        <Header teamCode={teamCode} userCode={userCode} />
        <BackToDashboardButton teamCode={teamCode} userCode={userCode} />
        <div className="todo-list ml-5 ">
          {todos.map((todo) => (
            <CompletedTodoList key={todo.id} todo={todo} userCode={userCode} />
          ))}
        </div>
      </div>
    );
  }
}

CompletedTodo.propTypes = {
  getTodos: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  todos: state.todos,
});
export default connect(mapStateToProps, { getTodos })(CompletedTodo);
