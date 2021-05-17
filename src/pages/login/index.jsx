import { Component } from "react";
import { connect } from "react-redux";
import { View } from "@tarojs/components";

import { add, minus, asyncAdd } from "../../actions/counter";
import Footer from "../../components/Footer";

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
class Login extends Component {
  render() {
    return (
      <View>
        login
        <Footer current={1} />
      </View>
    );
  }
}

export default Login;
