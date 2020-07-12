import axios from "axios";
import {
  GET_ERRORS,
  USER_LOGIN,
  GET_USER,
  GET_USERS,
  DELETE_USER,
  LIST_ALL_USERS,
} from "./type";
import { message } from "antd";

export const login = (user, history) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:8081/api/user/login", user);
    const loggedInName = res.data.name;
    const loginMessage = () => {
      const key = "updatable";
      message.loading({
        content: "  Login...",
        className: "custom-class",
        style: {
          position: "relative",
          margin: "-4% 0 10% 43%",
          width: "max-content",
          padding: "6px",
          color: "#00ff66",
          background: "#323131b3",
          borderRadius: "15px",
          padding: "15px",
          border: "solid gray 1px",
        },
        top: 100,
        key,
      });
      setTimeout(() => {
        message.success({
          content: "  Welcome, " + loggedInName,
          className: "custom-class",
          style: {
            position: "relative",
            margin: "-4% 0 10% 40%",
            width: "max-content",
            padding: "6px",
            color: "#00ff66",
            background: "#323131b3",
            borderRadius: "15px",
            padding: "15px",
            border: "solid gray 1px",
          },
          top: 100,
          key,
          duration: 3,
        });
      }, 1000);
    };
    if (res.data.role === 3) {
      history.push(`/adminDashboard/${res.data.teamCode}/${res.data.userCode}`);
      loginMessage();
    }
    if (res.data.role === 2) {
      history.push(
        `/teamLeadDashboard/${res.data.teamCode}/${res.data.userCode}/`
      );
      loginMessage();
    }
    if (res.data.role === 1) {
      history.push(
        `/teamMemberDashboard/${res.data.teamCode}/${res.data.userCode}`
      );
      loginMessage();
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
    const userInTeam = user.name;
    const openMessage = () => {
      const key = "updatable";
      message.loading({
        content: "  Adding...",
        className: "custom-class",
        style: {
          position: "relative",
          margin: "-4% 0 10% 43%",
          width: "max-content",
          padding: "6px",
          color: "#00ff66",
          background: "#323131b3",
          borderRadius: "15px",
          padding: "15px",
          border: "solid gray 1px",
        },
        top: 100,
        key,
      });
      setTimeout(() => {
        message.success({
          content: "  Member ' " + userInTeam + " ' added succesfully",
          className: "custom-class",
          style: {
            position: "relative",
            margin: "-4% 0 10% 37%",
            width: "max-content",
            padding: "6px",
            color: "#00ff66",
            background: "#323131b3",
            borderRadius: "15px",
            padding: "15px",
            border: "solid gray 1px",
          },
          top: 100,
          key,
          duration: 2,
        });
      }, 1000);
    };

    history.push(`/teamMember/${teamCode}/${userCode}`);
    openMessage();
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

export const updateUser = (teamCode, userCode, user, history) => async (
  dispatch
) => {
  try {
    const res = await axios.patch(
      `http://localhost:8081/api/user/${teamCode}/${user.userCode}`,
      user
    );
    const userInTeam = user.name;
    const updateMessage = () => {
      const key = "updatable";
      message.loading({
        content: "  Updating...",
        className: "custom-class",
        style: {
          position: "relative",
          margin: "-4% 0 10% 43%",
          width: "max-content",
          padding: "6px",
          color: "#00ff66",
          background: "#323131b3",
          borderRadius: "15px",
          padding: "15px",
          border: "solid gray 1px",
        },
        top: 100,
        key,
      });
      setTimeout(() => {
        message.success({
          content: "  Member ' " + userInTeam + " ' updated succesfully",
          className: "custom-class",
          style: {
            position: "relative",
            margin: "-4% 0 10% 37%",
            width: "max-content",
            padding: "6px",
            color: "#00ff66",
            background: "#323131b3",
            borderRadius: "15px",
            padding: "15px",
            border: "solid gray 1px",
          },
          top: 100,
          key,
          duration: 2,
        });
      }, 1000);
    };
    history.push(`/teamMember/${teamCode}/${userCode}`);
    updateMessage();
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
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
export const updateUserCredential = (
  teamCode,
  userCode,
  user,
  history
) => async (dispatch) => {
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
          margin: "-4% 0 10% 43%",
          width: "max-content",
          padding: "6px",
          color: "#00ff66",
          background: "#323131b3",
          borderRadius: "15px",
          padding: "15px",
          border: "solid gray 1px",
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
            margin: "-4% 0 10% 37%",
            width: "max-content",
            padding: "6px",
            color: "#00ff66",
            background: "#323131b3",
            borderRadius: "15px",
            padding: "15px",
            border: "solid gray 1px",
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
    const userInTeam = user.name;
    const openMessage = () => {
      const key = "updatable";
      message.loading({
        content: "  Adding...",
        className: "custom-class",
        style: {
          position: "relative",
          margin: "-4% 0 10% 43%",
          width: "max-content",
          padding: "6px",
          color: "#00ff66",
          background: "#323131b3",
          borderRadius: "15px",
          padding: "15px",
          border: "solid gray 1px",
        },
        top: 100,
        key,
      });
      setTimeout(() => {
        message.success({
          content: "  Member ' " + userInTeam + " ' added succesfully",
          className: "custom-class",
          style: {
            position: "relative",
            margin: "-4% 0 10% 37%",
            width: "max-content",
            padding: "6px",
            color: "#00ff66",
            background: "#323131b3",
            borderRadius: "15px",
            padding: "15px",
            border: "solid gray 1px",
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
    const userInTeam = user.name;
    const updateMessage = () => {
      const key = "updatable";
      message.loading({
        content: "  Updating...",
        className: "custom-class",
        style: {
          position: "relative",
          margin: "-4% 0 10% 43%",
          width: "max-content",
          padding: "6px",
          color: "#00ff66",
          background: "#323131b3",
          borderRadius: "15px",
          padding: "15px",
          border: "solid gray 1px",
        },
        top: 100,
        key,
      });
      setTimeout(() => {
        message.success({
          content: "  Member ' " + userInTeam + " ' updated succesfully",
          className: "custom-class",
          style: {
            position: "relative",
            margin: "-4% 0 10% 37%",
            width: "max-content",
            padding: "6px",
            color: "#00ff66",
            background: "#323131b3",
            borderRadius: "15px",
            padding: "15px",
            border: "solid gray 1px",
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
