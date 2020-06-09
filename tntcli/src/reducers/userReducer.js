import { USER_LOGIN, GET_USER } from "./../actions/type";
const initialState = {
  user: {},
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
    default:
      return state;
  }
}
