// 所有的作品
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Tag, Typography, Spin, Row, Col } from "antd";
import { fetchWorks } from "store/actions";
import VisibilityFilter from "components/VisibilityFilter";

const { Paragraph } = Typography;

// 占位图片
const imagePlaceholder =
  "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png";

const getVisibleWorks = (works, filter) => {
  console.count("getVisibleWorks");
  const { items } = works;
  const { author, tag, language } = filter;

  const filteredItems = items.filter((item) => {
    const isMatchAuthor = !author || item.author.includes(author);
    const isMatchTag = !tag || item.tags.includes(tag);
    const isMatchLanguage = !language || item.tags.includes(language);
    return isMatchAuthor && isMatchTag && isMatchLanguage;
  });

  return { ...works, items: filteredItems };
};

const WorksPage = ({ works, fetchWorks }) => {
  const { isFetching, items } = works;

  useEffect(() => {
    fetchWorks();
  }, [fetchWorks]);

  return (
    <Row gutter={[32, 32]}>
      <Col span={18}>
        {isFetching && <Spin delay={1000} />}
        <List
          itemLayout="vertical"
          size="large"
          style={{ maxWidth: 750 }}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
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
                  <Tag className="tag" color="blue" key={author}>
                    {author}
                  </Tag>
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
      </Col>
      <Col span={6}>
        <VisibilityFilter />
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  const { works, visibilityFilter } = state;
  return { works: getVisibleWorks(works, visibilityFilter) };
};

export default connect(mapStateToProps, { fetchWorks })(WorksPage);
