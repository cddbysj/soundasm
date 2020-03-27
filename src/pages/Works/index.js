// 所有的作品
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { List, Avatar, Tag, Typography } from "antd";
import { fetchWorks } from "store/actions";

const { Text, Paragraph } = Typography;

// 占位图片
const imagePlaceholder =
  "https://os.alipayobjects.com/rmsportal/UXamdIxYSkXfoVo.jpg";

const tags = [
  "掏耳",
  "梵天",
  "泡沫",
  "吃西瓜",
  "跳跳糖",
  "抚摸",
  "摩擦麦克风",
  "治愈",
  "催眠"
];

const WorksPage = ({ works, fetchWorks }) => {
  const { isFetching, error, items } = works;

  useEffect(() => {
    fetchWorks();
  }, [fetchWorks]);

  return (
    <div>
      {isFetching && <div>Fetching...</div>}
      <List
        itemLayout="vertical"
        size="large"
        style={{ maxWidth: 750 }}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3
        }}
        dataSource={items}
        footer={<div>一共 {items.length} 个作品</div>}
        renderItem={item => (
          <List.Item
            key={item.title}
            extra={<img width={280} alt="logo" src={item.imageSrc} />}
          >
            <List.Item.Meta
              avatar={
                item.avatar || <Avatar size="default" icon={<UserOutlined />} />
              }
              title={item.author.join(" & ")}
              description={`${item.language} ${item.rating}`}
            />
            <div>
              <Text strong>
                <a target="_blank" rel="noopener noreferrer" href={item.url}>
                  {item.title}
                </a>
              </Text>
              <Paragraph>{item.description}</Paragraph>
              <div>
                {item.tags.map(tag => (
                  <Tag style={{ margin: 2 }} key={tag}>
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const { works } = state;
  return { works };
};

export default connect(mapStateToProps, { fetchWorks })(WorksPage);
