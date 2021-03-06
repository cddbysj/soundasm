// 所有作品的标签汇总
import React from "react";
import { connect } from "react-redux";
import { Spin, Tag } from "antd";

const TagsPage = ({ tags, fetchTags }) => {
  const { isFetching, tagItems } = tags;

  return (
    <div>
      <div>{isFetching && <Spin size="large" delay={500} />}</div>
      <div>
        {Object.keys(tagItems).map((tag) => (
          <Tag color="geekblue" style={{ margin: 6 }} key={tag}>
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { tags } = state;
  return { tags };
};

export default connect(mapStateToProps)(TagsPage);
