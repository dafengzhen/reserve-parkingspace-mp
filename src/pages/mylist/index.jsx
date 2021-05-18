import { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, View } from "@tarojs/components";
import { AtButton, AtCard, AtDivider, AtToast } from "taro-ui";
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
class MyList extends Component {
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
        <Header title="我的预约" />

        <View style={{ height: "550px", margin: "20px 0" }} className="at-row">
          <ScrollView scrollY className="at-col at-col-12">
            <View
              className="at-row at-row__align--baseline"
              style={{ marginBottom: "20px" }}
            >
              <AtDivider>1</AtDivider>
              <View style={{ paddingRight: "10px" }}>
                <AtCard title="时间 2021/5/10 09:00 - 2021/5/10 10:00" isFull>
                  <View className="at-row at-row__justify--between at-row__align--center">
                    <View className="">车牌号 xxx</View>
                    <View className="">
                      <AtButton full size="small" onClick={this.handleCancel}>
                        取消预约
                      </AtButton>
                    </View>
                  </View>
                </AtCard>
              </View>
            </View>
          </ScrollView>
        </View>

        <Footer current={2} />

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

export default MyList;
