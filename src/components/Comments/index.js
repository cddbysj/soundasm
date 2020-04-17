// 评论组件，包含评论列表、评论编辑器
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CommentList from "components/CommentList";
import CommentEditor from "components/CommentEditor";
import {
  addComment,
  fetchCommentsByWork,
} from "store/comments/comments.actions";

const getComments = (comments) => {
  const commentItems = Object.keys(comments.commentItems).map(
    (key) => comments.commentItems[key]
  );
  return { ...comments, commentItems };
};

const Comments = ({
  workId,
  auth,
  comments,
  addComment,
  fetchCommentsByWork,
}) => {
  const {
    currentUser: { email },
  } = auth;
  // 截取邮箱前缀用作用户名
  const author = email.split("@")[0];

  useEffect(() => {
    fetchCommentsByWork(workId);
  }, [workId, fetchCommentsByWork]);

  return (
    <div>
      <CommentList commentList={comments.commentItems} />
      <CommentEditor
        workId={workId}
        author={author}
        commitComment={addComment}
        isSubmitting={comments.isSubmitting}
      />
    </div>
  );
};

Comments.propTypes = {
  workId: PropTypes.string.isRequired,
  auth: PropTypes.shape({
    currentUser: PropTypes.object,
  }),
};

const mapStateToProps = (state) => {
  const { auth, comments } = state;
  return {
    auth,
    comments: getComments(comments),
  };
};

export default connect(mapStateToProps, { addComment, fetchCommentsByWork })(
  Comments
);
