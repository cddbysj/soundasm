// 顶部操作导航组件
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as ROUTES from 'myConstants/routes';
import RjSearchBar from 'components/RjSearchBar';

const TopNav = () => {
  return (
    <Space size="middle">
      <Link to={ROUTES.ADD_WORK}>
        <Button type="dashed" icon={<PlusOutlined />}>
          添加作品
        </Button>
      </Link>
      <Link to={ROUTES.ADD_AUTHOR}>
        <Button type="dashed" icon={<PlusOutlined />}>
          添加艺术家
        </Button>
      </Link>
      <RjSearchBar />
    </Space>
  );
};

export default TopNav;
