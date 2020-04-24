// 作品过滤器组件
import React from "react";
import { connect } from "react-redux";
import { Select, Space, Input, Button, Radio } from "antd";
import { setVisibilityFilter } from "store/visibilityFilter/visibilityFilter.actions";
import { LANGUAGES, AGE_RATING } from "myConstants";

const { Option } = Select;
const { Search } = Input;

const VisibilityFilter = ({ tags, authors, setVisibilityFilter }) => {
  const { authorItems } = authors;
  const { tagItems } = tags;
  const authorList = Object.keys(authorItems);
  const tagList = Object.keys(tagItems);

  const onAuthorChange = (author) => {
    console.log("on change", author);
    setVisibilityFilter({ author });
  };

  const onTagChange = (tag) => {
    console.log("on change", tag);
    setVisibilityFilter({ tag });
  };

  const onLanguageChange = (language) => {
    setVisibilityFilter({ language });
  };

  const onRatingChange = (rating) => {
    setVisibilityFilter({ rating });
  };

  const onRJSearch = (rj) => {
    setVisibilityFilter({ rj });
  };

  const onTitleSearch = (title) => {
    setVisibilityFilter({ title });
  };

  const onToggleScript = (e) => {
    setVisibilityFilter({ onlyShowWorksWithScript: e.target.value });
  };

  const onClearFilter = () => {
    setVisibilityFilter({
      author: null,
      tag: null,
      language: null,
      rating: null,
      rj: null,
      title: null,
      onlyShowWorksWithScript: false,
    });
  };

  return (
    <Space direction="vertical" size="large" style={{ position: "fixed" }}>
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
      <Radio.Group onChange={onToggleScript} defaultValue={false}>
        <Radio value={true}>有脚本</Radio>
        <Radio value={false}>全部</Radio>
      </Radio.Group>
      <Search placeholder="RJ" onSearch={onRJSearch} enterButton allowClear />
      <Search
        placeholder="Title"
        onSearch={onTitleSearch}
        enterButton
        allowClear
      />
      <Button onClick={onClearFilter}>清空过滤</Button>
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
})(VisibilityFilter);
