import React, { Component } from "react";
import Header from "./layout/Header";
import TodoList from "./todo/TodoList";
import AddAndListButton from "./todo/AddAndListButton";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getTodos } from "./../actions/todoAction";
import TodoProgessChart from "./todo/TodoProgessChart";
import { Redirect } from "react-router-dom";

class TeamLeadDashboard extends Component {
  constructor(props) {
    const { userCode } = props.match.params;
    super(props);
    const Token = sessionStorage.getItem(userCode + "Token");
    let IsLoggedIn = true;
    console.log(" --token --- " + Token);
    if (Token === null) {
      IsLoggedIn = false;
    }
    this.state = {
      IsLoggedIn,
    };
  }
  componentDidMount() {
    const { teamCode } = this.props.match.params;
    this.props.getTodos(teamCode, this.props.history);
  }
  render() {
    if (this.state.IsLoggedIn === false) {
      return <Redirect to="/login" />;
    }
    const { todos } = this.props.todos;
    const { teamCode, userCode } = this.props.match.params;
    return (
      <div className="teamLeadDash">
        <Header teamCode={teamCode} userCode={userCode} />
        <TodoProgessChart teamCode={teamCode} />
        <AddAndListButton teamCode={teamCode} userCode={userCode} />
        <div className="todo-list ml-5">
          {todos.map((todo) => (
            <TodoList key={todo.id} todo={todo} userCode={userCode} />
          ))}
        </div>
      </div>
    );
  }
}
TeamLeadDashboard.propTypes = {
  getTodos: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  todos: state.todos,
});
export default connect(mapStateToProps, { getTodos })(TeamLeadDashboard);
