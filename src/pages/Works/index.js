// 所有的作品
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Tag, Typography, Spin } from "antd";
import { fetchWorks } from "store/actions";

const { Paragraph } = Typography;

// 占位图片
const imagePlaceholder =
  "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png";

const WorksPage = ({ works, fetchWorks }) => {
  const { isFetching, items } = works;

  useEffect(() => {
    fetchWorks();
  }, [fetchWorks]);

  return (
    <div>
      {isFetching && <Spin />}
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
                    state: item
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
              {item.author.map(author => (
                <Tag className="tag" color="blue" key={author}>
                  {author}
                </Tag>
              ))}
              <Paragraph>{item.description}</Paragraph>
              <div>
                {item.tags.map(tag => (
                  <Tag className="tag" key={tag}>
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
