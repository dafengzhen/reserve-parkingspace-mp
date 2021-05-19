import { ADD_TOKEN_DATA } from "../constants/login";

const INITIAL_STATE = {
  tokenData: {},
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TOKEN_DATA:
      return {
        ...state,
        tokenData: action.payload,
      };

    default:
      return state;
  }
}
