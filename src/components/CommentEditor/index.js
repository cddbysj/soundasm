// 评论编辑器
import React from "react";
import { Form, Input, Button } from "antd";
import moment from "moment";
import PropTypes from "prop-types";

const { TextArea } = Input;

// workId 为该评论所属作品的 id
const CommentEditor = ({ workId, author, commitComment, isSubmitting }) => {
  const onFinish = ({ comment }) => {
    console.log(comment);
    const commentData = {
      content: comment,
      datetime: moment().format("YYYY-MM-DD HH:mm:ss"),
      author,
      workId,
    };
    console.log("comment to commit:", commentData);
    commitComment(commentData);
  };

  return (
    <Form name="comment-editor" onFinish={onFinish}>
      <Form.Item
        name="comment"
        rules={[
          {
            required: true,
            message: "请输入评论",
          },
          {
            whitespace: true,
            message: "评论不能为空字符",
          },
        ]}
      >
        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} allowClear />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={isSubmitting} type="primary">
          发布评论
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentEditor.propTypes = {
  workId: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  commitComment: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

export default CommentEditor;
