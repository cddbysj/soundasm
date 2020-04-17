import { commentsRef } from "api";
import {
  ADD_COMMENT,
  ADD_COMMENT_DONE,
  ADD_COMMENT_FAILED,
  FETCH_COMMENTS_BY_WORK,
  FETCH_COMMENTS_BY_WORK_DONE,
  FETCH_COMMENTS_BY_WORK_FAILED,
} from "store/comments/comments.actionTypes";

export const addComment = (comment) => async (dispatch) => {
  dispatch({
    type: ADD_COMMENT,
    payload: { error: null, isSubmitting: true },
  });

  try {
    const doc = commentsRef.doc();
    const newComment = { ...comment, id: doc.id };
    await doc.set(newComment, { merge: true });
    dispatch({
      type: ADD_COMMENT_DONE,
      payload: { error: null, isSubmitting: false, newComment },
    });
  } catch (error) {
    dispatch({
      type: ADD_COMMENT_FAILED,
      payload: { isSubmitting: false, error },
    });
  }
};

// 获取某个作品下面的所有评论
export const fetchCommentsByWork = (workId) => async (dispatch) => {
  dispatch({
    type: FETCH_COMMENTS_BY_WORK,
    payload: { error: null, isFetching: true },
  });

  try {
    const comments = {};
    const querySnapshot = await commentsRef.where("workId", "==", workId).get();
    querySnapshot.forEach((doc) => (comments[doc.id] = doc.data()));
    console.log("comments", comments);

    dispatch({
      type: FETCH_COMMENTS_BY_WORK_DONE,
      payload: { error: null, isFetching: false, comments },
    });
  } catch (error) {
    dispatch({
      type: FETCH_COMMENTS_BY_WORK_FAILED,
      payload: { error },
    });
  }
};
