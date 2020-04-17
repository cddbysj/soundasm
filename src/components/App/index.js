import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { connect } from "react-redux";

import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import "./App.css";
import BasicLayout from "../Layout";

import { setCurrentUser } from "store/auth/auth.actions";

moment.locale("zh-cn");

function App({ setCurrentUser }) {
  useEffect(() => {
    async function subscribeAuth() {
      const unsubscribeFromAuth = await setCurrentUser();
      return unsubscribeFromAuth;
    }
    subscribeAuth();
  }, [setCurrentUser]);
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <BasicLayout />
      </BrowserRouter>
    </ConfigProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { setCurrentUser })(App);
