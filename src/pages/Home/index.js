// 主页
import React from "react";
import { Typography } from "antd";

const { Paragraph, Title } = Typography;

const Home = () => (
  <div>
    <Title>Soundgasm</Title>
    <Paragraph>蝉鸣</Paragraph>
    <Paragraph>海浪拍打沙滩</Paragraph>
    <Paragraph>风吹过树叶沙沙作响</Paragraph>
    <Paragraph>雨滴落下</Paragraph>
    <Title level={3}>Gone Wild Audio</Title>
    <Paragraph>
      Gone Wild Audio
      通常用来指代软色情的英文音频。其中有一些由网友约定俗成的标签，它们的大概意思如下：
    </Paragraph>
    <Paragraph>F4M: female for male 作者是女性，目标观众是女性</Paragraph>
    <Paragraph>HFO: hand free orgasm</Paragraph>
    <Paragraph>Fdom: 调教</Paragraph>
    <Title level={3}>Japanese Audio</Title>
  </div>
);

export default Home;
