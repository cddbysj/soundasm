// 作品过滤器组件
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Select, Space } from 'antd';
import { setVisibilityFilter, fetchTags, fetchAuthors } from 'store/actions';
import { LANGUAGES, AGE_RATING } from 'myConstants';

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
    console.log('on change', author);
    setVisibilityFilter({ author });
  };

  const onTagChange = (tag) => {
    console.log('on change', tag);
    setVisibilityFilter({ tag });
  };

  const onLanguageChange = (language) => {
    setVisibilityFilter({ language });
  };

  const onRatingChange = (rating) => {
    setVisibilityFilter({ rating });
  };

  return (
    <Space direction="vertical" size="large" style={{ position: 'fixed' }}>
      <Select
        allowClear
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
        allowClear
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
      <Select
        allowClear
        showSearch
        placeholder="语言"
        style={{ width: 200 }}
        onChange={onLanguageChange}
      >
        {LANGUAGES.map((tag) => (
          <Option key={tag}>{tag}</Option>
        ))}
      </Select>
      <Select
        allowClear
        showSearch
        placeholder="年龄分级"
        style={{ width: 200 }}
        onChange={onRatingChange}
      >
        {AGE_RATING.map((tag) => (
          <Option key={tag}>{tag}</Option>
        ))}
      </Select>
    </Space>
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
