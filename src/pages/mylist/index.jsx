import { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, View } from "@tarojs/components";
import { AtButton, AtCard, AtDivider, AtToast } from "taro-ui";
import dayjs from "dayjs";
import Taro from "@tarojs/taro";
import { add, minus, asyncAdd } from "../../actions/counter";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { api_cancel, api_myParkingList } from "../../api";

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
      list: [],

      isOpened: false,
      status: "",
      text: "",
      icon: "check",
    };
  }

  componentDidMount() {
    this.myParkingSpaceReservationList();
  }

  getToken() {
    const token = Taro.getStorageSync("token");
    if (!token) {
      Taro.redirectTo({
        url: "/pages/login/index",
      }).catch((reason) => {
        this.myToast("close", reason.errMsg);
      });
      return;
    }
    return token;
  }

  myParkingSpaceReservationList(flag = false) {
    const token = this.getToken();
    if (!token) {
      this.myToast("close", "获取我的预约列表失败");
      return;
    }

    Taro.request({
      url: `${api_myParkingList}`,
      header: {
        Authorization: token,
      },
    })
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
  }

  handleCancel(id) {
    const token = this.getToken();
    if (!token) {
      this.myToast("close", "取消预约失败");
      return;
    }

    Taro.request({
      url: `${api_cancel}?id=${id}`,
      header: {
        Authorization: token,
      },
    })
      .then((response) => {
        console.log(response);
        this.myParkingSpaceReservationList(false);
        this.myToast("check", "取消预约完成");
      })
      .catch((reason) => {
        console.log(reason);
        this.myToast("close", reason.errMsg);
      });
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
        <Header title="我的预约" />

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
                        <View className="at-row at-row__justify--between at-row__align--center">
                          <View className="">{obj.licensePlate}</View>
                          <View className="">
                            <AtButton
                              full
                              size="small"
                              onClick={this.handleCancel.bind(this, item.id)}
                            >
                              取消预约
                            </AtButton>
                          </View>
                        </View>
                      </AtCard>
                    </View>
                  </View>
                );
              });
            })}
          </ScrollView>
        </View>

        <Footer current={2} />

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

export default MyList;
