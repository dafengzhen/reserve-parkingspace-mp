import Taro from "@tarojs/taro";
import { ADD_TOKEN_DATA, DEL_TOKEN_DATA } from "../constants/login";

const INITIAL_STATE = {
  tokenData: {},
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TOKEN_DATA:
      try {
        Taro.setStorageSync("token", action.payload.token);
      } catch (e) {}

      return {
        ...state,
        tokenData: action.payload,
      };

    case DEL_TOKEN_DATA:
      try {
        Taro.removeStorageSync("token");
      } catch (e) {}

      return {
        ...state,
        tokenData: {},
      };
    default:
      return state;
  }
}
