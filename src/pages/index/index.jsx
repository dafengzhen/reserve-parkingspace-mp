import { Component } from "react";
import { connect } from "react-redux";
import { Picker, View } from "@tarojs/components";
import { AtButton, AtInput, AtList, AtListItem, AtToast } from "taro-ui";
import Taro from "@tarojs/taro";
import "./index.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { delTokenData, handleLogin } from "../../actions/login";
import { api_parking } from "../../api";

@connect(
  ({ login }) => ({
    login,
  }),
  (dispatch) => ({
    delTokenData() {
      dispatch(delTokenData());
    },
    handleLogin(homeJump) {
      return dispatch(handleLogin(homeJump));
    },
  })
)
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      licensePlateNum: "粤A12345",
      cellPhoneNum: "17733114568",
      startDateSel: "2021-05-10",
      startTimeSel: "09:00",
      endDateSel: "2021-05-10",
      endTimeSel: "10:00",

      isOpened: false,
      status: "",
      text: "成功预约车位",
      icon: "check",
    };
  }

  componentDidMount() {
    const token = Taro.getStorageSync("token");
    if (!token) {
      console.log(token);

      this.props
        .handleLogin(true)
        .then((res) => {
          this.myToast(
            "check",
            res.data ? "欢迎 " + res.data + " 登录" : "欢迎登录"
          );
        })
        .catch((reason) => {
          console.log(reason);
          this.loginFailure(reason.errMsg);
        });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  loginFailure(reason) {
    this.props.delTokenData();
    this.setState(
      {
        isOpened: true,
        status: "",
        text: "登录失败！请重试" + reason,
        icon: "close",
      },
      () => {
        setTimeout(async () => {
          await Taro.redirectTo({
            url: "/pages/login/index",
          });
        }, 1000);
      }
    );
  }

  onSubmit = () => {
    console.log(this.state);

    if (!this.state.licensePlateNum) {
      this.myToast("close", "车牌号不能为空");
      return;
    }

    if (!this.state.cellPhoneNum) {
      this.myToast("close", "手机不能为空");
      return;
    }

    const token = Taro.getStorageSync("token");
    if (!token) {
      Taro.redirectTo({
        url: "/pages/login/index",
      }).catch((reason) => {
        alert(reason);
      });
      return;
    }

    Taro.request({
      url: `${api_parking}`,
      method: "POST",
      header: {
        Authorization: token,
      },
      data: {
        licensePlate: this.state.licensePlateNum,
        phone: this.state.cellPhoneNum,
        startTime: this.state.startDateSel + "T" + this.state.startTimeSel,
        endTime: this.state.endDateSel + "T" + this.state.endTimeSel,
      },
    })
      .then((response) => {
        console.log(response);

        this.myToast("check", response.data);
      })
      .catch((reason) => {
        console.log(reason);
        this.myToast("close", reason.errMsg);
      });
  };

  onReset = () => {
    this.setState(
      {
        licensePlateNum: "",
        cellPhoneNum: "",
        startDateSel: "2021-05-10",
        startTimeSel: "09:00",
        endDateSel: "2021-05-10",
        endTimeSel: "10:00",
      },
      () => {
        this.myToast("check", "重置表单内容完成");
      }
    );
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

  onEndDateChange = (e) => {
    this.setState({
      endDateSel: e.detail.value,
    });
  };

  onEndTimeChange = (e) => {
    this.setState({
      endTimeSel: e.detail.value,
    });
  };

  onStartDateChange = (e) => {
    this.setState({
      startDateSel: e.detail.value,
    });
  };

  onStartTimeChange = (e) => {
    this.setState({
      startTimeSel: e.detail.value,
    });
  };

  onLicensePlateNumChange = (value) => {
    this.setState({
      licensePlateNum: value,
    });
  };

  onCellPhoneNumChange = (value) => {
    this.setState({
      cellPhoneNum: value,
    });
  };

  render() {
    return (
      <View>
        <Header title="预约车位" />

        <View
          style={{ height: "550px" }}
          className="at-row at-row__align--center"
        >
          <View className="at-col at-col-1" />
          <View className="at-col at-col-10">
            <View style={{ marginBottom: "30px" }}>
              <AtInput
                name="licensePlateNum"
                title="车牌号"
                type="text"
                placeholder="请输入车牌号"
                value={this.state.licensePlateNum}
                onChange={this.onLicensePlateNumChange}
              />

              <AtInput
                name="licensePlateNum"
                title="手机号"
                type="number"
                placeholder="请输入手机号"
                value={this.state.cellPhoneNum}
                onChange={this.onCellPhoneNumChange}
              />

              <View className="at-row at-row--wrap">
                <View className="at-col at-col-12">
                  <Picker mode="date" onChange={this.onStartDateChange}>
                    <AtList>
                      <AtListItem
                        title="开始时间"
                        extraText={this.state.startDateSel}
                      />
                    </AtList>
                  </Picker>
                </View>
                <View className="at-col at-col-12">
                  <Picker mode="time" onChange={this.onStartTimeChange}>
                    <AtList>
                      <AtListItem
                        title=""
                        extraText={this.state.startTimeSel}
                      />
                    </AtList>
                  </Picker>
                </View>
              </View>

              <View className="at-row at-row--wrap">
                <View className="at-col at-col-12">
                  <Picker mode="date" onChange={this.onEndDateChange}>
                    <AtList>
                      <AtListItem
                        title="结束时间"
                        extraText={this.state.endDateSel}
                      />
                    </AtList>
                  </Picker>
                </View>
                <View className="at-col at-col-12">
                  <Picker mode="time" onChange={this.onEndTimeChange}>
                    <AtList>
                      <AtListItem title="" extraText={this.state.endTimeSel} />
                    </AtList>
                  </Picker>
                </View>
              </View>
            </View>

            <View>
              <AtButton
                customStyle={{ margin: "20px" }}
                circle
                onClick={this.onSubmit}
              >
                提交预约
              </AtButton>
              <AtButton
                customStyle={{ margin: "20px" }}
                circle
                onClick={this.onReset}
              >
                重置表单
              </AtButton>
            </View>
          </View>
          <View className="at-col at-col-1" />
        </View>

        <Footer current={1} />

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

export default Index;
