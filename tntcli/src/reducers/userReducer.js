import { USER_LOGIN, GET_USER, GET_USERS } from "./../actions/type";
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
    default:
      return state;
  }
}
