import React, { Component } from "react";
import Header from "./layout/Header";
import { Link } from "react-router-dom";
import TodoList from "./todo/TodoList";
import AddandListButton from "./todo/AddandListButton";

export default class TeamLeadDashboard extends Component {
  render() {
    return (
      <div className="teamLeadDash">
        <Header />
        <AddandListButton />
        <TodoList />
      </div>
    );
  }
}
