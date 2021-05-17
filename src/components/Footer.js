import { Component } from "react";
import { AtTabBar } from "taro-ui";
import Taro from "@tarojs/taro";

export default class Footer extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      current: this.props.current,
    };
  }

  async handleClick(value) {
    this.setState({
      current: value,
    });

    let url;
    if (value === 0) {
      // 预约列表
      url = "/pages/list/index";
    } else if (value === 1) {
      // 预约申请
      url = "/pages/index/index";
    } else {
      // 我的预约
      url = "/pages/mylist/index";
    }

    await Taro.redirectTo({
      url,
    });
  }

  render() {
    return (
      <>
        <AtTabBar
          fixed
          tabList={[
            { title: "预约列表", iconType: "list" },
            { title: "预约车位", iconType: "add-circle" },
            { title: "我的预约", iconType: "user" },
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
      </>
    );
  }
}
