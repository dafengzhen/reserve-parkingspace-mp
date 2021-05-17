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
import "./index.css";
import Footer from "../../components/Footer";
import { add, minus, asyncAdd } from "../../actions/counter";
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
        icon: "check", // close
      },
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

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
      // <View className="index">
      //   <Button className="add_btn" onClick={this.props.add}>
      //     +
      //   </Button>
      //   <Button className="dec_btn" onClick={this.props.dec}>
      //     -
      //   </Button>
      //   <Button className="dec_btn" onClick={this.props.asyncAdd}>
      //     async
      //   </Button>
      //   <View>
      //     <Text>{this.props.counter.num}</Text>
      //   </View>
      //   <View>
      //     <Text>Hello, World</Text>
      //   </View>
      // </View>
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
