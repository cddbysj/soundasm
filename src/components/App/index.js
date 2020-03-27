import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import "./App.css";
import BasicLayout from "../Layout";

moment.locale("zh-cn");

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <BasicLayout />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
