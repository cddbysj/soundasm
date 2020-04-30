// 作品详情组件
// 每个作品的数据结构如下
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Typography, Rate, Tag, Row, Col } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { ADD_WORK } from "myConstants/routes";
import Comments from "components/Comments";
import styles from "./index.module.css";

const { Title, Paragraph } = Typography;

const imagePlaceholder =
  "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png";

const Work = () => {
  const location = useLocation();
  const work = location.state;
  return (
    <div>
      <Row gutter={[32, 32]} align="middle">
        <Col>
          <div>
            <img
              className={styles.cover}
              src={work.imageSrc || imagePlaceholder}
              alt={work.title}
            />
          </div>
        </Col>
        <Col flex="450px">
          <Title level={3}>{work.title}</Title>
          <Paragraph>
            作者：
            {work.author.map((author) => (
              <Tag color="purple" key={author} className={styles.tag}>
                {author}
              </Tag>
            ))}
          </Paragraph>
          <Paragraph>分级：{work.rating}</Paragraph>
          <Paragraph>语言：{work.language}</Paragraph>
          <Paragraph>描述：{work.description}</Paragraph>
          <Paragraph>拥有：{work.hasGot ? "是" : "否"}</Paragraph>
          <Paragraph>
            链接：
            <a href={work.url} target="_blank" rel="noopener noreferrer">
              {work.url && "访问外链"}
            </a>
          </Paragraph>
          <Paragraph>编号：{work.rj}</Paragraph>
          <Paragraph>
            标签：
            {work.tags.map((tag) => (
              <Tag key={tag} color="geekblue" className={styles.tag}>
                {tag}
              </Tag>
            ))}
          </Paragraph>
          <Paragraph>
            评分： <Rate defaultValue={work.star} />
          </Paragraph>
        </Col>
      </Row>
      <Row gutter={[32, 32]}>
        <Col span={14}>
          <Title level={4}>台本</Title>
          <Paragraph>
            <pre className={styles.script}>{work.script}</pre>
          </Paragraph>
        </Col>
        <Col span={10}>
          <Row gutter={[80, 80]}>
            <Col span={24}>
              <Title level={4}>信息</Title>
              <Paragraph>
                <pre className={styles.info}>{work.info}</pre>
              </Paragraph>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Title level={4}>评论</Title>
              <Comments workId={work.id} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[32, 32]}>
        <Col span={4}>
          <Link to={{ pathname: ADD_WORK, state: work }}>
            <EditOutlined /> 编辑
          </Link>
        </Col>
        <Col span={8}>
          <span>更新时间：{work.editAt}</span>
        </Col>
      </Row>
    </div>
  );
};

export default Work;
