// 用户登录
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { signIn } from "store/auth/auth.actions";
import { HOME_PAGE } from "myConstants/routes";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const SignIn = ({ signIn, auth }) => {
  const history = useHistory();

  const onFinish = async ({ email, password }) => {
    try {
      await signIn(email, password);
      message.success("欢迎您");
      history.push(HOME_PAGE);
    } catch (error) {
      message.error("登录失败", error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("登录失败", errorInfo);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form
        name="sign-in"
        size="large"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: 400 }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={!auth} block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { signIn })(SignIn);
