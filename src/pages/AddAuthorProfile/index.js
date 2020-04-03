import React from "react";
import { Form, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { addAuthorProfile, addAuthors } from "store/actions";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

const { TextArea } = Input;

const formLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 12
  }
};

const tailLayout = {
  wrapperCol: {
    span: 12,
    offset: 6
  }
};

const initialValues = {
  name: null,
  avatar: null,
  bio: null,
  url: null,
  greetings: null,
  evaluation: null,
  coverFlow: [],
  representativeWorks: []
};

const AddAuthorProfile = ({ addAuthorProfile, addAuthors }) => {
  const location = useLocation();
  const [form] = Form.useForm();

  const isEditMode = !!location.state;

  isEditMode && form.setFieldsValue(location.state);

  const onFinish = async profile => {
    console.log("form data:", profile);
    await Promise.all([addAuthorProfile(profile), addAuthors(profile.name)]);
    message.success("添加作者成功", 1);
  };

  const onReset = () => {
    form.resetFields();
  };

  const beforeUpload = () => {};

  const handleAvatarChange = info => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // 自定义上传行为
  // 使用 Firebase Storage 的接口
  const uploadToStorage = ({
    onProgress,
    onError,
    onSuccess,
    data,
    filename,
    file,
    withCredentials,
    action,
    headers
  }) => {
    console.log("file", file);
    console.log("data", data);
  };

  return (
    <div>
      <Form
        {...formLayout}
        initialValues={initialValues}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="名字"
          rules={[{ required: true, message: "请输入名字" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="avatar" label="头像">
          <Input />
        </Form.Item>
        <Form.Item name="upload" label="上传">
          <Upload
            name="avatar"
            headers={{
              authorization: "authorization-text"
            }}
            customRequest={uploadToStorage}
            beforeUpload={beforeUpload}
            onChange={handleAvatarChange}
          >
            <Button>
              <UploadOutlined /> 点击上传
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item name="url" label="链接">
          <Input />
        </Form.Item>
        <Form.Item name="greetings" label="问候">
          <TextArea autoSize={{ minRows: 2, maxRows: 5 }} />
        </Form.Item>
        <Form.Item name="evaluation" label="评价">
          <TextArea autoSize={{ minRows: 2 }} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType="submit" type="primary" style={{ width: "50%" }}>
            {isEditMode ? "更新作者" : "添加作者"}
          </Button>
          <Button htmlType="reset" onClick={onReset} style={{ width: "50%" }}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(null, { addAuthorProfile, addAuthors })(
  AddAuthorProfile
);
