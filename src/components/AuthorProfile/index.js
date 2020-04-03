// 详细展示艺术家信息的组件
import React from "react";
import { Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import { ExportOutlined, EditOutlined } from "@ant-design/icons";
import styles from "./index.module.css";

const { Title, Text, Paragraph } = Typography;

const example = {
  name: "Latte ASMR",
  avatar:
    "https://yt3.ggpht.com/a/AATXAJxDsAzqUeMEi3Ff1Jg3IWjxDiPLXzos6MVXcQ=s288-c-k-c0xffffffff-no-rj-mo",
  url: "https://www.youtube.com/channel/UCQe2Y7V-C9bNMAcCJCBvzQQ",
  greetings: "Hi everyone! It's Latte :)",
  bio: "Youtube ASMR 艺术家。出生于 1993-05-16，住在韩国首尔，身高 160cm。",
  evaluation:
    "温柔可人的韩国小姐姐，内容以温柔轻语的人声为主。她的作品最好观看视频，营造的氛围温暖舒适，让人感觉非常放松、温馨、治愈。记得最开始观看她的作品时，英语还显得生涩，如今不仅口音更佳，说的也越来越流利了。",
  coverFlow: [], // 封面流，美图精选
  representativeWorks: [] // 代表作品，RJ 号或者标题
};

const AuthorProfile = ({ profile }) => {
  return (
    <div>
      <div className={styles.header}>
        <Avatar src={profile.avatar} size={160} />
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
      <Link to={{ pathname: "/addAuthor", state: profile }}>
        <EditOutlined /> 编辑
      </Link>
    </div>
  );
};

export default AuthorProfile;
