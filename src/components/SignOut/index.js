import React from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";
import { signOut } from "store/auth/auth.actions";

const SignOut = ({ signOut }) => {
  const handleClick = () => {
    signOut();
  };

  return (
    <Button
      size="small"
      type="link"
      onClick={handleClick}
      icon={<LogoutOutlined />}
    >
      登出
    </Button>
  );
};

export default connect(null, { signOut })(SignOut);
