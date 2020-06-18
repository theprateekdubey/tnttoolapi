import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";
import todoReducer from "./todoReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
  errors: errorReducer,
  users: userReducer,
  todos: todoReducer,
  teams: adminReducer,
});
