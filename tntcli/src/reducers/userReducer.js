import {
  USER_LOGIN,
  GET_USER,
  GET_USERS,
  DELETE_USER,
  LIST_ALL_USERS,
} from "./../actions/type";
const initialState = {
  user: {},
  users: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case LIST_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.userCode !== action.payload),
      };
    default:
      return state;
  }
}
