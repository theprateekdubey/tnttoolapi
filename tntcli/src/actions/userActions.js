import axios from "axios";
import { GET_ERRORS, USER_LOGIN } from "./type";
export const login = (user, history) => async (dispatch) => {
  try {
    console.log("==>>", user);
    const res = await axios.post("http://localhost:8081/api/user/login", user);
    console.log("response in react", res);
    if (res.data.role === 2) {
      history.push("/teamLeadDashboard");
    }
    if (res.data.role === 1) {
      history.push("/teamMemberDashboard");
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
