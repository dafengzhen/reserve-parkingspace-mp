import Taro from "@tarojs/taro";
import { ADD_TOKEN_DATA, DEL_TOKEN_DATA } from "../constants/login";
import { api_getUserInfo, api_login } from "../api";

export const addTokenData = (payload) => {
  return {
    type: ADD_TOKEN_DATA,
    payload,
  };
};

export const delTokenData = () => {
  return {
    type: DEL_TOKEN_DATA,
  };
};

/**
 * 获取用户信息
 * @param token token
 */
const getUserInfo = (token) => {
  return Taro.getUserProfile({ desc: "用于完善用户信息" }).then(
    (userProfile) => {
      console.log(userProfile);
      return Taro.request({
        url: api_getUserInfo,
        method: "POST",
        header: {
          Authorization: token,
        },
        data: userProfile,
      });
    }
  );
};

export function handleLogin(homeJump) {
  return (dispatch) => {
    if (process.env.TARO_ENV !== "weapp") return;

    return Taro.login().then((res) => {
      return Taro.request({ url: `${api_login}?jsCode=${res.code}` }).then(
        (loginResult) => {
          console.log(loginResult);
          loginResult.data.token = "Bearer " + loginResult.data.token;
          dispatch(addTokenData(loginResult.data));

          // 授权获取用户信息（注意需要用户手势才能调用）
          // https://developers.weixin.qq.com/miniprogram/dev/api/open-api/authorize/wx.authorize.html
          if (homeJump) return Promise.resolve({ data: loginResult.data.name });
          return Taro.getSetting().then((getSetting) => {
            if (getSetting.authSetting["scope.userInfo"]) {
              console.log("authSetting = true");
              return getUserInfo(loginResult.data.token);
            }

            console.log("authSetting = false");
            return Taro.authorize({ scope: "scope.userInfo" }).then(
              (authorize) => {
                console.log(authorize);
                return getUserInfo(loginResult.data.token);
              }
            );
          });
        }
      );
    });
  };
}
