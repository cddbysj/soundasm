// 添加一个作品
import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Input, Radio, Rate, Button, Select } from "antd";
import { addWork } from "store/actions";

const { TextArea } = Input;
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 }
};

const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 6
  }
};

const tagsSelections = [
  "纯爱",
  "治愈",
  "舔耳",
  "内射",
  "调教",
  "环绕音",
  "耳语"
].map(tag => <Option key={tag}>{tag}</Option>);

const languageSelections = [
  "English",
  "Japanese",
  "Chinese",
  "Korean",
  "Spanish",
  "French"
].map(language => <Option key={language}>{language}</Option>);

const authorsSelections = [].map(author => (
  <Option key={author}>{author}</Option>
));

const initialValues = {
  title: "",
  author: [],
  rj: null,
  url: null,
  imageSrc: null,
  Illustrator: null,
  description: null,
  tags: ["治愈", "舔耳", "低语", "环绕音", "纯爱"],
  rating: "R18",
  star: 4,
  language: ["Japanese"],
  script: null
};

const AddWork = ({ addWork }) => {
  const [script, setScript] = useState(null);

  const onFinish = values => {
    console.log("提交的表格数据", values);
    setScript(values.script);
    addWork(values);
  };

  const handleSelectChange = value => {
    console.log(value);
  };

  return (
    <Form initialValues={initialValues} onFinish={onFinish} {...layout}>
      <Form.Item
        label="标题"
        name="title"
        rules={[
          {
            required: true,
            message: "请输入标题"
          }
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
            message: "请输入作者"
          }
        ]}
      >
        <Select mode="tags">{authorsSelections}</Select>
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
        <Select
          mode="tags"
          style={{ width: "100%" }}
          onChange={handleSelectChange}
          tokenSeparators={[",", " ", "，"]}
        >
          {languageSelections}
        </Select>
      </Form.Item>
      <Form.Item label="标签" name="tags">
        <Select
          mode="tags"
          style={{ width: "100%" }}
          onChange={handleSelectChange}
          tokenSeparators={[",", " ", "，"]}
        >
          {tagsSelections}
        </Select>
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
      <div>
        <pre>{script}</pre>
      </div>
    </Form>
  );
};

export default connect(null, { addWork })(AddWork);
