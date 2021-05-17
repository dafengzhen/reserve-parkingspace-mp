import { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, Text, View } from "@tarojs/components";
import { AtCard, AtDivider, AtFab, AtToast } from "taro-ui";
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
class List extends Component {
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

  render() {
    return (
      <View>
        <Header title="今日预约列表" />

        <View style={{ height: "550px", margin: "20px 0" }} className="at-row">
          <ScrollView scrollY className="at-col at-col-12">
            <View
              className="at-row at-row__align--baseline"
              style={{ marginBottom: "20px" }}
            >
              <AtDivider>1</AtDivider>
              <View style={{ paddingRight: "10px" }}>
                <AtCard title="时间 2021/5/10 09:00 - 2021/5/10 10:00" isFull>
                  车牌号 xxx
                </AtCard>
              </View>
            </View>

            <View
              className="at-row at-row__align--baseline"
              style={{ marginBottom: "20px" }}
            >
              <AtDivider>2</AtDivider>
              <View style={{ paddingRight: "10px" }}>
                <AtCard title="时间 2021/5/10 09:00 - 2021/5/10 10:00" isFull>
                  车牌号 xxx
                </AtCard>
              </View>
            </View>

            <View
              className="at-row at-row__align--baseline"
              style={{ marginBottom: "20px" }}
            >
              <AtDivider>3</AtDivider>
              <View style={{ paddingRight: "10px" }}>
                <AtCard title="时间 2021/5/10 09:00 - 2021/5/10 10:00" isFull>
                  车牌号 xxx
                </AtCard>
              </View>
            </View>

            <View
              className="at-row at-row__align--baseline"
              style={{ marginBottom: "20px" }}
            >
              <AtDivider>4</AtDivider>
              <View style={{ paddingRight: "10px" }}>
                <AtCard title="时间 2021/5/10 09:00 - 2021/5/10 10:00" isFull>
                  车牌号 xxx
                </AtCard>
              </View>
            </View>

            <View
              className="at-row at-row__align--baseline"
              style={{ marginBottom: "20px" }}
            >
              <AtDivider>5</AtDivider>
              <View style={{ paddingRight: "10px" }}>
                <AtCard title="时间 2021/5/10 09:00 - 2021/5/10 10:00" isFull>
                  车牌号 xxx
                </AtCard>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={{ position: "fixed", right: "16px", bottom: "77px" }}>
          <AtFab size="small">
            <Text>刷新</Text>
          </AtFab>
        </View>

        <Footer current={0} />

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

export default List;
