import axios from "axios";
import { GET_TEAMS, GET_ERRORS, DELETE_TEAM, GET_TEAM } from "./type";
import { message, Button, Space } from "antd";

export const createTeam = (teamCode, userCode, role, team, history) => async (
  dispatch
) => {
  try {
    await axios.post("http://localhost:8081/api/team/", team);
    const openMessage = () => {
      const key = "updatable";
      message.loading({
        content: "  Adding...",
        className: "custom-class",
        style: {
          position: "relative",
          marginTop: "-4%",
          marginLeft: "43%",
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
          content: "  Team added succesfully",
          className: "custom-class",
          style: {
            position: "relative",
            marginTop: "-4%",
            marginLeft: "43%",
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
          content: "  Team updated succesfully",
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
          duration: 2,
        });
      }, 1000);
    };
    if (role == 3) {
      history.push(`/adminDashboard/${teamCode}/${userCode}`);
      if (team.id == null) {
        openMessage();
      } else {
        updateMessage();
      }
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getTeams = (history) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8081/api/team/all`);
  console.log("response in react", res);
  dispatch({
    type: GET_TEAMS,
    payload: res.data,
  });
};

export const deleteTeam = (teamCode) => async (dispatch) => {
  console.log("team Code - " + teamCode);
  await axios.delete(`http://localhost:8081/api/team/${teamCode}`);
  dispatch({
    type: DELETE_TEAM,
    payload: teamCode,
  });
};
export const getTeam = (team_id, history) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8081/api/team/${team_id}`);

  console.log("response in react", res);
  dispatch({
    type: GET_TEAM,
    payload: res.data,
  });
};
