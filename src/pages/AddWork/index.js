// 添加一个作品
import React, { useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import * as moment from "moment";
import {
  Form,
  Input,
  Radio,
  Rate,
  Button,
  Select,
  message,
  DatePicker,
} from "antd";
import {
  checkWorkExists,
  addWork,
  updateWork,
} from "store/works/works.actions";
import { addTags } from "store/tags/tags.actions";
import { addAuthors } from "store/authors/authors.actions";
import { LANGUAGES } from "myConstants";

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

const MOMENT_FORMAT = "YYYY-MM-DD hh:mm:ss";

const languageSelections = LANGUAGES.map((language) => (
  <Option key={language}>{language}</Option>
));

const AddWork = ({
  works,
  tags,
  addTags,
  checkWorkExists,
  addWork,
  updateWork,
  authors,
  addAuthors,
}) => {
  const [form] = Form.useForm();
  const location = useLocation();

  const { isOperating } = works;
  const { tagItems } = tags;
  const { authorItems } = authors;

  // 是否编辑模式
  const isEditMode = !!location.state;

  // 当前作品要添加的标签
  const [currentTags, setCurrentTags] = useState(
    isEditMode ? location.state.tags : []
  );
  // 当前作品要添加的作者
  const [currentAuthors, setCurrentAuthors] = useState(
    isEditMode ? location.state.author : []
  );

  const initialValues = isEditMode
    ? {
        ...location.state,
        editAt: moment(location.state.editAt, MOMENT_FORMAT),
      }
    : {
        title: "",
        author: [],
        rj: null,
        url: null,
        imageSrc: null,
        Illustrator: null,
        description: null,
        tags: [],
        rating: "R18",
        star: 4,
        hasGot: true,
        language: [],
        script: null,
        editAt: moment(),
      };

  const onFinish = async (work) => {
    console.log("提交的表格数据", work);

    const workData = {
      ...work,
      editAt: work.editAt.format(MOMENT_FORMAT),
    };

    try {
      if (isEditMode) {
        const { id } = location.state;
        await Promise.all([
          updateWork({
            ...workData,
            id,
          }),
          addTags(currentTags),
          addAuthors(currentAuthors),
        ]);
        message.success("更新作品成功", 1);
      } else {
        const isWorkExists = await checkWorkExists(work);
        if (isWorkExists) {
          message.warn("该作品已存在", 2);
          form.resetFields();
          return;
        }
        await Promise.all([
          addWork(workData),
          addTags(currentTags),
          addAuthors(currentAuthors),
        ]);
        message.success("添加作品成功", 1);
      }
      form.resetFields();
    } catch (error) {
      message.error("添加作品失败", 2);
      console.log(error);
    } finally {
    }
  };

  const handleTagsChange = (tags) => {
    console.log("tags:", tags);
    form.setFieldsValue({ tags });
    const formalizedTags = tags.map((tag) => tag.trim().toLowerCase());
    setCurrentTags(formalizedTags);
  };

  const handleAuthorsChange = (authors) => {
    console.log("authors:", authors);
    form.setFieldsValue({ authors });
    const formalizedTAuthors = authors.map((author) => author.trim());
    setCurrentAuthors(formalizedTAuthors);
  };

  const handleDateChange = (editAt, dateString) => {
    console.log("selected value:", editAt);
    console.log("formatted value:", dateString);
    form.setFieldsValue({ editAt });
  };

  return (
    <Form
      initialValues={initialValues}
      onFinish={onFinish}
      form={form}
      {...layout}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[
          {
            required: true,
            message: "请输入标题",
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
            message: "请输入作者",
          },
        ]}
      >
        <Select
          mode="tags"
          onChange={handleAuthorsChange}
          tokenSeparators={["/", "&"]}
          loading={authors.isFetching}
        >
          {Object.keys(authorItems).map((author) => (
            <Option key={author}>{author}</Option>
          ))}
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
        <Radio.Group>
          <Radio value="ALL_AGE">全年龄</Radio>
          <Radio value="R15">R15</Radio>
          <Radio value="R18">R18</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="描述" name="description">
        <TextArea autoSize></TextArea>
      </Form.Item>
      <Form.Item
        label="语言"
        name="language"
        rules={[{ required: true, message: "请指定作品语言" }]}
      >
        <Select mode="tags" style={{ width: "100%" }}>
          {languageSelections}
        </Select>
      </Form.Item>
      <Form.Item label="标签" name="tags">
        <Select
          mode="tags"
          style={{ width: "100%" }}
          onChange={handleTagsChange}
          loading={tags.isFetching}
          tokenSeparators={["/", "\\", "、", "[", "]"]}
        >
          {Object.keys(tagItems).map((tag) => (
            <Option key={tag}>{tag}</Option>
          ))}
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
        <TextArea placeholder="台本" autoSize={{ minRows: 2 }} />
      </Form.Item>
      <Form.Item label="时间" name="editAt">
        <DatePicker showTime onChange={handleDateChange} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={isOperating} block>
          {isEditMode ? "更新作品" : "新增作品"}
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => {
  const { tags, authors, works } = state;
  return { tags, authors, works };
};

export default connect(mapStateToProps, {
  addTags,
  checkWorkExists,
  addWork,
  updateWork,
  addAuthors,
})(AddWork);
