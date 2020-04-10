// 布局模板组件
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, BackTop } from "antd";
import {
  GlobalOutlined,
  CustomerServiceOutlined,
  UserOutlined,
  TagsOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import * as ROUTES from "myConstants/routes";
import TopNav from "components/TopNav";
import AddWork from "pages/AddWork";
import Work from "components/Work";
import Home from "pages/Home";
import WorksPage from "pages/Works";
import AuthorsPage from "pages/Authors";
import TagsPage from "pages/Tags";
import AddAuthor from "pages/AddAuthorProfile";

const { Header, Sider, Content } = Layout;

const BasicLayout = () => {
  return (
    <Layout>
      <Sider theme="light" style={{ minHeight: "100vh" }}>
        <div>Soundgasm Logo</div>
        <Menu mode="inline" defaultSelectedKeys={["home"]}>
          <Menu.Item key="home">
            <Link to={ROUTES.HOME_PAGE}>
              <HomeOutlined />
              <span>主页</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="works">
            <Link to={ROUTES.WORKS_PAGE}>
              <CustomerServiceOutlined />
              <span>作品</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="authors">
            <Link to={ROUTES.AUTHORS_PAGE}>
              <UserOutlined />
              <span>艺术家</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="tags">
            <Link to={ROUTES.TAGS_PAGE}>
              <TagsOutlined />
              <span>标签</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="languages">
            <Link to={ROUTES.LANGUAGE_PAGE}>
              <GlobalOutlined />
              <span>语言</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "white" }}>
          <TopNav />
        </Header>
        <Content style={{ padding: 16, background: "white" }}>
          <Switch>
            <Route path={ROUTES.HOME_PAGE} exact>
              <Home />
            </Route>
            <Route path={ROUTES.ADD_WORK}>
              <AddWork />
            </Route>
            <Route path={ROUTES.ADD_AUTHOR}>
              <AddAuthor />
            </Route>
            <Route path={ROUTES.WORKS_PAGE}>
              <WorksPage />
            </Route>
            <Route path={ROUTES.AUTHORS_PAGE}>
              <AuthorsPage />
            </Route>
            <Route path={ROUTES.TAGS_PAGE}>
              <TagsPage />
            </Route>
            <Route path={ROUTES.WORK_PAGE}>
              <Work />
            </Route>
          </Switch>
        </Content>
      </Layout>
      <BackTop />
    </Layout>
  );
};

export default BasicLayout;
