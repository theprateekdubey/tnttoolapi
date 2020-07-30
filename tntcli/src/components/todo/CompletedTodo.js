import React, { Component } from "react";
import Header from "./../layout/Header";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import CompletedTodoList from "./CompletedTodoList";
import { getTodos } from "../../actions/todoAction";
import BackToDashboardButton from "./../user/BackToDashboardButton";
import { Redirect } from "react-router-dom";

class CompletedTodo extends Component {
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
      search: "",
      IsLoggedIn,
    };
  }
  componentDidMount() {
    const { teamCode } = this.props.match.params;
    this.props.getTodos(teamCode, this.props.history);
  }
  updateSearch(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    if (this.state.IsLoggedIn === false) {
      return <Redirect to="/login" />;
    }
    const { todos } = this.props.todos;
    let filteredTodos = todos.filter((todo) => {
      return (
        todo.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    const { teamCode, userCode } = this.props.match.params;

    return (
      <div className="teamLeadDash ">
        <Header teamCode={teamCode} userCode={userCode} />
        <BackToDashboardButton teamCode={teamCode} userCode={userCode} />
        <div className="todo-list ml-5 ">
          <div id="completed-todo-search">
            <form action="" autocomplete="on">
              <input
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}
                id="search"
                name="search"
                type="text"
                placeholder="Search..."
              />
              <input id="search_submit" type="button" />
            </form>
          </div>

          {filteredTodos.map((todo) => (
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
