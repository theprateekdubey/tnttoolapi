import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import { Provider } from "react-redux";
import store from "./store";
import LoginForm from "./components/layout/login/forms/LoginForm";
import TeamLeadDashboard from "./components/TeamLeadDashboard";
import RegistrationForm from "./components/layout/login/forms/RegistrationForm";
import TeamMemberDashboard from "./components/TeamMemberDashboard";
import ListTeamMember from "./components/user/ListTeamMember";
import AddTodoForm from "./components/todo/AddTodoForm";
import UpdateTodoForm from "./components/todo/UpdateTodoForm";
import AddTeamMember from "./components/user/AddTeamMember";
import UpdateTeamMember from "./components/user/UpdateTeamMember";
import UpdateUserTodoForm from "./components/todo/UpdateUserTodoForm";
import ListPeers from "./components/user/ListPeers";
import CompletedTodo from "./components/todo/CompletedTodo";
import UpdateUserCredentials from "./components/user/UpdateUserCredentials";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/registrationForm" component={RegistrationForm} />
        <Route
          exact
          path="/teamLeadDashboard/:teamCode/:userCode"
          component={TeamLeadDashboard}
        />
        <Route
          exact
          path="/teamMemberDashboard/:teamCode/:userCode"
          component={TeamMemberDashboard}
        />
        <Route
          exact
          path="/teamMember/:teamCode/:userCode"
          component={ListTeamMember}
        />
        <Route
          exact
          path="/addTodo/:teamCode/:userCode"
          component={AddTodoForm}
        />
        <Route
          exact
          path="/updateTodo/:teamCode/:userCode/:taskIdentifier"
          component={UpdateTodoForm}
        />
        <Route
          exact
          path="/addTeamMember/:teamCode/:userCode"
          component={AddTeamMember}
        />
        <Route
          exact
          path="/updateTeamMember/:teamCode/:userCode/:userId"
          component={UpdateTeamMember}
        />
        <Route
          exact
          path="/updateUserTodo/:teamCode/:userCode/:taskIdentifier"
          component={UpdateUserTodoForm}
        />
        <Route
          exact
          path="/listPeers/:teamCode/:userCode"
          component={ListPeers}
        />
        <Route
          exact
          path="/completedTodo/:teamCode/:userCode"
          component={CompletedTodo}
        />
        <Route
          exact
          path="/updateUserCredentials/:teamCode/:userCode"
          component={UpdateUserCredentials}
        />
      </Router>
    </Provider>
  );
}

export default App;
