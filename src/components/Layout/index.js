import React from "react";
import { Switch, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  GlobalOutlined,
  CustomerServiceOutlined,
  UserOutlined,
  TagsOutlined
} from "@ant-design/icons";
import TodoList from "../TodoList";

const { Header, Footer, Sider, Content } = Layout;

const BasicLayout = () => {
  return (
    <Layout>
      <Sider theme="light" style={{ minHeight: "100vh" }}>
        <div>Soundgasm Logo</div>
        <Menu mode="inline" defaultSelectedKeys={["works"]}>
          <Menu.Item key="works">
            <CustomerServiceOutlined />
            <span>作品</span>
          </Menu.Item>
          <Menu.Item key="authors">
            <UserOutlined />
            <span>艺术家</span>
          </Menu.Item>
          <Menu.Item key="tags">
            <TagsOutlined />
            <span>标签</span>
          </Menu.Item>
          <Menu.Item key="languages">
            <GlobalOutlined />
            <span>语言</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "white" }}>this is header</Header>
        <Content>
          <Switch>
            <Route path="/">
              <TodoList />
            </Route>
          </Switch>
        </Content>
        <Footer>this is footer</Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
