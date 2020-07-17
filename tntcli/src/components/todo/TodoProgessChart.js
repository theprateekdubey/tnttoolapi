import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import { getTodos } from "./../../actions/todoAction";

var totalCount = 0;
var todoCounter = 0;
var inProgressCounter = 0;
var completedCounter = 0;
class TodoProgessChart extends Component {
  componentDidMount() {
    const { teamCode } = this.props;
    this.props.getTodos(teamCode, this.props.history);
  }
  componentWillUnmount() {
    todoCounter = 0;
    totalCount = 0;
    inProgressCounter = 0;
    completedCounter = 0;
  }
  render() {
    const { todos } = this.props.todos;
    return (
      <div>
        <div>
          {todos.map((todo) =>
            (() => {
              totalCount++;
              switch (todo.status) {
                case "Completed":
                  completedCounter++;
                  return;
                case "TODO":
                  todoCounter++;
                  return;
                case "In-Progress":
                  inProgressCounter++;
                  return;
                default:
                  return;
              }
            })()
          )}
        </div>
        <div className="todo-progress-bar">
          <ProgressBar>
            <ProgressBar
              animated
              variant="success"
              now={(completedCounter / totalCount) * 100}
              key={1}
              data-toggle="tooltip"
              title={`Completed ${(
                (completedCounter / totalCount) *
                100
              ).toFixed(2)}%`}
              label={`${((completedCounter / totalCount) * 100).toFixed(2)}%`}
            />
            <ProgressBar
              animated
              variant="warning"
              now={(inProgressCounter / totalCount) * 100}
              key={2}
              data-toggle="tooltip"
              title={`In-Progress ${(
                (inProgressCounter / totalCount) *
                100
              ).toFixed(2)}%`}
              label={`${((inProgressCounter / totalCount) * 100).toFixed(2)}%`}
            />
            <ProgressBar
              animated
              variant="danger"
              now={(todoCounter / totalCount) * 100}
              key={3}
              data-toggle="tooltip"
              title={`Todo ${((todoCounter / totalCount) * 100).toFixed(2)}%`}
              label={`${((todoCounter / totalCount) * 100).toFixed(2)}%`}
            />
          </ProgressBar>
        </div>
      </div>
    );
  }
}
TodoProgessChart.propTypes = {
  getTodos: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  todos: state.todos,
});
export default connect(mapStateToProps, { getTodos })(TodoProgessChart);
