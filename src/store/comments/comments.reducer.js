import {
  ADD_COMMENT,
  ADD_COMMENT_DONE,
  ADD_COMMENT_FAILED,
  FETCH_COMMENTS_BY_WORK,
  FETCH_COMMENTS_BY_WORK_DONE,
  FETCH_COMMENTS_BY_WORK_FAILED,
} from "store/comments/comments.actionTypes";

const initialState = {
  error: null,
  isFetching: false,
  isSubmitting: false,
  commentItems: {},
};

const comments = (state = initialState, action) => {
  const { type, payload = {} } = action;
  const { newComment, error, isFetching, comments, isSubmitting } = payload;
  switch (type) {
    case FETCH_COMMENTS_BY_WORK:
      return {
        ...state,
        isFetching,
        error,
      };
    case FETCH_COMMENTS_BY_WORK_FAILED:
      return {
        ...state,
        isFetching,
        error,
      };
    case FETCH_COMMENTS_BY_WORK_DONE:
      return {
        ...state,
        isFetching,
        commentItems: comments,
      };
    case ADD_COMMENT:
      return { ...state, isSubmitting };
    case ADD_COMMENT_FAILED:
      return { ...state, error, isSubmitting };
    case ADD_COMMENT_DONE:
      return {
        ...state,
        error,
        isSubmitting,
        commentItems: {
          ...state.commentItems,
          [newComment.id]: newComment,
        },
      };
    default:
      return state;
  }
};

export default comments;
