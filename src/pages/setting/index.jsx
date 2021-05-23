import { Component } from "react";
import { connect } from "react-redux";
import { OpenData, View } from "@tarojs/components";
import { AtList, AtListItem, AtToast } from "taro-ui";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { delTokenData } from "../../actions/login";

@connect(
  ({ login }) => ({
    login,
  }),
  (dispatch) => ({
    delTokenData() {
      dispatch(delTokenData());
    },
  })
)
class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      status: "",
      text: "",
      icon: "check",
    };
  }

  handleLogoutClick() {
    this.props.delTokenData();
    this.myToast("check", "退出登录成功");
  }

  myToast = (icon, text) => {
    this.setState(
      {
        isOpened: true,
        status: "",
        text: text,
        icon: icon,
      },
      () => {
        setTimeout(() => {
          this.setState({
            isOpened: false,
          });
        }, 1200);
      }
    );
  };

  render() {
    return (
      <View>
        <Header title="设置" />

        <View
          style={{ marginTop: "20px" }}
          className="at-row at-row__justify--center at-row__align--center"
        >
          <View className="at-col-2 at-col--auto">
            <OpenData type="userAvatarUrl" />
          </View>
          <View style={{ marginLeft: "20px" }} className="at-col-2">
            <OpenData type="userNickName" defaultText="微信用户" />
          </View>
        </View>

        <View>
          <AtList hasBorder={false}>
            <AtListItem title="退出登录" onClick={this.handleLogoutClick} />
          </AtList>
        </View>

        <Footer current={3} />

        <AtToast
          isOpened={this.state.isOpened}
          status={this.state.status}
          text={this.state.text}
          icon={this.state.icon}
        />
      </View>
    );
  }
}

export default Setting;
