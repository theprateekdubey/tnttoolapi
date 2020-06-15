import axios from "axios";
import {
  GET_ERRORS,
  USER_LOGIN,
  GET_USER,
  GET_USERS,
  DELETE_USER,
} from "./type";

export const login = (user, history) => async (dispatch) => {
  try {
    console.log("==>>", user);
    const res = await axios.post("http://localhost:8081/api/user/login", user);
    console.log("response in react", res);
    if (res.data.role === 2) {
      history.push(
        `/teamLeadDashboard/${res.data.teamCode}/${res.data.userCode}/`
      );
    }
    if (res.data.role === 1) {
      history.push(
        `/teamMemberDashboard/${res.data.teamCode}/${res.data.userCode}`
      );
    }
    dispatch({
      type: USER_LOGIN,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
export const createUser = (teamCode, userCode, user, history) => async (
  dispatch
) => {
  try {
    const res = await axios.post(
      `http://localhost:8081/api/user/${teamCode}/`,
      user
    );
    history.push(`/teamMember/${teamCode}/${userCode}`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
export const getUser = (team_id, user_id, history) => async (dispatch) => {
  const res = await axios.get(
    `http://localhost:8081/api/user/${team_id}/${user_id}`
  );
  dispatch({
    type: GET_USER,
    payload: res.data,
  });
};

export const getUsers = (team_id, history) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8081/api/user/${team_id}`);
  console.log("response in react", res);
  dispatch({
    type: GET_USERS,
    payload: res.data,
  });
};
export const deleteUser = (teamCode, userCode) => async (dispatch) => {
  await axios.delete(`http://localhost:8081/api/user/${teamCode}/${userCode}`);
  dispatch({
    type: DELETE_USER,
    payload: userCode,
  });
};
export const updateUser = (teamCode, userCode, user, history) => async (
  dispatch
) => {
  try {
    const res = await axios.patch(
      `http://localhost:8081/api/user/${teamCode}/${userCode}`,
      user
    );
    console.log("user role---------" + user.role);
    if (user.role === 2) {
      history.push(`/teamLeadDashboard/${teamCode}/${userCode}/`);
    }
    if (user.role === 1) {
      history.push(`/teamMemberDashboard/${teamCode}/${userCode}`);
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
