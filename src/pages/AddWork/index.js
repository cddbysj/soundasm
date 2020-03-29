// 添加一个作品
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Radio, Rate, Button, Select } from 'antd';
import { addWork, fetchTags, addTags, addAuthors } from 'store/actions';

const { TextArea } = Input;
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 6,
  },
};

const languageSelections = [
  'English',
  'Japanese',
  'Chinese',
  'Korean',
  'Spanish',
  'French',
].map(language => <Option key={language}>{language}</Option>);

const authorsSelections = [].map(author => (
  <Option key={author}>{author}</Option>
));

const AddWork = ({ tags, fetchTags, addTags, addWork, addAuthors }) => {
  // 当前作品要添加的标签
  const [currentTags, setCurrentTags] = useState([]);
  const [currentAuthors, setCurrentAuthors] = useState([]);

  const { isFetching, error, items } = tags;
  const initialValues = {
    title: '',
    author: [],
    rj: null,
    url: null,
    imageSrc: null,
    Illustrator: null,
    description: null,
    tags: items,
    rating: 'R18',
    star: 4,
    hasGot: true,
    language: ['Japanese'],
    script: null,
  };

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const onFinish = values => {
    console.log('提交的表格数据', values);
    Promise.all([
      addWork(values),
      addTags(currentTags),
      addAuthors(currentAuthors),
    ]);
  };

  const handleTagsChange = value => {
    const tags = value.map(v => v.trim()).filter(v => v);
    setCurrentTags(tags);
  };

  const handleAuthorsChange = value => {
    const authors = value.map(v => v.trim()).filter(v => v);
    setCurrentAuthors(authors);
  };

  return (
    <Form initialValues={initialValues} onFinish={onFinish} {...layout}>
      <Form.Item
        label="标题"
        name="title"
        rules={[
          {
            required: true,
            message: '请输入标题',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="作者"
        name="author"
        rules={[
          {
            required: true,
            message: '请输入作者',
          },
        ]}
      >
        <Select
          mode="tags"
          onChange={handleAuthorsChange}
          tokenSeparators={['/']}
        >
          {authorsSelections}
        </Select>
      </Form.Item>
      <Form.Item label="链接" name="url">
        <Input />
      </Form.Item>
      <Form.Item label="封面 URL" name="imageSrc">
        <Input />
      </Form.Item>
      <Form.Item label="插画师" name="Illustrator">
        <Input />
      </Form.Item>
      <Form.Item label="RJ" name="rj">
        <Input />
      </Form.Item>
      <Form.Item label="年龄分级" name="rating">
        <Radio.Group defaultValue="R18">
          <Radio value="ALL_AGE">全年龄</Radio>
          <Radio value="R15">R15</Radio>
          <Radio value="R18">R18</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="描述" name="description">
        <TextArea autoSize></TextArea>
      </Form.Item>
      <Form.Item label="语言" name="language">
        <Select mode="tags" style={{ width: '100%' }}>
          {languageSelections}
        </Select>
      </Form.Item>
      <Form.Item label="标签" name="tags">
        <Select
          mode="tags"
          value={items}
          style={{ width: '100%' }}
          onChange={handleTagsChange}
          loading={isFetching}
          tokenSeparators={[' ']}
        >
          {items && items.map(tag => <Option key={tag}>{tag}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item label="是否拥有" name="hasGot">
        <Radio.Group>
          <Radio value={true}>是</Radio>
          <Radio value={false}>否</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="打分" name="star">
        <Rate />
      </Form.Item>
      <Form.Item label="台本" name="script">
        <TextArea placeholder="台本" autoSize={{ minRows: 2, maxRows: 10 }} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" block>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = state => {
  const { tags } = state;
  return { tags };
};

export default connect(mapStateToProps, {
  fetchTags,
  addTags,
  addWork,
  addAuthors,
})(AddWork);
