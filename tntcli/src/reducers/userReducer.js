import { USER_LOGIN } from "../actions/type";

const initialState = {
  userLoginDetails: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        userLoginDetails: action.payload,
      };
    default:
      return state;
  }
}
