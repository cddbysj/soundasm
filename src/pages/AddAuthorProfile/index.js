import React from "react";
import { Form, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  addAuthorProfile,
  uploadAvatar,
} from "store/authorProfile/authorProfile.acitons";
import { addAuthors } from "store/authors/authors.actions";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

const { TextArea } = Input;

const formLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

const tailLayout = {
  wrapperCol: {
    span: 12,
    offset: 6,
  },
};

const initialValues = {
  name: null,
  bio: null,
  url: null,
  greetings: null,
  evaluation: null,
  coverFlow: [],
  representativeWorks: [],
};

const AddAuthorProfile = ({
  addAuthorProfile,
  addAuthors,
  uploadAvatar,
  authorProfile,
}) => {
  // 上传头像得到的地址
  const { downloadURL } = authorProfile;
  const location = useLocation();
  const [form] = Form.useForm();

  const isEditMode = !!location.state;

  isEditMode && form.setFieldsValue(location.state);

  const onFinish = async (profile) => {
    console.log("form data:", profile);

    const avatar = downloadURL
      ? downloadURL
      : isEditMode
      ? location.state.avatar
      : null;

    // 提交到数据库的数据
    const profileData = {
      ...profile,
      avatar,
    };

    console.log("profileData", profileData);
    await Promise.all([
      addAuthorProfile(profileData),
      addAuthors(profile.name),
    ]);
    message.success(isEditMode ? "更新作者成功" : "添加作者成功", 1);
  };

  const onReset = () => {
    form.resetFields();
  };

  const beforeUpload = () => {};

  const handleAvatarChange = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} 上传失败.`);
    }
  };

  // 自定义上传行为
  // 使用 Firebase Storage 的接口
  const uploadToStorage = async ({
    onProgress,
    onError,
    onSuccess,
    data,
    filename,
    file,
    withCredentials,
    action,
    headers,
  }) => {
    console.log("file", file);
    try {
      await uploadAvatar({ file, onProgress, onError, onSuccess });
    } catch (error) {
      onError(error);
    }
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
        <Form.Item label="上传" valuePropName="fileList">
          <Upload
            headers={{
              authorization: "authorization-text",
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

const mapStateToProps = (state) => {
  const { authorProfile } = state;
  return { authorProfile };
};

export default connect(mapStateToProps, {
  addAuthorProfile,
  addAuthors,
  uploadAvatar,
})(AddAuthorProfile);
