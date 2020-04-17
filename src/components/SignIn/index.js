// 用户登录
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, message } from "antd";
import { signIn } from "store/auth/auth.actions";
import { HOME_PAGE } from "myConstants/routes";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const SignIn = ({ signIn, currentUser }) => {
  const history = useHistory();

  const onFinish = async ({ email, password }) => {
    try {
      await signIn(email, password);
      message.success("欢迎您");
      history.push(HOME_PAGE);
    } catch (error) {
      message.error("登录失败");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="sign-in"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ marginTop: 200 }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { signIn })(SignIn);
