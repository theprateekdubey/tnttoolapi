import axios from "axios";
import {
  GET_TODOTASKS,
  GET_ERRORS,
  GET_TODO,
  DELETE_TODO,
  GET_USERTODOTASKS,
} from "./type";

import { message } from "antd";

export const createTodo = (
  teamCode,
  assignUserId,
  userCode,
  todo,
  userRole,
  history
) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:8081/api/todo/${teamCode}/${assignUserId}/`,
      todo
    );
    const todoName = res.data.name;
    const openMessage = () => {
      const key = "updatable";
      message.loading({
        content: "  Adding...",
        className: "custom-class",
        style: {
          position: "relative",
          marginTop: "-4%",
          marginLeft: "40%",
          width: "max-content",
          marginBottom: "10%",
          padding: "6px",
          color: "green",
          background: "whitesmoke",
        },
        top: 100,
        key,
      });
      setTimeout(() => {
        message.success({
          content: "  TODO ' " + todoName + " ' added succesfully",
          className: "custom-class",
          style: {
            position: "relative",
            marginTop: "-4%",
            marginLeft: "37%",
            width: "max-content",

            marginBottom: "10%",
            padding: "6px",
            color: "green",
            background: "whitesmoke",
          },
          top: 100,
          key,
          duration: 2,
        });
      }, 1000);
    };

    if (userRole === 2) {
      history.push(`/teamLeadDashboard/${teamCode}/${userCode}`);
      openMessage();
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const updateTodo = (
  teamCode,
  assignUserId,
  userCode,
  todo,
  userRole,
  history
) => async (dispatch) => {
  try {
    const res = await axios.patch(
      `http://localhost:8081/api/todo/${teamCode}/${assignUserId}/${todo.taskIdentifier}`,
      todo
    );
    const todoName = res.data.name;
    const updateMessage = () => {
      const key = "updatable";
      message.loading({
        content: "  Updating...",
        className: "custom-class",
        style: {
          position: "relative",
          marginTop: "-4%",
          marginLeft: "40%",
          width: "max-content",
          marginBottom: "10%",
          padding: "6px",
          color: "green",
          background: "whitesmoke",
        },
        top: 100,
        key,
      });
      setTimeout(() => {
        message.success({
          content: "  TODO ' " + todoName + " ' updated succesfully",
          className: "custom-class",
          style: {
            position: "relative",
            marginTop: "-4%",
            marginLeft: "37%",
            width: "max-content",
            marginBottom: "10%",
            padding: "6px",
            color: "green",
            background: "whitesmoke",
          },
          top: 100,
          key,
          duration: 2,
        });
      }, 1000);
    };
    if (userRole === 2) {
      history.push(`/teamLeadDashboard/${teamCode}/${userCode}`);
      updateMessage();
    }
    if (userRole === 1) {
      history.push(`/teamMemberDashboard/${teamCode}/${userCode}`);
      updateMessage();
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getTodos = (team_id, history) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8081/api/todo/${team_id}`);
  console.log("response in react", res);
  dispatch({
    type: GET_TODOTASKS,
    payload: res.data,
  });
};

export const getTodo = (team_id, user_id, todo_id, history) => async (
  dispatch
) => {
  const res = await axios.get(
    `http://localhost:8081/api/todo/${team_id}/${user_id}/${todo_id}`
  );

  console.log("response in react", res);
  dispatch({
    type: GET_TODO,
    payload: res.data,
  });
};

export const getUserTodos = (team_id, user_id, history) => async (dispatch) => {
  const res = await axios.get(
    `http://localhost:8081/api/todo/${team_id}/${user_id}`
  );
  console.log("response in react", res);
  dispatch({
    type: GET_USERTODOTASKS,
    payload: res.data,
  });
};

export const deleteTodo = (userCode, taskId) => async (dispatch) => {
  await axios.delete(`http://localhost:8081/api/todo/${userCode}/${taskId}`);
  dispatch({
    type: DELETE_TODO,
    payload: taskId,
  });
};
