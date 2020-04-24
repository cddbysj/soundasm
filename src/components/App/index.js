import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { connect } from "react-redux";
import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import "./App.css";
import BasicLayout from "../Layout";
import { fetchWorks } from "store/works/works.actions";
import { setCurrentUser } from "store/auth/auth.actions";
import { fetchTags } from "store/tags/tags.actions";
import { fetchAuthors } from "store/authors/authors.actions";
import { fetchAuthorProfiles } from "store/authorProfile/authorProfile.acitons";

moment.locale("zh-cn");

function App({
  setCurrentUser,
  fetchWorks,
  fetchAuthors,
  fetchTags,
  fetchAuthorProfiles,
}) {
  useEffect(() => {
    async function subscribeAuth() {
      const unsubscribeFromAuth = await setCurrentUser();
      return unsubscribeFromAuth;
    }
    subscribeAuth();
  }, [setCurrentUser]);

  useEffect(() => {
    fetchWorks();
  }, [fetchWorks]);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  useEffect(() => {
    fetchAuthorProfiles();
  }, [fetchAuthorProfiles]);

  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter basename="/soundasm">
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

export default connect(mapStateToProps, {
  setCurrentUser,
  fetchWorks,
  fetchAuthors,
  fetchTags,
  fetchAuthorProfiles,
})(App);
