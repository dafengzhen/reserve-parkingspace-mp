import { Component } from "react";
import { connect } from "react-redux";
import { View } from "@tarojs/components";
import { AtButton, AtToast } from "taro-ui";
import { add, minus, asyncAdd } from "../../actions/counter";
import Footer from "../../components/Footer";

@connect(
  ({ counter }) => ({
    counter,
  }),
  (dispatch) => ({
    add() {
      dispatch(add());
    },
    dec() {
      dispatch(minus());
    },
    asyncAdd() {
      dispatch(asyncAdd());
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

  handleClick() {}

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
