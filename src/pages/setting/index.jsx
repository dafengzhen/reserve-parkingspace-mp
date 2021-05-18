import { Component } from "react";
import { connect } from "react-redux";
import { View } from "@tarojs/components";
import { AtList, AtListItem, AtToast } from "taro-ui";
import { add, minus, asyncAdd } from "../../actions/counter";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

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
class Setting extends Component {
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
        <Header title="设置" />

        <View>
          <AtList hasBorder={false}>
            <AtListItem title="退出登录" onClick={this.handleClick} />
          </AtList>
        </View>

        <Footer current={3} />

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

export default Setting;
