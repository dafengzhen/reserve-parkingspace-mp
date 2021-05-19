import { Component } from "react";
import { connect } from "react-redux";
import { Picker, View } from "@tarojs/components";
import {
  AtButton,
  AtForm,
  AtInput,
  AtList,
  AtListItem,
  AtToast,
} from "taro-ui";
import Taro from "@tarojs/taro";
import "./index.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { delTokenData, handleLogin } from "../../actions/login";

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
      model: {
        licensePlateNum: "",
        cellPhoneNum: "",
        startDateSel: "2021-05-10",
        startTimeSel: "09:00",
        endDateSel: "2021-05-10",
        endTimeSel: "10:00",
      },

      toast: {
        isOpened: false,
        status: "",
        text: "成功预约车位",
        icon: "check",
      },
    };
  }

  componentDidMount() {
    const token = Taro.getStorageSync("token");
    if (!token) {
      console.log(token);

      this.props
        .handleLogin(true)
        .then((res) => {
          this.setState({
            toast: {
              isOpened: true,
              status: "",
              text: res.data ? "欢迎 " + res.data + " 登录" : "欢迎登录",
              icon: "check",
            },
          });
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

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  loginFailure(reason) {
    this.props.delTokenData();
    this.setState(
      {
        toast: {
          isOpened: true,
          status: "",
          text: "登录失败！请重试" + reason,
          icon: "close",
        },
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

  handleClick(value) {
    console.log(value);
  }

  onSubmit(event) {
    console.log(this.state);
  }

  onReset(event) {
    this.setState(
      {
        model: {
          licensePlateNum: "",
          cellPhoneNum: "",
          startDateSel: "2021-05-10",
          startTimeSel: "09:00",
          endDateSel: "2021-05-10",
          endTimeSel: "10:00",
        },
      },
      () => {
        this.setState({
          toast: {
            isOpened: true,
            status: "",
            text: "重置表单内容完成",
            icon: "check",
          },
        });
      }
    );
  }

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
            <AtForm
              onSubmit={this.onSubmit.bind(this)}
              onReset={this.onReset.bind(this)}
            >
              <View style={{ marginBottom: "30px" }}>
                <AtInput
                  name="licensePlateNum"
                  title="车牌号"
                  type="text"
                  placeholder="请输入车牌号"
                  value={this.state.model.licensePlateNum}
                />

                <AtInput
                  name="licensePlateNum"
                  title="手机号"
                  type="number"
                  placeholder="请输入手机号"
                  value={this.state.model.cellPhoneNum}
                />

                <View className="at-row at-row--wrap">
                  <View className="at-col at-col-12">
                    <Picker mode="date" onChange={this.onStartDateChange}>
                      <AtList>
                        <AtListItem
                          title="开始时间"
                          extraText={this.state.model.startDateSel}
                        />
                      </AtList>
                    </Picker>
                  </View>
                  <View className="at-col at-col-12">
                    <Picker mode="time" onChange={this.onStartTimeChange}>
                      <AtList>
                        <AtListItem
                          title=""
                          extraText={this.state.model.startTimeSel}
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
                          extraText={this.state.model.endDateSel}
                        />
                      </AtList>
                    </Picker>
                  </View>
                  <View className="at-col at-col-12">
                    <Picker mode="time" onChange={this.onEndTimeChange}>
                      <AtList>
                        <AtListItem
                          title=""
                          extraText={this.state.model.endTimeSel}
                        />
                      </AtList>
                    </Picker>
                  </View>
                </View>
              </View>

              <View>
                <AtButton
                  customStyle={{ margin: "20px" }}
                  circle
                  formType="submit"
                >
                  提交预约
                </AtButton>
                <AtButton
                  customStyle={{ margin: "20px" }}
                  circle
                  formType="reset"
                >
                  重置表单
                </AtButton>
              </View>
            </AtForm>
          </View>
          <View className="at-col at-col-1" />
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

export default Index;
