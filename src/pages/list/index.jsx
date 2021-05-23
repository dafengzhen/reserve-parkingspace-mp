import { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, Text, View } from "@tarojs/components";
import { AtCard, AtDivider, AtFab, AtToast } from "taro-ui";
import dayjs from "dayjs";
import Taro from "@tarojs/taro";
import { add, minus, asyncAdd } from "../../actions/counter";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { api_parkingList } from "../../api";

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
      list: [],

      isOpened: false,
      status: "",
      text: "",
      icon: "check",
    };
  }

  componentDidMount() {
    this.onRefresh(false);
  }

  onRefresh = (flag = true) => {
    Taro.request({ url: `${api_parkingList}` })
      .then((response) => {
        console.log(response);

        this.setState({
          list: response.data,
        });

        if (flag) {
          this.myToast("check", "刷新完成");
        }
      })
      .catch((reason) => {
        console.log(reason);
        this.myToast("close", reason.errMsg);
      });
  };

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
        <Header title="今日预约列表" />

        <View style={{ height: "550px", margin: "20px 0" }} className="at-row">
          <ScrollView scrollY className="at-col at-col-12">
            {this.state.list.map((obj) => {
              return obj.parkingReservationList.map((item, itemIndex) => {
                return (
                  <View
                    className="at-row at-row__align--baseline"
                    style={{ marginBottom: "20px" }}
                  >
                    <AtDivider>{itemIndex + 1}</AtDivider>
                    <View style={{ paddingRight: "10px" }}>
                      <AtCard
                        title={`时间 ${dayjs(item.startTime).format(
                          "YYYY/MM/DD HH:mm"
                        )} - ${dayjs(item.endTime).format("YYYY/MM/DD HH:mm")}`}
                        isFull
                      >
                        {obj.licensePlate}
                      </AtCard>
                    </View>
                  </View>
                );
              });
            })}
          </ScrollView>
        </View>

        <View style={{ position: "fixed", right: "16px", bottom: "77px" }}>
          <AtFab size="small">
            <Text onClick={this.onRefresh}>刷新</Text>
          </AtFab>
        </View>

        <Footer current={0} />

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

export default List;
