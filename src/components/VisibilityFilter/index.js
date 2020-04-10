// 作品过滤器组件
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import { setVisibilityFilter, fetchTags, fetchAuthors } from "store/actions";

const { Option } = Select;

const VisibilityFilter = ({
  tags,
  authors,
  setVisibilityFilter,
  fetchAuthors,
  fetchTags,
}) => {
  const { authorItems } = authors;
  const { tagItems } = tags;
  const authorList = Object.keys(authorItems);
  const tagList = Object.keys(tagItems);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const onAuthorChange = (author) => {
    console.log("on change", author);
    setVisibilityFilter({ author });
  };

  const onTagChange = (tag) => {
    console.log("on change", tag);
    setVisibilityFilter({ tag });
  };

  return (
    <div style={{ position: "fixed" }}>
      <Select
        showSearch
        placeholder="作者"
        style={{ width: 200 }}
        onChange={onAuthorChange}
        loading={authorItems.isFetching}
      >
        {authorList.map((author) => (
          <Option key={author}>{author}</Option>
        ))}
      </Select>
      <Select
        showSearch
        placeholder="标签"
        style={{ width: 200 }}
        onChange={onTagChange}
        loading={tagItems.isFetching}
      >
        {tagList.map((tag) => (
          <Option key={tag}>{tag}</Option>
        ))}
      </Select>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { tags, authors } = state;
  return {
    tags,
    authors,
  };
};

export default connect(mapStateToProps, {
  setVisibilityFilter,
  fetchTags,
  fetchAuthors,
})(VisibilityFilter);
