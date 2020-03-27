import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  GlobalOutlined,
  CustomerServiceOutlined,
  UserOutlined,
  TagsOutlined
} from "@ant-design/icons";
import * as ROUTES from "myConstants/routes";
import AddWork from "pages/AddWork";
import Work from "components/Work";
import Home from "pages/Home";
import WorksPage from "pages/Works";
import AuthorsPage from "pages/Authors";
import TagsPage from "pages/Tags";
import AddAuthor from "pages/AddAuthor";
import TodoList from "components/TodoList";

const { Header, Footer, Sider, Content } = Layout;

const BasicLayout = () => {
  return (
    <Layout>
      <Sider theme="light" style={{ minHeight: "100vh" }}>
        <div>Soundgasm Logo</div>
        <Menu mode="inline" defaultSelectedKeys={["works"]}>
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
          <Link to={ROUTES.ADD_WORK}>
            <Button icon={<PlusOutlined />}>添加作品</Button>
          </Link>
          <Link to={ROUTES.ADD_AUTHOR}>
            <Button icon={<PlusOutlined />}>添加艺术家</Button>
          </Link>
        </Header>
        <Content style={{ padding: 16, background: "white" }}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/todos" exact>
              <TodoList />
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
            <Route path="/work">
              <Work />
            </Route>
          </Switch>
        </Content>
        <Footer>@Bill Studio</Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
