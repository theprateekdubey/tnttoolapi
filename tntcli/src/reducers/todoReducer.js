import { GET_TODOTASKS } from "./../actions/type";

const initialState = {
  todos: [],
  todo: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TODOTASKS:
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
}
