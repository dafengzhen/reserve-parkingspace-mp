import { ADD_TOKEN_DATA } from "../constants/login";

export const addTokenData = (payload) => {
  return {
    type: ADD_TOKEN_DATA,
    payload,
  };
};
