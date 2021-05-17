import { Component } from "react";
import { Text, View } from "@tarojs/components";

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          width: "100%",
          height: "20px",
          padding: "20px 0",
          textAlign: "center",
        }}
      >
        {/*<AtNavBar*/}
        {/*  onClickLeftIcon={this.handleClick}*/}
        {/*  color='#000'*/}
        {/*  title='预约车位'*/}
        {/*  leftIconType='chevron-left'*/}
        {/*  leftText='返回'*/}
        {/*/>*/}
        <Text>{this.props.title}</Text>
      </View>
    );
  }
}
