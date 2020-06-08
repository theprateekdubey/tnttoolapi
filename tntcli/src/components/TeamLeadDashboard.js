import React, { Component } from "react";
import Header from "./layout/Header";
import { Link } from "react-router-dom";
import TodoList from "./todo/TodoList";
import AddListButton from "./todo/AddListButton";

export default class TeamLeadDashboard extends Component {
  render() {
    return (
      <div className="teamLeadDash">
        <Header />
        <AddListButton />
        <TodoList />
      </div>
    );
  }
}
