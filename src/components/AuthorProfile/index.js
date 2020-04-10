// 详细展示艺术家信息的组件
import React from "react";
import { Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import { useTransition, animated, config } from "react-spring";
import { ExportOutlined, EditOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { ADD_AUTHOR } from "myConstants/routes";

const { Title, Text, Paragraph } = Typography;

const AuthorProfile = ({ profile }) => {
  const transitions = useTransition(profile, (profile) => profile.name, {
    from: {
      position: "absolute",
      opacity: 0,
      transform: "translate3d(200px,0,0)",
    },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: { opacity: 1, transform: "translate3d(0px,0,0)" },
    config: config.gentle,
  });

  return transitions.map(({ item, key, props }) => (
    <animated.div key={key} style={props} className={styles.profile}>
      <div className={styles.header}>
        <Avatar src={profile.avatar} size={288} />
        <div className={styles.bio}>
          <Title>{profile.name}</Title>
          <Text type="secondary">{profile.bio}</Text>
          <span>
            {profile.url && (
              <a href={profile.url}>
                <ExportOutlined /> 她的主页
              </a>
            )}
          </span>
        </div>
      </div>
      <Paragraph title="问候">{profile.greetings}</Paragraph>
      <Paragraph title="评价">
        <pre>{profile.evaluation}</pre>
      </Paragraph>
      <Link to={{ pathname: ADD_AUTHOR, state: profile }}>
        <EditOutlined /> 编辑
      </Link>
    </animated.div>
  ));
};

export default AuthorProfile;
