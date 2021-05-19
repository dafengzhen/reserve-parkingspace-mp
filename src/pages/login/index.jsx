import { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "@tarojs/components";
import { AtButton, AtToast } from "taro-ui";
import Taro from "@tarojs/taro";
import Footer from "../../components/Footer";
import { delTokenData, handleLogin } from "../../actions/login";

@connect(
  ({ login }) => ({
    login,
  }),
  (dispatch) => ({
    delTokenData() {
      dispatch(delTokenData());
    },
    handleLogin() {
      return dispatch(handleLogin());
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
        icon: "check",
      },
    };
  }

  loginSuccessful(text) {
    this.setState(
      {
        toast: {
          isOpened: true,
          status: "",
          text: text,
          icon: "check",
        },
      },
      () => {
        setTimeout(async () => {
          await Taro.redirectTo({
            url: "/pages/index/index",
          });
        }, 1000);
      }
    );
  }

  loginFailure(reason) {
    this.props.delTokenData();
    this.setState({
      toast: {
        isOpened: true,
        status: "",
        text: "登录失败！" + reason,
        icon: "close",
      },
    });
  }

  /**
   * 用户登录授权
   */
  handleClick() {
    const token = Taro.getStorageSync("token");
    if (token) {
      this.loginSuccessful("登录成功");
      return;
    }

    this.props
      .handleLogin(false)
      .then((res) => {
        this.loginSuccessful("欢迎 " + res.data + " 登录");
      })
      .catch((reason) => {
        this.loginFailure(reason.errMsg);
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
            {Taro.canIUse("getUserProfile") ? (
              <AtButton onClick={this.handleClick.bind(this)}>
                授权登录
              </AtButton>
            ) : (
              <Text>请升级微信版本</Text>
            )}
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
