// 作品列表组件
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { List, Typography, Tag } from "antd";
import { AUTHORS_PAGE } from "myConstants/routes";

const { Paragraph } = Typography;

// 占位图片
const imagePlaceholder =
  "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png";

const WorkList = ({ items }) => {
  return (
    <List
      itemLayout="vertical"
      style={{ maxWidth: 750 }}
      pagination={{
        defaultPageSize: 50,
      }}
      dataSource={items}
      footer={<div>一共 {items.length} 个作品</div>}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          extra={
            <img
              width={280}
              alt="logo"
              src={item.imageSrc || imagePlaceholder}
            />
          }
        >
          <List.Item.Meta
            title={
              <Link
                to={{
                  pathname: "/work",
                  hash: `#${item.title}`,
                  state: item,
                }}
              >
                {item.title}
              </Link>
            }
            description={`${item.language}  ${item.rating}  ${
              item.rj ? item.rj : ""
            }`}
          />
          <div>
            {item.author.map((author) => (
              <Link
                key={author}
                to={{
                  pathname: AUTHORS_PAGE,
                  state: { author },
                  hash: author,
                }}
                style={{
                  margin: "0 4px 4px 0",
                }}
              >
                {author}
              </Link>
            ))}
            <Paragraph>{item.description}</Paragraph>
            <div>
              {item.tags.map((tag) => (
                <Tag className="tag" key={tag}>
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

WorkList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WorkList;
