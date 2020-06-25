import axios from "axios";
import {
  GET_ERRORS,
  USER_LOGIN,
  GET_USER,
  GET_USERS,
  DELETE_USER,
  LIST_ALL_USERS,
} from "./type";
import { message, Button, Space } from "antd";

export const login = (user, history) => async (dispatch) => {
  try {
    console.log("==>>", user);
    const res = await axios.post("http://localhost:8081/api/user/login", user);
    console.log("response in react", res);
    if (res.data.role === 3) {
      history.push(`/adminDashboard/${res.data.teamCode}/${res.data.userCode}`);
    }
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
    const openMessage = () => {
      const key = "updatable";
      message.loading({
        content: "  Adding...",
        className: "custom-class",
        style: {
          position: "relative",
          marginTop: "-4%",
          marginLeft: "40%",
          marginRight: "44.5%",
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
          content: "  Member added succesfully",
          className: "custom-class",
          style: {
            position: "relative",
            marginTop: "-4%",
            marginLeft: "40%",
            marginRight: "44.5%",
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
    const updateMessage = () => {
      const key = "updatable";
      message.loading({
        content: "  Updating...",
        className: "custom-class",
        style: {
          position: "relative",
          marginTop: "-41%",
          marginLeft: "40%",
          marginRight: "43.5%",
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
          content: "  Member updated succesfully",
          className: "custom-class",
          style: {
            position: "relative",
            marginTop: "-41%",
            marginLeft: "40%",
            marginRight: "43.5%",
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
    history.push(`/teamMember/${teamCode}/${userCode}`);
    if (user.id != null) {
      updateMessage();
    } else {
      openMessage();
    }
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

export const getUsersList = (history) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8081/api/user/all`);
  console.log("response in react", res);
  dispatch({
    type: LIST_ALL_USERS,
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
    const updateMessage = () => {
      const key = "updatable";
      message.loading({
        content: "  Updating...",
        className: "custom-class",
        style: {
          position: "relative",
          marginTop: "-4%",
          marginLeft: "42%",
          marginRight: "43.5%",
          padding: "6px",
          color: "green",
          background: "whitesmoke",
        },
        top: 100,
        key,
      });
      setTimeout(() => {
        message.success({
          content: "  Credentials updated succesfully",
          className: "custom-class",
          style: {
            position: "relative",
            marginTop: "-4%",
            marginLeft: "40.5%",
            marginRight: "42.5%",
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
    if (user.role === 3) {
      history.push(`/adminDashboard/${teamCode}/${userCode}/`);
      updateMessage();
    }
    if (user.role === 2) {
      history.push(`/teamLeadDashboard/${teamCode}/${userCode}/`);
      updateMessage();
    }
    if (user.role === 1) {
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

export const createUserViaAdmin = (
  teamId,
  userId,
  user,
  teamCode,
  history
) => async (dispatch) => {
  try {
    await axios.post(`http://localhost:8081/api/user/${teamCode}/`, user);
    console.log("user role team lead -" + user.role);
    const openMessage = () => {
      const key = "updatable";
      message.loading({
        content: "  Adding...",
        className: "custom-class",
        style: {
          position: "relative",
          marginTop: "-4%",
          marginLeft: "40%",
          marginRight: "44.5%",
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
          content: "  Member added succesfully",
          className: "custom-class",
          style: {
            position: "relative",
            marginTop: "-4%",
            marginLeft: "40%",
            marginRight: "44.5%",
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
    if (userId == "") {
    } else {
      history.push(`/listTeamMember/${teamId}/${userId}/${teamCode}`);
      openMessage();
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const updateUserViaAdmin = (
  teamId,
  userId,
  user,
  teamCode,
  history
) => async (dispatch) => {
  try {
    const res = await axios.patch(
      `http://localhost:8081/api/user/${teamCode}/${user.userCode}`,
      user
    );
    const updateMessage = () => {
      const key = "updatable";
      message.loading({
        content: "  Updating...",
        className: "custom-class",
        style: {
          position: "relative",
          marginTop: "-25.5%",
          marginLeft: "40%",
          marginRight: "44%",
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
          content: "  Member updated succesfully",
          className: "custom-class",
          style: {
            position: "relative",
            marginTop: "-25.5%",
            marginLeft: "40%",
            marginRight: "44%",
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
    history.push(`/listTeamMember/${teamId}/${userId}/${teamCode}`);
    updateMessage();
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
