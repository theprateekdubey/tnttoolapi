import axios from "axios";
import { GET_TEAMS, GET_ERRORS, DELETE_TEAM, GET_TEAM } from "./type";
import { message } from "antd";

export const createTeam = (teamCode, userCode, role, team, history) => async (
  dispatch
) => {
  try {
    await axios.post("http://localhost:8081/api/team/", team);
    const teamName = team.name;
    const openMessage = () => {
      const key = "updatable";
      message.loading({
        content: "  Adding...",
        className: "custom-class",
        top: 100,
        key,
      });
      setTimeout(() => {
        message.success({
          content: "  Team ' " + teamName + " ' added succesfully",
          className: "custom-class",
          top: 100,
          key,
          duration: 2,
        });
      }, 1000);
    };

    if (role === 3) {
      history.push(`/adminDashboard/${teamCode}/${userCode}`);
      if (team.id == null) {
        openMessage();
      }
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const updateTeam = (teamCode, userCode, team, history) => async (
  dispatch
) => {
  try {
    await axios.patch(`http://localhost:8081/api/team/${team.teamCode}`, team);
    const teamName = team.name;
    const updateMessage = () => {
      const key = "updatable";
      message.loading({
        content: "  Updating...",
        className: "custom-class",
        top: 100,
        key,
      });
      setTimeout(() => {
        message.success({
          content: "  Team ' " + teamName + " ' updated succesfully",
          className: "custom-class",
          top: 100,
          key,
          duration: 2,
        });
      }, 1000);
    };
    history.push(`/adminDashboard/${teamCode}/${userCode}/`);
    updateMessage();
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getTeams = (history) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8081/api/team/all`);

  dispatch({
    type: GET_TEAMS,
    payload: res.data,
  });
};

export const deleteTeam = (teamCode) => async (dispatch) => {
  await axios.delete(`http://localhost:8081/api/team/${teamCode}`);
  dispatch({
    type: DELETE_TEAM,
    payload: teamCode,
  });
};
export const getTeam = (team_id, history) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8081/api/team/${team_id}`);

  dispatch({
    type: GET_TEAM,
    payload: res.data,
  });
};
