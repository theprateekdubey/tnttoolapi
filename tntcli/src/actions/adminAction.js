import axios from "axios";
import { GET_TEAMS, GET_ERRORS, DELETE_TEAM, GET_TEAM } from "./type";

export const createTeam = (teamCode, userCode, role, team, history) => async (
  dispatch
) => {
  try {
    await axios.post("http://localhost:8081/api/team/", team);
    console.log("----------admin role- --------" + role);
    if (role == 3) {
      console.log("----------admin role- --------" + role);
      history.push(`/adminDashboard/${teamCode}/${userCode}`);
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
