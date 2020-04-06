// 详细展示艺术家信息的组件
import React from 'react';
import { Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { ExportOutlined, EditOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import { ADD_AUTHOR } from 'myConstants/routes';

const { Title, Text, Paragraph } = Typography;

const AuthorProfile = ({ profile }) => {
  return (
    <div>
      <div className={styles.header}>
        <Avatar src={profile.avatar} size={288} />
        <div className={styles.bio}>
          <Title>{profile.name}</Title>
          <Text type="secondary">{profile.bio}</Text>
          <span>
            <a href={profile.url}>
              <ExportOutlined /> 外链
            </a>
          </span>
        </div>
      </div>
      <Paragraph title="问候">{profile.greetings}</Paragraph>
      <Paragraph title="评价">{profile.evaluation}</Paragraph>
      <Link to={{ pathname: ADD_AUTHOR, state: profile }}>
        <EditOutlined /> 编辑
      </Link>
    </div>
  );
};

export default AuthorProfile;
