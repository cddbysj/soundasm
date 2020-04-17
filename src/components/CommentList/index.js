// 评论列表
import React from "react";
import { Comment, List, Tooltip } from "antd";
import moment from "moment";
import PropTypes from "prop-types";

const CommentList = ({ commentList }) => {
  return (
    <List
      dataSource={commentList}
      itemLayout="horizontal"
      renderItem={(item) => (
        <Comment
          author={item.author}
          content={item.content}
          datetime={
            <Tooltip title={item.datetime}>
              <span>
                {moment(item.datetime, "YYYY-MM-DD HH:mm:ss").fromNow()}
              </span>
            </Tooltip>
          }
        />
      )}
    />
  );
};

CommentList.propTypes = {
  commentList: PropTypes.array,
};

export default CommentList;
