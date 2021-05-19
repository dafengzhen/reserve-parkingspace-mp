import { Component } from "react";
import { connect } from "react-redux";
import { View } from "@tarojs/components";
import { AtButton, AtToast } from "taro-ui";
import Taro from "@tarojs/taro";
import Footer from "../../components/Footer";
import { api_getUserInfo, api_login } from "../../api";
import { addTokenData } from "../../actions/login";

@connect(
  ({ login }) => ({
    login,
  }),
  (dispatch) => ({
    addTokenData(payload) {
      dispatch(addTokenData(payload));
    },
  })
)
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toast: {
        isOpened: false,
        status: "",
        text: "成功预约车位",
        icon: "check", // close
      },
    };
  }

  handleClick() {
    if (process.env.TARO_ENV !== "weapp") return;

    Taro.login({
      success: (res) => {
        if (res.code) {
          console.log(res.code);

          Taro.request({
            url: `${api_login}?jsCode=${res.code}`,
            success: async (res2) => {
              console.log(res2.data);
              res2.data.token = "Bearer " + res2.data.token;
              this.props.addTokenData(res2.data);

              // 授权
              // https://developers.weixin.qq.com/miniprogram/dev/api/open-api/authorize/wx.authorize.html
              const getSetting = await Taro.getSetting();
              console.log(getSetting);

              if (!getSetting.authSetting["scope.userInfo"]) {
                Taro.authorize({
                  scope: "scope.userInfo",
                  fail: (fail) => {
                    console.log(fail);
                  },
                });
              }

              const userInfo = await this.getUserInfo();
              console.log(userInfo.data);

              this.setState(
                {
                  toast: {
                    isOpened: true,
                    status: "",
                    text: "欢迎 " + userInfo.data + " 登录",
                    icon: "check",
                  },
                },
                () => {
                  setTimeout(() => {
                    Taro.redirectTo({
                      url: "/pages/index/index",
                    });
                  }, 1000);
                }
              );
            },
            fail: (res2) => {
              console.log(res2);
            },
          });
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      },
    });
  }

  /**
   * 获取用户信息
   */
  async getUserInfo() {
    if (!this.props.login.tokenData.token) return;
    const getUserInfo = await Taro.getUserInfo();
    return Taro.request({
      url: api_getUserInfo,
      method: "POST",
      header: {
        Authorization: this.props.login.tokenData.token,
      },
      data: getUserInfo,
    });
  }

  render() {
    return (
      <View>
        <View
          className="at-row at-row__justify--center at-row__align--center"
          style={{ height: "600px" }}
        >
          <View
            className="at-col at-col-12"
            style={{ textAlign: "center", padding: "0 70px" }}
          >
            <AtButton onClick={this.handleClick.bind(this)}>用户登录</AtButton>
          </View>
        </View>

        <Footer current={1} />

        <AtToast
          isOpened={this.state.toast.isOpened}
          status={this.state.toast.status}
          text={this.state.toast.text}
          icon={this.state.toast.icon}
        />
      </View>
    );
  }
}

export default Login;
