import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";
import todoReducer from "./todoReducer";
export default combineReducers({
  errors: errorReducer,
  users: userReducer,
  todos: todoReducer,
});
