import axios from "axios";
import { GET_TODOTASKS } from "./type";

export const getTodos = (team_id, history) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8081/api/todo/${team_id}`);
  console.log("response in react", res);
  dispatch({
    type: GET_TODOTASKS,
    payload: res.data,
  });
};
