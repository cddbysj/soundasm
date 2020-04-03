// 顶部操作导航组件
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import * as ROUTES from "myConstants/routes";
import RjSearchBar from "components/RjSearchBar";

const TopNav = () => {
  return (
    <>
      <Link to={ROUTES.ADD_WORK}>
        <Button icon={<PlusOutlined />}>添加作品</Button>
      </Link>
      <Link to={ROUTES.ADD_AUTHOR}>
        <Button icon={<PlusOutlined />}>添加艺术家</Button>
      </Link>
      <RjSearchBar />
    </>
  );
};

export default TopNav;
